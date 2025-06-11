import { NextPage } from "next";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { Box, Button } from "@chakra-ui/react";
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
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
        const response = await register({ input: values });
        const registerResponse = response.data?.register;

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
          router.push(`/user/${registerResponse.user.username}`);
        }
      }}

      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              type="submit"
                isLoading={isSubmitting}
                colorScheme="blue"
                style={{ marginTop: '1rem' }}
              >
                register
            </Button>

          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register);