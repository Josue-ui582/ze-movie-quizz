
import { Image, Text, Button, VStack, HStack } from "@chakra-ui/react";

interface QuestionCardProps {
  actorName: string;
  movieTitle: string;
  moviePoster: string;
  onAnswer: (isCorrect: boolean) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  actorName,
  movieTitle,
  moviePoster,
  onAnswer,
}) => {
  return (
    <VStack spacing={6}>
      <Image src={moviePoster} alt={movieTitle} boxSize="300px" objectFit="cover" borderRadius="lg" />
      <Text fontSize="2xl" fontWeight="semibold">
        {actorName} a-t-il joué dans
        <br />
        <strong>{movieTitle}</strong> ?
      </Text>
      <HStack spacing={8}>
        <Button colorScheme="green" size="lg" onClick={() => onAnswer(true)}>
          Oui
        </Button>
        <Button colorScheme="red" size="lg" onClick={() => onAnswer(false)}>
          Non
        </Button>
      </HStack>
    </VStack>
  );
};

export default QuestionCard;