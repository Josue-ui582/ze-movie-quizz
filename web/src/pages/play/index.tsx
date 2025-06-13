import { useEffect, useState } from "react";
import { Button, Center, Spinner, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Timer from "../../components/Timer";
import QuestionCard from "../../components/QuestionCard";
import { useGetQuestionQuery, useCheckAnswerMutation } from "../../generated/graphql";
import ResultScreen from "../../components/ResultScreen";

const PlayPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [name, setName] = useState<string | null>(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsPlayed, setQuestionsPlayed] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<
  { actorName: string; wrongMovieTitle: string; correctMovieTitle: string }[]
  >([]);
  const [fetchQuestion, setFetchQuestion] = useState(false);

  const [{ data, fetching }, reexecuteQuery] = useGetQuestionQuery({
  requestPolicy: "network-only",
  });


  const [, checkAnswer] = useCheckAnswerMutation();

  useEffect(() => {
    if (typeof username === "string") {
      setName(username);
    }
  }, [username]);

  const handleStart = () => {
    setScore(0);
    setQuestionsPlayed(0);
    setGameOver(false);
    setGameStarted(true);
    setFetchQuestion(true);
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  const handleAnswer = async (userAnswer: boolean) => {
  if (!data?.getQuestion) return;

  const result = await checkAnswer({
    hash: data.getQuestion.hash,
    userAnswer,
  });

  const isCorrect = result.data?.checkAnswer?.correct;

  setQuestionsPlayed((prev) => prev + 1);

  if (isCorrect) {
    setScore((prev) => prev + 1);
  } else {
    setWrongAnswers((prev) => [
      ...prev,
      {
        actorName: data.getQuestion.actor.name,
        wrongMovieTitle: data.getQuestion.movie.title,
        correctMovieTitle: result.data?.checkAnswer?.correctMovieTitle ?? "Inconnu",
      },
    ]);
  }
  reexecuteQuery({ requestPolicy: "network-only" });
};



  const handleTimeUp = () => {
    setGameOver(true);
    setFetchQuestion(false);
  };

  const handleReplay = () => {
    handleStart();
  };

  return (
    <Center minH="100vh" p={6} flexDirection="column">
      {name && (
        <>
          <Text fontSize="5xl" fontWeight="bold" mb={2}>
            Bienvenue sur ze-movie-quizz, {name} !
          </Text>
          <Text fontSize="lg" color="gray.600" mb={8} textAlign="center" maxW="600px">
            Ce jeu consiste à deviner si un acteur a réellement joué dans un film donné. Vous avez 60 secondes pour répondre correctement à autant de questions que possible. Bonne chance !
          </Text>
        </>
      )}

      {!gameStarted ? (
        <Center flex="1">
          <Button size="lg" colorScheme="blue" onClick={handleStart}>
            Jouer
          </Button>
        </Center>
      ) : gameOver ? (
        <ResultScreen
        score={score}
        questionsPlayed={questionsPlayed}
        wrongAnswers={wrongAnswers}
        onReplay={handleReplay}
        gameOver
      />

      ) : (
        <VStack spacing={10}>
          <Timer initialTime={60} onTimeUp={handleTimeUp} />
          {fetching || !data?.getQuestion ? (
            <Spinner size="xl" />
          ) : (
            <QuestionCard
              actorName={data.getQuestion.actor.name}
              movieTitle={data.getQuestion.movie.title}
              moviePoster={data.getQuestion.movie.poster}
              onAnswer={handleAnswer}
            />
          )}
        </VStack>
      )}
    </Center>
  );
};

export default PlayPage;