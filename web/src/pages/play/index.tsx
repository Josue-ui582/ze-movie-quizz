import { useEffect, useState } from "react";
import { Button, Center, Spinner, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Timer from "../../components/Timer";
import QuestionCard from "../../components/QuestionCard";
import ResultScreen from "../../components/ResultScreen";
import {
  useGetQuestionQuery,
  useCheckAnswerMutation,
} from "../../generated/graphql";

const PlayPage = () => {
  const router = useRouter();
  const { username } = router.query;

  const [name, setName] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [questionsPlayed, setQuestionsPlayed] = useState(0);
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

  useEffect(() => {
    const saved = localStorage.getItem("bestScore");
    if (saved) {
      setBestScore(parseInt(saved, 10));
    }
  }, []);

  const handleStart = () => {
    setScore(0);
    setQuestionsPlayed(0);
    setGameOver(false);
    setGameStarted(true);
    setFetchQuestion(true);
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  const handleGameOver = () => {
    setGameOver(true);
    setFetchQuestion(false);
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score.toString());
  }
  };

  const handleAnswer = async (userAnswer: boolean) => {
    if (!data?.getQuestion) return;

    console.log("Question envoyée:", {
      actor: data.getQuestion.actor.name,
      movie: data.getQuestion.movie.title,
      hash: data.getQuestion.hash,
      userAnswer,
    });

    const result = await checkAnswer({
      hash: data.getQuestion.hash,
      userAnswer,
    });

    console.log("Résultat mutation:", result);

    const isCorrect = result.data?.checkAnswer?.correct;

    setQuestionsPlayed((prev) => prev + 1);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      reexecuteQuery({ requestPolicy: "network-only" });
    } else {
      handleGameOver(); // arrêt du jeu à la première erreur
    }
  };

  const handleTimeUp = () => {
    handleGameOver(); // arrêt du jeu quand le temps est écoulé
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
          <Text
            fontSize="lg"
            color="gray.600"
            mb={8}
            textAlign="center"
            maxW="600px"
          >
            Ce jeu consiste à deviner si un acteur a réellement joué dans un
            film donné. Le jeu s'arrête à la première erreur ou à la fin des
            60 secondes. Tentez de battre votre meilleur score !
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
          onReplay={handleReplay}
          bestScore={bestScore}
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