import { NextPage } from "next";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { Box, Button, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { InputField } from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import * as Yup from "yup";

interface ILoginProps {}

const Login: NextPage<ILoginProps> = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  const validationSchema = Yup.object({
    username: Yup.string().required("Le nom d'utilisateur est requis"),
    password: Yup.string().required("Le mot de passe est requis"),
  });

  return (
    <Wrapper variant="small">
      <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
        Bienvenue sur zee-movie-quiz
      </Text>

      <Text mt={6} mb={2} textAlign="center" color="gray.600">
        Pour jouer à ce jeu, veuillez vous connecter.
      </Text>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          console.log("Login response raw:", response);

          const loginResponse = response.data?.login;
          console.log("Login response parsed:", loginResponse);

          if (loginResponse?.errors) {
            setErrors(
              loginResponse.errors.reduce(
                (acc: Record<string, string>, { field, message }: { field: string; message: string }) => {
                  acc[field] = message;
                  return acc;
                },
                {}
              )
            );
          } else if (loginResponse?.user) {
            router.push({
              pathname: "/play",
              query: { username: loginResponse.user.username },
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" placeholder="username" label="Username" />
            <Box mt={4}>
              <InputField name="password" placeholder="password" label="Password" type="password" />
            </Box>
            <Button
              type="submit"
              isLoading={isSubmitting}
              colorScheme="blue"
              style={{ marginTop: "1rem" }}
              width="100%"
            >
              Login
            </Button>

            <Text textAlign="center" mt={4}>
              Pas encore inscrit ?{" "}
              <NextLink href="/register" passHref>
                <Link color="blue.500" fontWeight="bold">
                  Inscrivez-vous ici
                </Link>
              </NextLink>
            </Text>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Login);