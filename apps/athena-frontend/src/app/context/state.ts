import axios from 'axios';
import { useContext } from 'react';
import { StateContext, StateDispatchContext } from './StateProvider';

axios.defaults.withCredentials = true;

export const useStateContext = () => {
  return useContext(StateContext);
};

export const useStateDispatchContext = () => {
  return useContext(StateDispatchContext);
};
