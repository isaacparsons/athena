import { createContext, useReducer } from 'react';
import {
  ReadNewsletter,
  ReadNewsletterItem,
  ReadNewsletters,
  ReadUser,
  User,
} from 'types/types';
import { Newsletter as INewsletter } from 'types/types';
import { addArrayItemsToMap } from '../../util/helpers';

type NewsletterItems = Map<number, ReadNewsletterItem>;

type Newsletter = INewsletter & {
  itemIds: number[];
  memberIds: number[];
};

type Newsletters = Map<number, Newsletter>;

export type State = {
  newsletters: Newsletters;
  newsletterItems: NewsletterItems;
  newsletterMembers: Map<number, User>;
};

type CreateNewsletterAction = {
  entityType: 'newsletter';
  action: 'created';
  payload: Newsletter;
};

type FetchNewslettersAction = {
  entityType: 'newsletters';
  action: 'fetched';
  payload: ReadNewsletters;
};

type CreateNewsletterItemsAction = {
  entityType: 'newsletter-items';
  action: 'created';
  payload: ReadNewsletterItem[];
};

type ReadUserAction = {
  entityType: 'user' | 'newsletter' | 'newsletters' | 'newsletter-items';
  action: 'read';
};
type ReadNewsletterAction = {
  entityType: 'newsletter';
  action: 'read';
};
type ReadNewslettersAction = {
  entityType: 'newsletters';
  action: 'read';
};
type ReadNewsletterItemsAction = {
  entityType: 'newsletter-items';
  action: 'read';
};

type UpdateAction = {
  entityType: 'user' | 'newsletter' | 'newsletters' | 'newsletter-items';
  action: 'update';
};

type DeleteAction = {
  entityType: 'user' | 'newsletter' | 'newsletters' | 'newsletter-items';
  action: 'delete';
};

type FetchedNewsletterAction = {
  entityType: 'newsletter';
  action: 'fetched';
  payload: ReadNewsletter;
};

export type Actions =
  | CreateNewsletterAction
  | CreateNewsletterItemsAction
  | ReadUserAction
  | ReadNewsletterAction
  | ReadNewslettersAction
  | ReadNewsletterItemsAction
  | UpdateAction
  | DeleteAction
  | FetchNewslettersAction
  | FetchedNewsletterAction;

type Reducer<S, A> = (prevState: S, action: A) => S;

export function stateReducer(prevState: State, action: Actions): State {
  if (action.entityType === 'newsletters' && action.action === 'fetched') {
    const newState = { ...prevState };
    action.payload.forEach((newsletter) => {
      newState?.newsletters?.set(newsletter.id, {
        ...newsletter,
        itemIds: [],
        memberIds: [],
      });
    });
    return newState;
  } else if (
    action.entityType === 'newsletter' &&
    action.action === 'created'
  ) {
    const newsletters = prevState.newsletters;
    newsletters.set(action.payload.id, {
      ...action.payload,
      itemIds: [],
    });

    return {
      ...prevState,
      newsletters,
    };
  } else if (
    action.entityType === 'newsletter' &&
    action.action === 'fetched'
  ) {
    const { newsletter, items, members } = action.payload;
    const newsletters = new Map(prevState.newsletters);

    const newsletterMembers = addArrayItemsToMap(
      members,
      prevState.newsletterMembers
    );
    const newsletterItems = addArrayItemsToMap(
      items,
      prevState.newsletterItems
    );

    const itemIds = items.map((item) => item.id);
    const memberIds = members.map((member) => member.id);

    newsletters.set(newsletter.id, {
      ...newsletter,
      itemIds,
      memberIds,
    });

    return {
      ...prevState,
      newsletters,
      newsletterItems,
      newsletterMembers,
    };
  } else {
    console.error(`Unknown action:  ${action.action}, ${action.entityType}`);
    throw Error('Unknown action: ' + action.action + ', ' + action.entityType);
  }
}

export type Props = {
  children: React.ReactNode;
};

const initialState = {
  newsletters: new Map(),
  newsletterItems: new Map(),
  newsletterMembers: new Map(),
};

export const StateContext = createContext<State>(initialState);
export const StateDispatchContext = createContext<React.Dispatch<Actions>>(
  () => null
);

export function StateProvider(props: Props) {
  const { children } = props;
  const [state, dispatch] = useReducer<Reducer<State, Actions>, State>(
    stateReducer,
    initialState,
    (arg: State) => initialState
  );
  return (
    <StateContext.Provider value={state}>
      <StateDispatchContext.Provider value={dispatch}>
        {children}
      </StateDispatchContext.Provider>
    </StateContext.Provider>
  );
}
