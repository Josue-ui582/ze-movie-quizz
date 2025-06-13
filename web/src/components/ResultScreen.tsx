import { Button, Center, Text, VStack, Box, List, ListItem, ListIcon, Heading } from "@chakra-ui/react";

interface WrongAnswer {
  actorName: string;
  wrongMovieTitle: string;
  correctMovieTitle: string;
}

interface ResultScreenProps {
  score: number;
  questionsPlayed: number;
  wrongAnswers: WrongAnswer[];
  onReplay: () => void;
  gameOver: boolean;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  questionsPlayed,
  wrongAnswers,
  onReplay
}) => {
  return (
    <Center minH="60vh" p={6} flexDirection="column">
      <VStack spacing={6} maxW="600px" w="100%">
        <Heading as="h2" size="xl">
          Résultats
        </Heading>

        <Text fontSize="lg">
          Vous avez joué à <b>{questionsPlayed}</b> question{questionsPlayed > 1 ? "s" : ""}.
        </Text>
        <Text fontSize="lg">
          Votre score est : <b>{score}</b>
        </Text>

        {wrongAnswers.length > 0 && (
          <Box w="100%" p={4} borderWidth="1px" borderRadius="md" bg="red.50">
            <Heading as="h3" size="md" mb={4} color="red.600">
              Mauvaises réponses :
            </Heading>

            <List spacing={3}>
              {wrongAnswers.map(({ actorName, wrongMovieTitle, correctMovieTitle }, index) => (
                <ListItem key={index}>
                  L'acteur <b>{actorName}</b> n'a pas joué dans <i>{wrongMovieTitle}</i>, mais plutôt dans <i>{correctMovieTitle}</i>.
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        <Button colorScheme="blue" size="lg" onClick={onReplay}>
          Rejouer
        </Button>
      </VStack>
    </Center>
  );
};

export default ResultScreen;