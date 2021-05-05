import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AppModel = {
  __typename?: 'AppModel';
  status: Scalars['Int'];
};


export type Mutation = {
  __typename?: 'Mutation';
  createAccount: UserResponseDto;
  userLogin: UserLoginResponseDto;
};


export type MutationCreateAccountArgs = {
  UserRegisterInputDTO: UserRegisterInputDto;
};


export type MutationUserLoginArgs = {
  UserLoginInputDTO: UserLoginInputDto;
};

export type Query = {
  __typename?: 'Query';
  getAccount: UserResponseDto;
  serverStatus: AppModel;
};


export type QueryGetAccountArgs = {
  id: Scalars['String'];
};

export type UserLoginInputDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserLoginResponseDto = {
  __typename?: 'UserLoginResponseDTO';
  _id: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type UserRegisterInputDto = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponseDto = {
  __typename?: 'UserResponseDTO';
  _id: Scalars['String'];
  createAt?: Maybe<Scalars['DateTime']>;
  deactivate?: Maybe<Scalars['Boolean']>;
  displayName: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type DemoQueryVariables = Exact<{ [key: string]: never; }>;


export type DemoQuery = (
  { __typename?: 'Query' }
  & { serverStatus: (
    { __typename?: 'AppModel' }
    & Pick<AppModel, 'status'>
  ) }
);

export type UserLoginMutationVariables = Exact<{
  user: UserLoginInputDto;
}>;


export type UserLoginMutation = (
  { __typename?: 'Mutation' }
  & { userLogin: (
    { __typename?: 'UserLoginResponseDTO' }
    & Pick<UserLoginResponseDto, '_id' | 'username' | 'displayName' | 'email'>
  ) }
);

export type CreateAccountMutationVariables = Exact<{
  user: UserRegisterInputDto;
}>;


export type CreateAccountMutation = (
  { __typename?: 'Mutation' }
  & { createAccount: (
    { __typename?: 'UserResponseDTO' }
    & Pick<UserResponseDto, '_id' | 'displayName' | 'email' | 'username'>
  ) }
);


export const DemoDocument = gql`
    query demo {
  serverStatus {
    status
  }
}
    `;

/**
 * __useDemoQuery__
 *
 * To run a query within a React component, call `useDemoQuery` and pass it any options that fit your needs.
 * When your component renders, `useDemoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDemoQuery({
 *   variables: {
 *   },
 * });
 */
export function useDemoQuery(baseOptions?: Apollo.QueryHookOptions<DemoQuery, DemoQueryVariables>) {
        return Apollo.useQuery<DemoQuery, DemoQueryVariables>(DemoDocument, baseOptions);
      }
export function useDemoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DemoQuery, DemoQueryVariables>) {
          return Apollo.useLazyQuery<DemoQuery, DemoQueryVariables>(DemoDocument, baseOptions);
        }
export type DemoQueryHookResult = ReturnType<typeof useDemoQuery>;
export type DemoLazyQueryHookResult = ReturnType<typeof useDemoLazyQuery>;
export type DemoQueryResult = Apollo.QueryResult<DemoQuery, DemoQueryVariables>;
export const UserLoginDocument = gql`
    mutation userLogin($user: UserLoginInputDTO!) {
  userLogin(UserLoginInputDTO: $user) {
    _id
    username
    displayName
    email
  }
}
    `;
export type UserLoginMutationFn = Apollo.MutationFunction<UserLoginMutation, UserLoginMutationVariables>;

/**
 * __useUserLoginMutation__
 *
 * To run a mutation, you first call `useUserLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLoginMutation, { data, loading, error }] = useUserLoginMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUserLoginMutation(baseOptions?: Apollo.MutationHookOptions<UserLoginMutation, UserLoginMutationVariables>) {
        return Apollo.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument, baseOptions);
      }
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = Apollo.MutationResult<UserLoginMutation>;
export type UserLoginMutationOptions = Apollo.BaseMutationOptions<UserLoginMutation, UserLoginMutationVariables>;
export const CreateAccountDocument = gql`
    mutation createAccount($user: UserRegisterInputDTO!) {
  createAccount(UserRegisterInputDTO: $user) {
    _id
    displayName
    email
    username
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, baseOptions);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;