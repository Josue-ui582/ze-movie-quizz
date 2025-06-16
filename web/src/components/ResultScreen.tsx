import { Button, Center, Text, VStack, Heading } from "@chakra-ui/react";

interface ResultScreenProps {
  score: number;
  bestScore: number;
  questionsPlayed: number;
  onReplay: () => void;
  gameOver: boolean;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  bestScore,
  questionsPlayed,
  onReplay
}) => {
  return (
    <Center minH="60vh" p={6} flexDirection="column">
      <VStack spacing={6} maxW="600px" w="100%" textAlign="center">
        <Heading as="h2" size="xl">
          Fin du jeu 🎬
        </Heading>

        <Text fontSize="lg">
          Vous avez répondu à <b>{questionsPlayed}</b> question{questionsPlayed > 1 ? "s" : ""}.
        </Text>

        <Text fontSize="2xl" fontWeight="bold" color="blue.500">
          Votre score : {score}
        </Text>

        <Text fontSize="lg" color="gray.600">
          Meilleur score : <b>{bestScore}</b>
        </Text>

        <Button colorScheme="blue" size="lg" onClick={onReplay}>
          Rejouer
        </Button>
      </VStack>
    </Center>
  );
};

export default ResultScreen;