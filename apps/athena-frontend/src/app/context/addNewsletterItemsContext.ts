import { useContext } from 'react';
import {
  AddNewsletterItemsContext,
  AddNewsletterItemsDispatchContext,
} from './AddNewsletterItemsProvider';

export const useAddNewsletterItemsContext = () => {
  return useContext(AddNewsletterItemsContext);
};

export const useAddNewsletterItemsDispatchContext = () => {
  return useContext(AddNewsletterItemsDispatchContext);
};
