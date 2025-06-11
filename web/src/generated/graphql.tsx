import gql from 'graphql-tag';
import * as Urql from 'urql';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
};

export type MutationRegisterArgs = {
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getByUsername?: Maybe<User>;
};

export type QueryGetByUsernameArgs = {
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
};


export type RegisterMutationVariables = Exact<{
  input: UserInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'UserResponse';
    user?: {
      __typename?: 'User';
      id: number;
      username: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    } | null;
    errors?: Array<{
      __typename?: 'FieldError';
      field: string;
      message: string;
    }> | null;
  };
};


export type GetByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;

export type GetByUsernameQuery = {
  __typename?: 'Query';
  getByUsername?: {
    __typename?: 'User';
    id: number;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};


export const RegisterDocument = gql`
  mutation Register($input: UserInput!) {
    register(input: $input) {
      user {
        id
        username
        email
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
}

export const GetByUsernameDocument = gql`
  query GetByUsername($username: String!) {
    getByUsername(username: $username) {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;

export function useGetByUsernameQuery(
  options: Omit<Urql.UseQueryArgs<GetByUsernameQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetByUsernameQuery>({
    query: GetByUsernameDocument,
    ...options,
  });
}