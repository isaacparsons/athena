import { createContext } from '../trpc';
import { appRouter as router } from '../trpc/routes';

export function createMockRequest(userId: number, input: object) {
    return {
        ctx: createContext({
            req: {
                user: {
                    userId,
                },
                isAuthenticated: () => true
            } as any,
            res: {} as any,
        }),
        path: '',
        rawInput: input,
        type: router.newsletters.get._type,
    }
}

export function getNewsletter(userId: number, newsletterId: number) {
    return router.newsletters.get(createMockRequest(userId, { id: newsletterId }))
}