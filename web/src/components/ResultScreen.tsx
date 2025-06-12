
import { VStack, Text, Button } from "@chakra-ui/react";

interface ResultScreenProps {
  score: number;
  onReplay: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, onReplay }) => {
  return (
    <VStack spacing={6}>
      <Text fontSize="4xl" fontWeight="bold">
        Fin de la partie !
      </Text>
      <Text fontSize="2xl">
        Ton score : {score}
      </Text>
      <Button colorScheme="blue" onClick={onReplay}>
        Rejouer
      </Button>
    </VStack>
  );
};

export default ResultScreen;