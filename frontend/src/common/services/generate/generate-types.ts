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
  Array: string[];
  DateTime: any;
};

export type AppModel = {
  __typename?: 'AppModel';
  status: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
};

export type MutationCreateQuickNoteArgs = {
  CreateQuickNoteDto: CreateQuickNoteDto;
};

export type Query = {
  __typename?: 'Query';
  serverStatus: AppModel;
  createQuickNote: QuickNoteDto;
};



export type CreateQuickNoteDto = {
  url: Scalars['String'];
  // tags: Scalars['Array'];
};

export type QuickNoteDto = {
  __typename?: 'QuickNoteDto';
  _id: Scalars['String'];
  createAt?: Maybe<Scalars['DateTime']>;
  domain: Scalars['String'];
  note: Scalars['String'];

  // tags: Scalars['Array'];
};

export type DemoQueryVariables = Exact<{ [key: string]: never; }>;


export type DemoQuery = (
  { __typename?: 'Query' }
  & { serverStatus: (
    { __typename?: 'AppModel' }
    & Pick<AppModel, 'status'>
  ) }
);
export type CreateQuickNoteMutationVariables = Exact<{
  quicknote: CreateQuickNoteDto;
}>;

export type CreateQuickNoteMutation = (
  { __typename?: 'Mutation' }
  & { createQuickNote: (
    { __typename?: 'QuickNoteDto' }
    & Pick<QuickNoteDto, '_id' | 'domain' | 'note' >
    // & Pick<QuickNoteDto, '_id' | 'domain' | 'note' | 'tags >

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

export const CreateQuickNoteDocument = gql`
    mutation create($quicknote: CreateQuickNoteDto!) {
      createQuickNote(CreateQuickNoteDto: $quicknote) {
    _id
    domain
    note
    // tags
  }
}
  `;

  export type CreateQuickNoteMutationFn = Apollo.MutationFunction<CreateQuickNoteMutation, CreateQuickNoteMutationVariables>;
  /**
 * __useCreateQuickNoteMutation__
 *
 * To run a mutation, you first call `useCreateQuickNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuickNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuickNoteMutation, { data, loading, error }] = useCreateQuickNoteMutation({
 *   variables: {
 *      quicknote: // value for 'user'
 *   },
 * });
 */
export function useCreateQuickNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuickNoteMutation, CreateQuickNoteMutationVariables>) {
        return Apollo.useMutation<CreateQuickNoteMutation, CreateQuickNoteMutationVariables>(CreateQuickNoteDocument, baseOptions);
      }
export type CreateQuickNoteMutationHookResult = ReturnType<typeof useCreateQuickNoteMutation>;
export type CreateQuickNoteMutationResult = Apollo.MutationResult<CreateQuickNoteMutation>;
export type CreateQuickNoteMutationOptions = Apollo.BaseMutationOptions<CreateQuickNoteMutation, CreateQuickNoteMutationVariables>;