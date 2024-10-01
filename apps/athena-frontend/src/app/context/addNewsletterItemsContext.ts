import { useContext } from 'react';
import {
  AddNewsletterItemsContext,
  AddNewsletterItemsDispatchContext,
} from './index';

export const useAddNewsletterItemsContext = () => {
  return useContext(AddNewsletterItemsContext);
};

export const useAddNewsletterItemsDispatchContext = () => {
  return useContext(AddNewsletterItemsDispatchContext);
};
