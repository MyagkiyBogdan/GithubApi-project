import { useDebounce } from 'hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from 'store/github/github.api';
import { PulseLoader } from 'react-spinners';
import RepoCard from 'components/RepoCard';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const {
    isLoading,
    isError,
    data: users,
  } = useSearchUsersQuery(debounced, {
    // now fetch will be only after input 3 symbols
    skip: debounced.length < 3,
    // for refetch after switching browser tab
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoadging, data: repos }] = useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(debounced.length >= 3 && users?.length! > 0);
  }, [debounced, users]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClick = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold flex justify-center mt-[50px]">Home Page</h1>
      <div className="flex justify-center  pt-10 mx-auto h-screen w-screen">
        <div>{isError && <p className="text-center text-red-600">Something went wrong!</p>}</div>

        <div className="relative w-[320px]">
          <input
            type="text"
            value={search}
            onChange={handleChange}
            className="border py-2 px-4 w-full h-[42px] mb-2"
            placeholder="Search username"
          />
          {dropdown && (
            <ul className="absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white list-none">
              {isLoading && (
                <div className="mx-auto w-[100px]">
                  <PulseLoader color="gray" />
                </div>
              )}
              {users?.map(user => (
                <li
                  key={user.id}
                  onClick={() => handleClick(user.login)}
                  className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  {user.login}
                </li>
              ))}
            </ul>
          )}
          <div className="container">
            {areReposLoadging && (
              <div className="mx-auto w-[100px]">
                <PulseLoader color="gray" />
              </div>
            )}
            {repos?.map(repo => (
              <RepoCard repo={repo} key={repo.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
