import { NextPage } from "next";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { Box, Button, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";  // Pour le lien vers la page login
import { InputField } from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";

interface IRegisterProps {}

const Register: NextPage<IRegisterProps> = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
        Bienvenue sur zee-movie-quiz
      </Text>

      <Text mt={6} mb={2} textAlign="center" color="gray.600">
        Pour jouer à ce jeu, veuillez vous inscrire.
      </Text>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ input: values });
          const registerResponse = response.data?.register;
          console.log(registerResponse);

          if (registerResponse?.errors) {
            setErrors(
              registerResponse.errors.reduce(
                (acc: Record<string, string>, { field, message }: { field: string; message: string }) => {
                  acc[field] = message;
                  return acc;
                },
                {}
              )
            );
          } else if (registerResponse?.user) {
            router.push("/login");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" placeholder="username" label="Username" />
            <Box mt={4}>
              <InputField name="email" placeholder="email" label="Email" type="email" />
            </Box>
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
              Register
            </Button>

            <Text textAlign="center">
              Déjà inscrit ?{" "}
              <NextLink href="/login" passHref>
                <Link color="blue.500" fontWeight="bold">
                  Connectez-vous ici
                </Link>
              </NextLink>
            </Text>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register);