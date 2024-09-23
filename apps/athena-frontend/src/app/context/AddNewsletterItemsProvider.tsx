import { createContext, useReducer } from 'react';
import { CreateNewsletterItem } from 'types/types';
import { addArrayItemsToMap } from '../../util/helpers';

export type CreateNewsletterItemWithId = CreateNewsletterItem & {
  id: number;
  file: File;
};

export type AddNewsletterItemsState = Map<number, CreateNewsletterItemWithId>;

type NewsletterItemsAddedAction = {
  entityType: 'newsletter-items';
  action: 'added';
  payload: CreateNewsletterItemWithId[];
};

type NewsletterItemRemovedAction = {
  entityType: 'newsletter-item';
  action: 'removed';
  payload: number;
};

type NewsletterItemNameUpdatedAction = {
  entityType: 'newsletter-item';
  action: 'name-updated';
  id: number;
  payload: string;
};

type NewsletterItemCaptionUpdatedAction = {
  entityType: 'newsletter-item';
  action: 'caption-updated';
  id: number;
  payload: string | null;
};

type NewsletterItemDateUpdatedAction = {
  entityType: 'newsletter-item';
  action: 'date-updated';
  id: number;
  payload: string | null;
};

type NewsletterItemLocationUpdatedAction = {
  entityType: 'newsletter-item';
  action: 'location-updated';
  id: number;
  payload: string;
};

export type Actions =
  | NewsletterItemsAddedAction
  | NewsletterItemRemovedAction
  | NewsletterItemNameUpdatedAction
  | NewsletterItemDateUpdatedAction
  | NewsletterItemCaptionUpdatedAction
  | NewsletterItemLocationUpdatedAction;

type Reducer<S, A> = (prevState: S, action: A) => S;

export function addNewsletterItemsReducer(
  prevState: AddNewsletterItemsState,
  action: Actions
): AddNewsletterItemsState {
  if (action.entityType === 'newsletter-items' && action.action === 'added') {
    const newState = addArrayItemsToMap(action.payload, prevState);
    return newState;
  } else if (
    action.entityType === 'newsletter-item' &&
    action.action === 'name-updated'
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
    action.action === 'date-updated'
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
    action.action === 'removed'
  ) {
    const newState = new Map(prevState);
    newState.delete(action.payload);
    return newState;
  } else {
    console.log(`Unknown action:  ${action.action}, ${action.entityType}`);
    throw Error('Unknown action: ' + action.action + ', ' + action.entityType);
  }
}

export type Props = {
  children: React.ReactNode;
};

const initialState = new Map();

export const AddNewsletterItemsContext =
  createContext<AddNewsletterItemsState>(initialState);
export const AddNewsletterItemsDispatchContext = createContext<
  React.Dispatch<Actions>
>(() => null);

export function AddNewsletterItemsProvider(props: Props) {
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
