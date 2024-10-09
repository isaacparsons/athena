// import { createContext, useReducer } from 'react';
// import { addArrayItemsToMap } from '../../util/helpers';
// import { Action, State } from '../types';

// type Reducer<S, A> = (prevState: S, action: A) => S;

// export function stateReducer(prevState: State, action: Action): State {
//   if (action.entityType === 'newsletters' && action.type === 'fetched') {
//     const newState = { ...prevState };
//     // action.payload.forEach((newsletter) => {
//     //   newState?.newsletters?.set(newsletter.id, {
//     //     ...newsletter,
//     //     itemIds: [],
//     //     memberIds: [],
//     //   });
//     // });
//     return newState;
//   }
//   // else if (
//   //   action.entityType === 'newsletter' &&
//   //   action.action === 'fetched'
//   // ) {
//   //   const { newsletter, items, members } = action.payload;
//   //   const newsletters = new Map(prevState.newsletters);

//   //   const newsletterMembers = addArrayItemsToMap(
//   //     members,
//   //     prevState.newsletterMembers
//   //   );
//   //   const newsletterItems = addArrayItemsToMap(
//   //     items,
//   //     prevState.newsletterItems
//   //   );

//   //   const itemIds = items.map((item) => item.id);
//   //   const memberIds = members.map((member) => member.id);

//   //   newsletters.set(newsletter.id, {
//   //     ...newsletter,
//   //     itemIds,
//   //     memberIds,
//   //   });

//   //   return {
//   //     ...prevState,
//   //     newsletters,
//   //     newsletterItems,
//   //     newsletterMembers,
//   //   };
//   // }
//   else {
//     console.error(`Unknown action:  ${action.type}, ${action.entityType}`);
//     throw Error('Unknown action: ' + action.type + ', ' + action.entityType);
//   }
// }

// export type Props = {
//   children: React.ReactNode;
// };

// const initialState: State = {
//   newsletters: new Map(),
//   newsletterItems: new Map(),
//   newsletterMembers: new Map(),
//   locations: new Map(),
// };

// export const StateContext = createContext<State>(initialState);
// export const StateDispatchContext = createContext<React.Dispatch<Action>>(
//   () => null
// );

// export function StateProvider(props: Props) {
//   const { children } = props;
//   const [state, dispatch] = useReducer<Reducer<State, Action>, State>(
//     stateReducer,
//     initialState,
//     (arg: State) => initialState
//   );
//   return (
//     <StateContext.Provider value={state}>
//       <StateDispatchContext.Provider value={dispatch}>
//         {children}
//       </StateDispatchContext.Provider>
//     </StateContext.Provider>
//   );
// }
