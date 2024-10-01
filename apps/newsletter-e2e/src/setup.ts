import request from 'supertest';
import {
  TRPCClientError,
  createTRPCProxyClient,
  httpLinkFactory,
} from '@trpc/client';
import { app } from '@athena/backend';
type App = Parameters<typeof request>[0];
type Requester = Parameters<typeof httpLinkFactory>[0]['requester'];
type HTTPResult = Awaited<ReturnType<Requester>['promise']>;

interface SupertestLinkOptions {
  headers?: Record<string, string>;
  trpcPath: string;
}

export const supertestLink = (app: App, options: SupertestLinkOptions) => {
  const supertestRequester: Requester = (requesterOptions) => {
    const input = requesterOptions.runtime.combinedTransformer.input.serialize(
      requesterOptions['input'] as any
    );

    const promise = new Promise<HTTPResult>((resolve, reject) => {
      const method = requesterOptions.type === 'query' ? 'get' : 'post';
      const headers = { accept: 'application/json', ...options.headers };
      const url =
        method === 'get'
          ? `${options.trpcPath}/${
              requesterOptions.path
            }?input=${encodeURIComponent(JSON.stringify(input))}`
          : `${options.trpcPath}/${requesterOptions.path}`;

      request(app)
        [method](url)
        .send(input)
        .set(headers)
        .then((res) => {
          const httpResult: HTTPResult = {
            json: res.body,
            meta: {
              response: { json: () => res.body },
              responseJSON: res.body,
            },
          };
          return resolve(httpResult);
        })
        .catch((err) => {
          return reject(TRPCClientError.from(err, {}));
        });
    });

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const cancel = () => {};

    return { promise, cancel };
  };

  return httpLinkFactory({ requester: supertestRequester })({
    url: '',
    headers: options.headers,
  });
};

export const trpcTestClient = createTRPCProxyClient({
  links: [
    supertestLink(app, {
      trpcPath: '/api/v1/trpc',
      // headers: { Authorization: token },
    }),
  ],
  // transformer: superjson,
});
