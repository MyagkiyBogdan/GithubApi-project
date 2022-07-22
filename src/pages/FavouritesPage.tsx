import RepoCard from 'components/RepoCard';
import { useTypedSelector } from 'hooks/useTypedSelector';

export default function FavouritesPage() {
  const favourites = useTypedSelector(state => state.githubFavourites.favourites);

  return (
    <>
      <h1 className="text-2xl font-bold flex justify-center mt-[50px]">Favourites Page</h1>
      <div className="flex justify-center  pt-10 mx-auto h-screen w-screen">
        {favourites.length === 0 ? (
          <p className="text-center font-bold text-lg">
            You have no favourites repo now. Time to add something!
          </p>
        ) : (
          <ul className="list-none">
            {favourites?.map(favourites => (
              <RepoCard repo={favourites} key={favourites.id} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
