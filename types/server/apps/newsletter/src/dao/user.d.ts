import { User } from '@athena/athena-common';
import { DBConnection as DBConnection } from '../db';
export declare class UserDAO {
  readonly db: DBConnection;
  constructor(db: DBConnection);
  get(id: number): Promise<User>;
  newsletters(userId: number): Promise<
    {
      id: number;
      meta: {
        created: string;
        modified: string | null;
        creator: {
          id: number;
          firstName: string | null;
          lastName: string | null;
          email: string;
        };
        modifier: {
          id: number;
          firstName: string | null;
          lastName: string | null;
          email: string;
        } | null;
      };
      properties: {
        name: string;
        dateRange: {
          start: string | null;
          end: string | null;
        };
      };
      owner: {
        id: number;
        firstName: string | null;
        lastName: string | null;
        email: string;
      };
    }[]
  >;
  newsletterItemTemplates(userId: number): Promise<
    {
      id: number;
      name: string;
      meta: {
        created: string;
        modified: string | null;
        creator: {
          id: number;
          firstName: string | null;
          lastName: string | null;
          email: string;
        };
        modifier: {
          id: number;
          firstName: string | null;
          lastName: string | null;
          email: string;
        } | null;
      };
    }[]
  >;
}
