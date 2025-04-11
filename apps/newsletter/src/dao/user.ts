import 'reflect-metadata';
import {
  CreateFederatedCredential,
  CreateUser,
  Newsletter,
  ReadUser,
  Template,
  User,
} from '@athena/common';
import { inject, injectable } from 'inversify';
import {
  TYPES,
  DBConnection,
  IUserDAO,
  INewsletterDAO,
  ITemplateDAO,
  Transaction,
} from '@backend/types';
import { mapUser } from './mapping';

@injectable()
export class UserDAO implements IUserDAO {
  constructor(
    @inject(TYPES.DBClient) readonly db: DBConnection,
    @inject(TYPES.INewsletterDAO) readonly newsletterDAO: INewsletterDAO,
    @inject(TYPES.ITemplateDAO) readonly templateDAO: ITemplateDAO
  ) {}

  async read(id: number): Promise<ReadUser> {
    const user = await this.db
      .selectFrom('user')
      .where('user.id', '=', id)
      .selectAll()
      .executeTakeFirstOrThrow();

    const newsletters = await this.newsletters(user.id);
    const templates = await this.templates(user.id);
    return {
      ...mapUser(user),
      newsletters,
      templates,
    };
  }

  async newsletters(userId: number): Promise<Newsletter[]> {
    return this.newsletterDAO.readByUserId(userId);
  }

  async templates(userId: number): Promise<Template[]> {
    return this.templateDAO.readByUserId(userId);
  }

  async upsert(
    input: CreateUser,
    federatedCredential: Omit<CreateFederatedCredential, 'userId'>
  ): Promise<User> {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const { email, firstName, lastName } = input;
      const { subjectId, provider } = federatedCredential;
      let user = await trx
        .selectFrom('user')
        .where('email', '=', email)
        .selectAll()
        .executeTakeFirst();

      if (!user) {
        user = await trx
          .insertInto('user')
          .values({ firstName, lastName, email })
          .returningAll()
          .executeTakeFirstOrThrow();
      }

      const credentials = await trx
        .selectFrom('federated_credential')
        .where((eb) =>
          eb.and([eb('subjectId', '=', subjectId), eb('provider', '=', provider)])
        )
        .selectAll()
        .executeTakeFirst();

      if (!credentials) {
        await trx
          .insertInto('federated_credential')
          .values({
            subjectId: subjectId,
            provider: provider,
            userId: user.id,
          })
          .returningAll()
          .executeTakeFirstOrThrow();
      }
      return user;
    });
  }
}
