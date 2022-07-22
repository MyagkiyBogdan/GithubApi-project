import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { githubActions } from 'store/github/github.slice';

const actions = {
  ...githubActions,
};

export const useTypedActions = () => {
  const dispatch = useDispatch();
  // all actions bind on dispatch
  // Redux's bindActionCreators. It wraps action creators with dispatch() so that they dispatch immediately when called
  return bindActionCreators(actions, dispatch);
};
