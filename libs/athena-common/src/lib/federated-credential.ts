import { z } from 'zod';

export const federatedCredentialSchema = z.object({
  id: z.coerce.number(),
  provider: z.string(),
  subjectId: z.string(),
  userId: z.number(),
});

export const createFederatedCredentialSchema = federatedCredentialSchema.omit({
  id: true,
});
