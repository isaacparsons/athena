// import {
//   TABLE_NAMES,
//   Transaction,
//   dbClient,
//   InsertNewsletterItem,
//   InsertNewsletterItemText,
// } from '../../db';
// export async function createNewsletter(userId: number, name: string) {
//   try {
//     return dbClient.transaction().execute(async (trx: Transaction) => {
//       const newsletter = await trx
//         .insertInto(TABLE_NAMES.NEWSLETTER)
//         .values({
//           name: name,
//           created: new Date().toISOString(),
//           creatorId: userId,
//           ownerId: userId,
//           startDate: new Date().toISOString(),
//           endDate: new Date().toISOString(),
//         })
//         .returningAll()
//         .executeTakeFirstOrThrow();
//       await trx
//         .insertInto(TABLE_NAMES.USER_NEWSLETTER)
//         .values({
//           userId: userId,
//           newsletterId: newsletter.id,
//         })
//         .returningAll()
//         .executeTakeFirstOrThrow();
//       return newsletter;
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
// export async function createNewsletterItemText(
//   itemInput: InsertNewsletterItem,
//   detailsInput: Omit<InsertNewsletterItemText, 'newsletterItemId'>
// ) {
//   try {
//     return dbClient.transaction().execute(async (trx: Transaction) => {
//       const item = await trx
//         .insertInto(TABLE_NAMES.NEWSLETTER_ITEM)
//         .values({ ...itemInput })
//         .returningAll()
//         .executeTakeFirstOrThrow();
//       const details = await trx
//         .insertInto(TABLE_NAMES.NEWSLETTER_ITEM_TEXT)
//         .values({ ...detailsInput, newsletterItemId: item.id })
//         .returningAll()
//         .executeTakeFirstOrThrow();
//       return item;
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
// export async function createNewsletterItemNode(itemInput: InsertNewsletterItem) {
//   try {
//     return dbClient.transaction().execute(async (trx: Transaction) => {
//       const item = await trx
//         .insertInto(TABLE_NAMES.NEWSLETTER_ITEM)
//         .values(itemInput)
//         .returningAll()
//         .executeTakeFirstOrThrow();
//       return item;
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
//# sourceMappingURL=newsletters.js.map