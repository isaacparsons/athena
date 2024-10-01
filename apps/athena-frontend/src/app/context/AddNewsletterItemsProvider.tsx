import { createContext, useReducer } from 'react';
import { CreateNewsletterItemInput } from '../types';
import { addArrayItemsToMap } from '../../util/helpers';

export type AddNewsletterItemsState = Map<number, CreateNewsletterItemInput>;

type NewsletterItemsAddedAction = {
  type: 'added';
  payload: CreateNewsletterItemInput | CreateNewsletterItemInput[];
};

type NewsletterItemRemovedAction = {
  type: 'removed';
  key: number;
};

type NewsletterItemUpdatedAction = {
  type: 'updated';
  key: number;
  payload: CreateNewsletterItemInput;
};

export type Actions =
  | NewsletterItemsAddedAction
  | NewsletterItemRemovedAction
  | NewsletterItemUpdatedAction;

type Reducer<S, A> = (prevState: S, action: A) => S;

export function addNewsletterItemsReducer(
  prevState: AddNewsletterItemsState,
  action: Actions
): AddNewsletterItemsState {
  if (action.entityType === 'newsletter-items' && action.type === 'added') {
    const newState = addArrayItemsToMap(action.payload, prevState);
    return newState;
  } else if (
    action.entityType === 'newsletter-item' &&
    action.type === 'name-updated'
  ) {
    const newState = new Map(prevState);
    const item = prevState.get(action.id);
    if (!item) return prevState;
    const newItem = {
      ...item,
      details: {
        ...item.details,
        name: action.payload,
      },
    };

    newState.set(action.id, newItem);
    return newState;
  } else if (
    action.entityType === 'newsletter-item' &&
    action.type === 'date-updated'
  ) {
    const newState = new Map(prevState);
    const item = prevState.get(action.id);
    if (!item) return prevState;
    const newItem = {
      ...item,
      details: {
        ...item.details,
        date: action.payload,
      },
    };

    newState.set(action.id, newItem);
    return newState;
  } else if (
    action.entityType === 'newsletter-item' &&
    action.type === 'removed'
  ) {
    const newState = new Map(prevState);
    newState.delete(action.payload);
    return newState;
  } else {
    console.log(`Unknown action:  ${action.action}, ${action.entityType}`);
    throw Error('Unknown action: ' + action.action + ', ' + action.entityType);
  }
}

export type AddNewsletterItemsProviderProps = {
  children: React.ReactNode;
};

const initialState = new Map();

export const AddNewsletterItemsContext =
  createContext<AddNewsletterItemsState>(initialState);
export const AddNewsletterItemsDispatchContext = createContext<
  React.Dispatch<Actions>
>(() => null);

export function AddNewsletterItemsProvider(
  props: AddNewsletterItemsProviderProps
) {
  const { children } = props;
  const [state, dispatch] = useReducer<
    Reducer<AddNewsletterItemsState, Actions>,
    AddNewsletterItemsState
  >(
    addNewsletterItemsReducer,
    initialState,
    (arg: AddNewsletterItemsState) => initialState
  );
  return (
    <AddNewsletterItemsContext.Provider value={state}>
      <AddNewsletterItemsDispatchContext.Provider value={dispatch}>
        {children}
      </AddNewsletterItemsDispatchContext.Provider>
    </AddNewsletterItemsContext.Provider>
  );
}
