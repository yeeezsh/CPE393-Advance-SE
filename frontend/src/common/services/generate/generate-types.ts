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

export type BookmarkCreateInputDto = {
  note: Scalars['String'];
  original: Scalars['String'];
  owner: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type BookmarkDto = {
  __typename?: 'BookmarkDTO';
  _id: Scalars['String'];
  createAt?: Maybe<Scalars['DateTime']>;
  domain: Scalars['String'];
  note: Scalars['String'];
  original: Scalars['String'];
  owner: Scalars['String'];
  tags: Array<Scalars['String']>;
  updateAt?: Maybe<Scalars['DateTime']>;
};

export type BookmarkDtoSearch = {
  __typename?: 'BookmarkDTOSearch';
  _id: Scalars['String'];
  createAt?: Maybe<Scalars['DateTime']>;
  domain: Scalars['String'];
  note: Scalars['String'];
  original: Scalars['String'];
  owner: Scalars['String'];
  tags: Array<Scalars['String']>;
  unwindTags: Array<Scalars['String']>;
  updateAt?: Maybe<Scalars['DateTime']>;
};

export type BookmarkEditInputDto = {
  _id: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  original?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type BookmarkGetInputDto = {
  bookmarkId: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  addBookmark: BookmarkDto;
  addTagToBookmark: BookmarkDto;
  createAccount: UserResponseDto;
  createTag: TagDto;
  deleteTag: BookmarkDto;
  editBookmark: BookmarkDto;
  editTag: TagDto;
  setArchiveTag: BookmarkDto;
  userLogin: UserLoginResponseDto;
};


export type MutationAddBookmarkArgs = {
  BookmarkCreateInputDTO: BookmarkCreateInputDto;
};


export type MutationAddTagToBookmarkArgs = {
  TagAddToBookmarkDTO: TagAddToBookmarkDto;
};


export type MutationCreateAccountArgs = {
  UserRegisterInputDTO: UserRegisterInputDto;
};


export type MutationCreateTagArgs = {
  TagCreateInputDTO: TagCreateInputDto;
};


export type MutationDeleteTagArgs = {
  BookmarkGetInputDTO: BookmarkGetInputDto;
};


export type MutationEditBookmarkArgs = {
  BookmarkEditInputDTO: BookmarkEditInputDto;
};


export type MutationEditTagArgs = {
  TagEditInputDTO: TagEditInputDto;
};


export type MutationSetArchiveTagArgs = {
  BookmarkGetInputDTO: BookmarkGetInputDto;
};


export type MutationUserLoginArgs = {
  UserLoginInputDTO: UserLoginInputDto;
};

export type Query = {
  __typename?: 'Query';
  allTextSearchBookmark: SearchDto;
  getABookmark: BookmarkDto;
  getAccount: UserResponseDto;
  getRecentBookmark: Array<BookmarkDto>;
  listAllTag: TagListDto;
  searchFilterText: SearchDto;
  serverStatus: AppModel;
};


export type QueryAllTextSearchBookmarkArgs = {
  SearchTextInputDTO: SearchTextInputDto;
};


export type QueryGetABookmarkArgs = {
  bookmarkId: Scalars['String'];
};


export type QueryGetAccountArgs = {
  UserGetAccountInputDTO: Scalars['String'];
};


export type QueryGetRecentBookmarkArgs = {
  limit?: Maybe<Scalars['Float']>;
  skip?: Maybe<Scalars['Float']>;
  userId: Scalars['String'];
};


export type QueryListAllTagArgs = {
  owner: Scalars['String'];
};


export type QuerySearchFilterTextArgs = {
  SearchFilterTag: SearchFilterTag;
};

export type SearchDto = {
  __typename?: 'SearchDTO';
  results: Array<BookmarkDtoSearch>;
};

export type SearchFilterTag = {
  owner: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type SearchTextInputDto = {
  owner: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
  text?: Maybe<Scalars['String']>;
};

export type TagAddToBookmarkDto = {
  _id: Scalars['String'];
  bookmarkId: Scalars['String'];
};

export type TagCreateInputDto = {
  label: Scalars['String'];
  owner: Scalars['String'];
};

export type TagDto = {
  __typename?: 'TagDTO';
  _id: Scalars['String'];
  createAt?: Maybe<Scalars['DateTime']>;
  label: Scalars['String'];
  owner: Scalars['String'];
  updateAt?: Maybe<Scalars['DateTime']>;
};

export type TagEditInputDto = {
  _id: Scalars['String'];
  label?: Maybe<Scalars['String']>;
};

export type TagListDto = {
  __typename?: 'TagListDTO';
  result: Array<TagDto>;
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

export type GetTagsByOwnerQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetTagsByOwnerQuery = (
  { __typename?: 'Query' }
  & { listAllTag: (
    { __typename?: 'TagListDTO' }
    & { result: Array<(
      { __typename?: 'TagDTO' }
      & Pick<TagDto, '_id' | 'label' | 'createAt'>
    )> }
  ) }
);

export type EditBookmarkByIdMutationVariables = Exact<{
  bookmark: BookmarkEditInputDto;
}>;


export type EditBookmarkByIdMutation = (
  { __typename?: 'Mutation' }
  & { editBookmark: (
    { __typename?: 'BookmarkDTO' }
    & Pick<BookmarkDto, '_id' | 'domain' | 'note' | 'original' | 'owner' | 'tags' | 'createAt'>
  ) }
);

export type GetRecentBookmarkQueryVariables = Exact<{
  owner: Scalars['String'];
}>;


export type GetRecentBookmarkQuery = (
  { __typename?: 'Query' }
  & { getRecentBookmark: Array<(
    { __typename?: 'BookmarkDTO' }
    & Pick<BookmarkDto, '_id' | 'domain' | 'note' | 'original' | 'owner' | 'tags' | 'createAt'>
  )> }
);

export type AddBookmarkMutationVariables = Exact<{
  bookmark: BookmarkCreateInputDto;
}>;


export type AddBookmarkMutation = (
  { __typename?: 'Mutation' }
  & { addBookmark: (
    { __typename?: 'BookmarkDTO' }
    & Pick<BookmarkDto, '_id'>
  ) }
);

export type SearchQueryVariables = Exact<{
  word: SearchTextInputDto;
}>;


export type SearchQuery = (
  { __typename?: 'Query' }
  & { allTextSearchBookmark: (
    { __typename?: 'SearchDTO' }
    & { results: Array<(
      { __typename?: 'BookmarkDTOSearch' }
      & Pick<BookmarkDtoSearch, '_id' | 'createAt' | 'domain' | 'note' | 'original' | 'owner' | 'tags' | 'updateAt' | 'unwindTags'>
    )> }
  ) }
);

export type CreateTagMutationVariables = Exact<{
  tag: TagCreateInputDto;
}>;


export type CreateTagMutation = (
  { __typename?: 'Mutation' }
  & { createTag: (
    { __typename?: 'TagDTO' }
    & Pick<TagDto, '_id' | 'label'>
  ) }
);

export type GetBookmarkQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetBookmarkQuery = (
  { __typename?: 'Query' }
  & { getABookmark: (
    { __typename?: 'BookmarkDTO' }
    & Pick<BookmarkDto, '_id' | 'owner' | 'domain' | 'note' | 'original' | 'tags'>
  ) }
);

export type GetBookmarkByTagsQueryVariables = Exact<{
  opts: SearchFilterTag;
}>;


export type GetBookmarkByTagsQuery = (
  { __typename?: 'Query' }
  & { searchFilterText: (
    { __typename?: 'SearchDTO' }
    & { results: Array<(
      { __typename?: 'BookmarkDTOSearch' }
      & Pick<BookmarkDtoSearch, '_id' | 'domain' | 'original' | 'owner' | 'tags' | 'note' | 'unwindTags'>
    )> }
  ) }
);

export type DeleteBookmarkMutationVariables = Exact<{
  bookmarkId: Scalars['String'];
}>;


export type DeleteBookmarkMutation = (
  { __typename?: 'Mutation' }
  & { deleteTag: (
    { __typename?: 'BookmarkDTO' }
    & Pick<BookmarkDto, '_id' | 'tags' | 'original' | 'owner'>
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
export const GetTagsByOwnerDocument = gql`
    query getTagsByOwner($userId: String!) {
  listAllTag(owner: $userId) {
    result {
      _id
      label
      createAt
    }
  }
}
    `;

/**
 * __useGetTagsByOwnerQuery__
 *
 * To run a query within a React component, call `useGetTagsByOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsByOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsByOwnerQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetTagsByOwnerQuery(baseOptions: Apollo.QueryHookOptions<GetTagsByOwnerQuery, GetTagsByOwnerQueryVariables>) {
        return Apollo.useQuery<GetTagsByOwnerQuery, GetTagsByOwnerQueryVariables>(GetTagsByOwnerDocument, baseOptions);
      }
export function useGetTagsByOwnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsByOwnerQuery, GetTagsByOwnerQueryVariables>) {
          return Apollo.useLazyQuery<GetTagsByOwnerQuery, GetTagsByOwnerQueryVariables>(GetTagsByOwnerDocument, baseOptions);
        }
export type GetTagsByOwnerQueryHookResult = ReturnType<typeof useGetTagsByOwnerQuery>;
export type GetTagsByOwnerLazyQueryHookResult = ReturnType<typeof useGetTagsByOwnerLazyQuery>;
export type GetTagsByOwnerQueryResult = Apollo.QueryResult<GetTagsByOwnerQuery, GetTagsByOwnerQueryVariables>;
export const EditBookmarkByIdDocument = gql`
    mutation editBookmarkById($bookmark: BookmarkEditInputDTO!) {
  editBookmark(BookmarkEditInputDTO: $bookmark) {
    _id
    domain
    note
    original
    owner
    tags
    createAt
  }
}
    `;
export type EditBookmarkByIdMutationFn = Apollo.MutationFunction<EditBookmarkByIdMutation, EditBookmarkByIdMutationVariables>;

/**
 * __useEditBookmarkByIdMutation__
 *
 * To run a mutation, you first call `useEditBookmarkByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditBookmarkByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editBookmarkByIdMutation, { data, loading, error }] = useEditBookmarkByIdMutation({
 *   variables: {
 *      bookmark: // value for 'bookmark'
 *   },
 * });
 */
export function useEditBookmarkByIdMutation(baseOptions?: Apollo.MutationHookOptions<EditBookmarkByIdMutation, EditBookmarkByIdMutationVariables>) {
        return Apollo.useMutation<EditBookmarkByIdMutation, EditBookmarkByIdMutationVariables>(EditBookmarkByIdDocument, baseOptions);
      }
export type EditBookmarkByIdMutationHookResult = ReturnType<typeof useEditBookmarkByIdMutation>;
export type EditBookmarkByIdMutationResult = Apollo.MutationResult<EditBookmarkByIdMutation>;
export type EditBookmarkByIdMutationOptions = Apollo.BaseMutationOptions<EditBookmarkByIdMutation, EditBookmarkByIdMutationVariables>;
export const GetRecentBookmarkDocument = gql`
    query getRecentBookmark($owner: String!) {
  getRecentBookmark(userId: $owner) {
    _id
    domain
    note
    original
    owner
    tags
    createAt
  }
}
    `;

/**
 * __useGetRecentBookmarkQuery__
 *
 * To run a query within a React component, call `useGetRecentBookmarkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentBookmarkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentBookmarkQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useGetRecentBookmarkQuery(baseOptions: Apollo.QueryHookOptions<GetRecentBookmarkQuery, GetRecentBookmarkQueryVariables>) {
        return Apollo.useQuery<GetRecentBookmarkQuery, GetRecentBookmarkQueryVariables>(GetRecentBookmarkDocument, baseOptions);
      }
export function useGetRecentBookmarkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentBookmarkQuery, GetRecentBookmarkQueryVariables>) {
          return Apollo.useLazyQuery<GetRecentBookmarkQuery, GetRecentBookmarkQueryVariables>(GetRecentBookmarkDocument, baseOptions);
        }
export type GetRecentBookmarkQueryHookResult = ReturnType<typeof useGetRecentBookmarkQuery>;
export type GetRecentBookmarkLazyQueryHookResult = ReturnType<typeof useGetRecentBookmarkLazyQuery>;
export type GetRecentBookmarkQueryResult = Apollo.QueryResult<GetRecentBookmarkQuery, GetRecentBookmarkQueryVariables>;
export const AddBookmarkDocument = gql`
    mutation addBookmark($bookmark: BookmarkCreateInputDTO!) {
  addBookmark(BookmarkCreateInputDTO: $bookmark) {
    _id
  }
}
    `;
export type AddBookmarkMutationFn = Apollo.MutationFunction<AddBookmarkMutation, AddBookmarkMutationVariables>;

/**
 * __useAddBookmarkMutation__
 *
 * To run a mutation, you first call `useAddBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookmarkMutation, { data, loading, error }] = useAddBookmarkMutation({
 *   variables: {
 *      bookmark: // value for 'bookmark'
 *   },
 * });
 */
export function useAddBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<AddBookmarkMutation, AddBookmarkMutationVariables>) {
        return Apollo.useMutation<AddBookmarkMutation, AddBookmarkMutationVariables>(AddBookmarkDocument, baseOptions);
      }
export type AddBookmarkMutationHookResult = ReturnType<typeof useAddBookmarkMutation>;
export type AddBookmarkMutationResult = Apollo.MutationResult<AddBookmarkMutation>;
export type AddBookmarkMutationOptions = Apollo.BaseMutationOptions<AddBookmarkMutation, AddBookmarkMutationVariables>;
export const SearchDocument = gql`
    query search($word: SearchTextInputDTO!) {
  allTextSearchBookmark(SearchTextInputDTO: $word) {
    results {
      _id
      createAt
      domain
      note
      original
      owner
      tags
      updateAt
      unwindTags
    }
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      word: // value for 'word'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, baseOptions);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, baseOptions);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const CreateTagDocument = gql`
    mutation createTag($tag: TagCreateInputDTO!) {
  createTag(TagCreateInputDTO: $tag) {
    _id
    label
  }
}
    `;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, baseOptions);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const GetBookmarkDocument = gql`
    query getBookmark($id: String!) {
  getABookmark(bookmarkId: $id) {
    _id
    owner
    domain
    note
    original
    tags
  }
}
    `;

/**
 * __useGetBookmarkQuery__
 *
 * To run a query within a React component, call `useGetBookmarkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookmarkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookmarkQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBookmarkQuery(baseOptions: Apollo.QueryHookOptions<GetBookmarkQuery, GetBookmarkQueryVariables>) {
        return Apollo.useQuery<GetBookmarkQuery, GetBookmarkQueryVariables>(GetBookmarkDocument, baseOptions);
      }
export function useGetBookmarkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookmarkQuery, GetBookmarkQueryVariables>) {
          return Apollo.useLazyQuery<GetBookmarkQuery, GetBookmarkQueryVariables>(GetBookmarkDocument, baseOptions);
        }
export type GetBookmarkQueryHookResult = ReturnType<typeof useGetBookmarkQuery>;
export type GetBookmarkLazyQueryHookResult = ReturnType<typeof useGetBookmarkLazyQuery>;
export type GetBookmarkQueryResult = Apollo.QueryResult<GetBookmarkQuery, GetBookmarkQueryVariables>;
export const GetBookmarkByTagsDocument = gql`
    query getBookmarkByTags($opts: SearchFilterTag!) {
  searchFilterText(SearchFilterTag: $opts) {
    results {
      _id
      domain
      original
      owner
      tags
      note
      unwindTags
    }
  }
}
    `;

/**
 * __useGetBookmarkByTagsQuery__
 *
 * To run a query within a React component, call `useGetBookmarkByTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookmarkByTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookmarkByTagsQuery({
 *   variables: {
 *      opts: // value for 'opts'
 *   },
 * });
 */
export function useGetBookmarkByTagsQuery(baseOptions: Apollo.QueryHookOptions<GetBookmarkByTagsQuery, GetBookmarkByTagsQueryVariables>) {
        return Apollo.useQuery<GetBookmarkByTagsQuery, GetBookmarkByTagsQueryVariables>(GetBookmarkByTagsDocument, baseOptions);
      }
export function useGetBookmarkByTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookmarkByTagsQuery, GetBookmarkByTagsQueryVariables>) {
          return Apollo.useLazyQuery<GetBookmarkByTagsQuery, GetBookmarkByTagsQueryVariables>(GetBookmarkByTagsDocument, baseOptions);
        }
export type GetBookmarkByTagsQueryHookResult = ReturnType<typeof useGetBookmarkByTagsQuery>;
export type GetBookmarkByTagsLazyQueryHookResult = ReturnType<typeof useGetBookmarkByTagsLazyQuery>;
export type GetBookmarkByTagsQueryResult = Apollo.QueryResult<GetBookmarkByTagsQuery, GetBookmarkByTagsQueryVariables>;
export const DeleteBookmarkDocument = gql`
    mutation deleteBookmark($bookmarkId: String!) {
  deleteTag(BookmarkGetInputDTO: {bookmarkId: $bookmarkId}) {
    _id
    tags
    original
    owner
  }
}
    `;
export type DeleteBookmarkMutationFn = Apollo.MutationFunction<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>;

/**
 * __useDeleteBookmarkMutation__
 *
 * To run a mutation, you first call `useDeleteBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookmarkMutation, { data, loading, error }] = useDeleteBookmarkMutation({
 *   variables: {
 *      bookmarkId: // value for 'bookmarkId'
 *   },
 * });
 */
export function useDeleteBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>) {
        return Apollo.useMutation<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>(DeleteBookmarkDocument, baseOptions);
      }
export type DeleteBookmarkMutationHookResult = ReturnType<typeof useDeleteBookmarkMutation>;
export type DeleteBookmarkMutationResult = Apollo.MutationResult<DeleteBookmarkMutation>;
export type DeleteBookmarkMutationOptions = Apollo.BaseMutationOptions<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>;