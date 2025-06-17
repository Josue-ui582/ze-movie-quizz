import { Image, Text, Button, VStack, HStack, Avatar } from "@chakra-ui/react";

interface QuestionCardProps {
  actorName: string;
  actorAvatar?: string | null;
  movieTitle: string;
  moviePoster: string;
  onAnswer: (isCorrect: boolean) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  actorName,
  actorAvatar,
  movieTitle,
  moviePoster,
  onAnswer,
}) => {

  console.log("Avatar URL dans QuestionCard:", actorAvatar);
  
  return (
    <VStack spacing={6}>
      
      <Image
        src={moviePoster}
        alt={movieTitle}
        boxSize="300px"
        objectFit="cover"
        borderRadius="lg"
      />

      <HStack spacing={4} alignItems="center">
        <Avatar
          name={actorName}
          src={actorAvatar || undefined}
          size="xl"
        />
        <Text fontSize="2xl" fontWeight="semibold">
          {actorName} a-t-il joué dans <br />
          <strong>{movieTitle}</strong> ?
        </Text>
      </HStack>

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