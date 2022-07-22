import { useTypedActions } from 'hooks/useTypedActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { IRepos } from 'models/models';
import { useState } from 'react';

export default function RepoCard({ repo }: { repo: IRepos }) {
  const { addToFavourite, removeFromFavourite } = useTypedActions();
  const favourites = useTypedSelector(state => state.githubFavourites.favourites);
  const [isFavourite, setIsFavourite] = useState(favourites.includes(repo));

  const handleAddFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addToFavourite(repo);
    setIsFavourite(true);
  };

  const handleRemoveFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsFavourite(false);
    removeFromFavourite(repo);
  };

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">{repo.name}</p>
        <p className="text-sm font-thin">{repo?.description}</p>
        {!isFavourite ? (
          <button
            className="mt-3 py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all font-bold hover:bg-orange-500 hover:text-slate-100"
            type="button"
            onClick={handleAddFavourite}
          >
            Add to favourite
          </button>
        ) : (
          <button
            className="mt-3 py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all font-bold hover:bg-orange-500 hover:text-slate-100"
            type="button"
            onClick={handleRemoveFavourite}
          >
            Remove from favourite
          </button>
        )}
      </a>
    </div>
  );
}
