import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IRepos, IUser, ServerResponse } from 'models/models';

export const githubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  refetchOnFocus: true,
  endpoints: builder => ({
    // generic: what will return server/fetch and what we will use inside
    searchUsers: builder.query<IUser[], string>({
      query: (search: string) => ({
        url: `search/users`,
        params: {
          q: search,
          per_page: 10,
        },
      }),
      transformResponse: (response: ServerResponse<IUser>) => response.items,
    }),
    getUserRepos: builder.query<IRepos[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
      }),
    }),
  }),
});

// for use hook not every time and only when we want we should use Lazy hook
export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;
