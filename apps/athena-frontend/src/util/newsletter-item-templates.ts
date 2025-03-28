// import _ from 'lodash';
// import { nanoid } from 'nanoid';
// import { StoreNewsletterPost } from '@athena/store';
// import {
//   CreateNewsletterPostBatchItem,
//   NewsletterPostDetails,
//   NewsletterPostTemplateData,
//   NewsletterPostPostName,
// } from '@athena/common';

// export const convertToTemplateItems = (items: StoreNewsletterPost[]) => {
//   const realIdTempIdMap: Map<number, string> = new Map(
//     items.reduce((ids, i) => {
//       const { nextId, prevId, parentId } = i.position;
//       ids.push([i.id, nanoid()]);
//       if (nextId) ids.push([nextId, nanoid()]);
//       if (prevId) ids.push([prevId, nanoid()]);
//       if (parentId) ids.push([parentId, nanoid()]);
//       return ids;
//     }, [] as [number, string][])
//   );

//   const getTempId = (id: number) => {
//     const tempId = realIdTempIdMap.get(id);
//     if (!tempId) throw new Error('Invalid id');
//     return tempId;
//   };

//   return items.map((i) => {
//     const { nextId, prevId, parentId } = i.position;
//     const parent = items.find((item) => item.childrenIds.includes(i.id));
//     return {
//       temp: {
//         id: getTempId(i.id),
//         parentId: parent ? getTempId(parent.id) : null,
//         nextId: nextId ? getTempId(nextId) : null,
//         prevId: prevId ? getTempId(prevId) : null,
//       },
//       data: _.omit(i.details, ['id']),
//     };
//   });
// };

// export const convertFromTemplateItems = (
//   newsletterId: number,
//   items: NewsletterPostTemplateData[]
// ): CreateNewsletterPostBatchItem[] => {
//   const realIdTempIdMap: Map<number, string> = new Map(
//     items.reduce((ids, i) => {
//       const { nextId, prevId, parentId } = i.position;
//       ids.push([i.id, nanoid()]);
//       if (nextId) ids.push([nextId, nanoid()]);
//       if (prevId) ids.push([prevId, nanoid()]);
//       if (parentId) ids.push([parentId, nanoid()]);
//       return ids;
//     }, [] as [number, string][])
//   );

//   const getTempId = (id: number) => {
//     const tempId = realIdTempIdMap.get(id);
//     if (!tempId) throw new Error('Invalid id');
//     return tempId;
//   };

//   return items.map((i) => {
//     const { nextId, prevId, parentId } = i.position;
//     const details = _.omit(i.data, ['id']);
//     if (!details.type) throw new Error('Invalid item type');
//     return {
//       newsletterId,
//       title: '',
//       date: new Date().toISOString(),
//       location: undefined,
//       details:
//         details.type === NewsletterPostPostName.Media
//           ? (details as NewsletterPostDetails<NewsletterPostPostName.Media>)
//           : details.type === NewsletterPostPostName.Text
//           ? (details as NewsletterPostDetails<NewsletterPostPostName.Text>)
//           : (details as NewsletterPostDetails<NewsletterPostPostName.Container>),
//       temp: {
//         id: getTempId(i.id),
//         parentId: parentId ? getTempId(parentId) : null,
//         nextId: nextId ? getTempId(nextId) : null,
//         prevId: prevId ? getTempId(prevId) : null,
//       },
//     };
//   });
// };

// export const convertToEditableItems = (
//   items: StoreNewsletterPost[]
// ): CreateNewsletterPostBatchItem[] => {
//   const realIdTempIdMap: Map<number, string> = new Map(
//     items.reduce((ids, i) => {
//       const { nextId, prevId, parentId } = i.position;
//       ids.push([i.id, nanoid()]);
//       if (nextId) ids.push([nextId, nanoid()]);
//       if (prevId) ids.push([prevId, nanoid()]);
//       if (parentId) ids.push([parentId, nanoid()]);
//       return ids;
//     }, [] as [number, string][])
//   );

//   const getTempId = (id: number) => {
//     const tempId = realIdTempIdMap.get(id);
//     if (!tempId) throw new Error('Invalid id');
//     return tempId;
//   };

//   return items.map((i) => {
//     const { nextId, prevId, parentId } = i.position;
//     const parent = items.find((item) => item.childrenIds.includes(i.id));
//     if (!i.details.type) throw new Error('Invalid item type');
//     const details =
//       i.details.type === NewsletterPostPostName.Media
//         ? (i.details as NewsletterPostDetails<NewsletterPostPostName.Media>)
//         : i.details.type === NewsletterPostPostName.Text
//         ? (i.details as NewsletterPostDetails<NewsletterPostPostName.Text>)
//         : (i.details as NewsletterPostDetails<NewsletterPostPostName.Container>);

//     const d: Omit<NewsletterPostDetails, 'id' | 'newsletterItemId'> = _.omit(
//       details,
//       ['id', 'newsletterItemId']
//     );

//     return {
//       newsletterId: i.newsletterId,
//       title: i.title,
//       date: undefined,
//       location: undefined, // TODO: fix this
//       details: d,
//       temp: {
//         id: getTempId(i.id),
//         parentId: parent ? getTempId(parent.id) : null,
//         nextId: nextId ? getTempId(nextId) : null,
//         prevId: prevId ? getTempId(prevId) : null,
//       },
//     } as CreateNewsletterPostBatchItem;
//   });
// };
