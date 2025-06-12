import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useGetByUsernameQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Flex, Spinner } from "@chakra-ui/react";

const User: NextPage = () => {
  const router = useRouter();
  const username = router.query.username as string;
  const [{ data, error, fetching }] = useGetByUsernameQuery({
    variables: { username },
  });
  const name = data?.getByUsername?.username;

  if (fetching) {
    return (
      <Flex alignItems="center" h="100vh" justifyContent="center">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.500" />
      </Flex>
    );
  } else if (error) {
    return (
      <Flex alignItems="center" h="100vh" justifyContent="center">
        Une erreur est survenue lors du chargement
      </Flex>
    );
  } else {
    return (
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
    );
  }
};

export default withUrqlClient(createUrqlClient, { ssr: true })(User);