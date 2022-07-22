import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigations() {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white text-xl">
      <Link to="/" className="font-bold">
        Github Search
      </Link>
      <span>
        <Link to="/" className="mr-2 border-r-2 pr-2">
          Home
        </Link>
        <Link to="/favourites">Favourites</Link>
      </span>
    </nav>
  );
}
