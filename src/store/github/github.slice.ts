import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRepos } from 'models/models';

interface IGithubState {
  favourites: IRepos[];
}

const LS_FAV_KEY = 'favourites';

const initialState: IGithubState = {
  favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]'),
};

export const githubSlice = createSlice({
  name: 'githubFavourites',
  initialState,
  reducers: {
    addToFavourite: (state, action: PayloadAction<IRepos>) => {
      state.favourites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
    removeFromFavourite: (state, action: PayloadAction<IRepos>) => {
      state.favourites = state.favourites.filter(favourite => favourite.id !== action.payload.id);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
  },
});

export const githubActions = githubSlice.actions;

export const githubReducer = githubSlice.reducer;
