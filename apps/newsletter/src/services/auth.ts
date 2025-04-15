import { NewsletterPermissions, NewsletterRole } from '@athena/common';
import _ from 'lodash';

class EntityAuth<R extends string, P> {
  constructor(readonly permissionsMap: Record<R, P[]>) {}

  validatePermissions = (role: R, permission: P) => {
    const permissions = _.get(this.permissionsMap, role) ?? [];
    return permissions.includes(permission);
  };
}

const newsletterRolePermissionsMap: Record<NewsletterRole, NewsletterPermissions[]> =
  {
    [NewsletterRole.READ_ONLY]: [NewsletterPermissions.READ],
    [NewsletterRole.OWNER]: [
      NewsletterPermissions.READ,
      NewsletterPermissions.WRITE,
      NewsletterPermissions.UPDATE,
      NewsletterPermissions.DELETE,
      NewsletterPermissions.COMMENT,
      NewsletterPermissions.EDIT_MEMBER,
      NewsletterPermissions.SHARE,
      NewsletterPermissions.INVITE,
    ],
    [NewsletterRole.EDITOR]: [
      NewsletterPermissions.READ,
      NewsletterPermissions.WRITE,
      NewsletterPermissions.UPDATE,
      NewsletterPermissions.DELETE,
      NewsletterPermissions.COMMENT,
      NewsletterPermissions.SHARE,
    ],
    [NewsletterRole.COMMENTOR]: [
      NewsletterPermissions.READ,
      NewsletterPermissions.COMMENT,
    ],
  };

export const AuthService = {
  newsletter: new EntityAuth(newsletterRolePermissionsMap),
};
