// export type UpdateEntityInput = UpdateUserInput | UpdateNewsletterInput;

// export type DeleteEntityInput = number;

// //  ****************************************
// //  State
// //  ****************************************

// export type State = {
//   newsletters: NewslettersState;
//   newsletterItems: NewsletterItemsState;
//   newsletterMembers: NewsletterMembersState;
//   locations: LocationsState;
// };

// export type StateEntityType = 'newsletters' | 'user-newsletters';

// export type NewslettersState = Map<number, NewsletterState>;
// export type NewsletterItemsState = Map<number, ReadNewsletterItem>;
// export type NewsletterMembersState = Map<number, ReadUser>;
// export type LocationsState = Map<number, ReadLocation>;

// export type NewsletterState = INewsletter & {
//   itemIds: number[];
//   memberIds: number[];
// };

// // export type FetchedEntityAction<T extends > = any

// type ActionType = 'fetched';

// export type Action = {
//   type: ActionType;
//   entityType: StateEntityType;
//   payload: ReadEntity[];
// };
