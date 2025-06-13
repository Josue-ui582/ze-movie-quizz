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

// --- Types déjà existants pour l'auth ---
export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  checkAnswer: AnswerResponse;
};

export type MutationRegisterArgs = {
  input: UserInput;
};

export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type MutationCheckAnswerArgs = {
  hash: Scalars['String'];
  userAnswer: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  getByUsername?: Maybe<User>;
  getQuestion: Question;
};

export type QueryGetByUsernameArgs = {
  username: Scalars['String'];
};

// --- Types utilisateur ---
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

export type Question = {
  __typename?: 'Question';
  hash: Scalars['String'];
  actor: Actor;
  movie: Movie;
};

export type Actor = {
  __typename?: 'Actor';
  name: Scalars['String'];
};

export type Movie = {
  __typename?: 'Movie';
  title: Scalars['String'];
  poster: Scalars['String'];
};

export type AnswerResponse = {
  __typename?: 'AnswerResponse';
  correct: Scalars['Boolean'];
  correctMovieTitle?: Maybe<Scalars['String']>;
};

//
// --- Mutations déjà présentes ---
//

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

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
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

export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
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

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}

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

export type GetQuestionQuery = {
  __typename?: 'Query';
  getQuestion: {
    __typename?: 'Question';
    hash: string;
    actor: {
      __typename?: 'Actor';
      name: string;
    };
    movie: {
      __typename?: 'Movie';
      title: string;
      poster: string;
    };
  };
};

export const GetQuestionDocument = gql`
  query GetQuestion {
    getQuestion {
      hash
      actor {
        name
      }
      movie {
        title
        poster
      }
    }
  }
`;

export function useGetQuestionQuery(
  options?: Omit<Urql.UseQueryArgs<GetQuestionQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetQuestionQuery>({
    query: GetQuestionDocument,
    ...options,
  });
}

export type GetQuestionQueryVariables = Exact<{ [key: string]: never }>;

export type CheckAnswerMutationVariables = Exact<{
  hash: Scalars['String'];
  userAnswer: Scalars['Boolean'];
}>;

export type CheckAnswerMutation = {
  __typename?: 'Mutation';
  checkAnswer: {
    __typename?: 'AnswerResponse';
    correct: boolean;
    correctMovieTitle?: string | null;
  };
};

export const CheckAnswerDocument = gql`
  mutation CheckAnswer($hash: String!, $userAnswer: Boolean!) {
    checkAnswer(hash: $hash, userAnswer: $userAnswer) {
      correct
      correctMovieTitle
    }
  }
`;

export function useCheckAnswerMutation() {
  return Urql.useMutation<CheckAnswerMutation, CheckAnswerMutationVariables>(CheckAnswerDocument);
}