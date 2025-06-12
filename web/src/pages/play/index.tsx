import { useEffect, useState } from "react";
import { Button, Center, Spinner, VStack, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Timer from "../../components/Timer";
import QuestionCard from "../../components/QuestionCard";
import ResultScreen from "../../components/ResultScreen";
import { useGetQuestionQuery, useCheckAnswerMutation } from "../../generated/graphql";

const PlayPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [name, setName] = useState<string | null>(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const [{ data, fetching }, refetch] = useGetQuestionQuery({
    pause: !gameStarted || gameOver,
  });

  const [, checkAnswer] = useCheckAnswerMutation();

  useEffect(() => {
    if (typeof username === "string") {
      setName(username);
    }
  }, [username]);

  const handleStart = () => {
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
    refetch();
  };

  const handleAnswer = async (userAnswer: boolean) => {
    if (!data?.getQuestion) return;

    const result = await checkAnswer({
      hash: data.getQuestion.hash,
      userAnswer,
    });

    const isCorrect = result.data?.checkAnswer?.correct;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      refetch();
    } else {
      setGameOver(true);
    }
  };

  const handleTimeUp = () => {
    setGameOver(true);
  };

  const handleReplay = () => {
    handleStart();
  };

  return (
    <Center minH="100vh" p={6} flexDirection="column">
      {name && (
        <Flex
              alignItems="flex-start"
              justifyContent="center"
              h="100vh"
              pt="10"
              fontWeight="bold"
              fontSize="5xl"
            >
              Bienvenue sur ze-movie-quizz, {name} !
        </Flex>
      )}

      {!gameStarted ? (
        <Button size="lg" colorScheme="blue" onClick={handleStart}>
          Jouer
        </Button>
      ) : gameOver ? (
        <ResultScreen score={score} onReplay={handleReplay} />
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