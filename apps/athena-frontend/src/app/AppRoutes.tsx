import { ReactNode } from 'react';
import {
  createHashRouter,
  Navigate,
  Outlet,
  RouteObject,
  useRouteError,
} from 'react-router-dom';
import {
  Login,
  Newsletter,
  Home,
  NotFound,
  // Templates,
  Newsletters,
  Templates,
  Template,
} from './pages';
import { User } from '@athena/common';
import { Appbar } from '@athena/components';
import { NewsletterPost } from './pages/NewsletterPost';

export enum RoutePaths {
  home = '/',
  newsletters = '/newsletters',
  newsletter = '/newsletters/:newsletterId',
  newsletterPost = '/newsletters/:newsletterId/posts/:newsletterPostId',
  login = '/login',
  templates = '/templates',
  template = '/templates/:templateId',
  // newsletterItemTemplate = '/templates/item/:newsletterItemTemplateId',
  // account="/account"
  // settings="/settings"
}

interface WithOutletProps {
  children: React.ReactNode;
}
function WithOutlet(props: WithOutletProps) {
  const { children } = props;
  return (
    <>
      <Outlet />
      {children}
    </>
  );
}

interface WithAppbarProps {
  children: React.ReactNode;
}

function WithAppbar(props: WithAppbarProps) {
  const { children } = props;
  return (
    <>
      <Appbar title="Reeliv" />
      {children}
    </>
  );
}
function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <div>
      <h1>Oops, something went wrong!</h1>
      <p>{(error as Error).toString()}</p>
    </div>
  );
}
const routerConfig: RouteObject[] = [
  // {
  //   path: '/not-found',
  //   errorElement: <ErrorBoundary />,
  // },
  {
    path: 'not-found',
    element: <NotFound />,
  },
  {
    path: RoutePaths.home,
    element: <Home />,
  },
  {
    path: RoutePaths.login,
    element: <Login />,
  },
  {
    path: RoutePaths.newsletters,
    element: (
      <WithAppbar>
        <WithOutlet>
          <Newsletters />
        </WithOutlet>
      </WithAppbar>
    ),
  },
  {
    path: RoutePaths.newsletter,
    element: (
      <WithOutlet>
        <Newsletter />
      </WithOutlet>
    ),
  },
  {
    path: RoutePaths.newsletterPost,
    element: <NewsletterPost />,
  },
  {
    path: RoutePaths.templates,
    element: (
      <WithAppbar>
        <WithOutlet>
          <Templates />
        </WithOutlet>
      </WithAppbar>
    ),
  },
  {
    path: RoutePaths.template,
    element: (
      <WithAppbar>
        <Template />
      </WithAppbar>
    ),
  },
];

export const appBarVisiblePaths = ['/', '/login', '/templates'];

export const router = createHashRouter(routerConfig);

interface ProtectedRouteProps {
  element: ReactNode;
  user: User | null;
}
export function ProtectedRoute(props: ProtectedRouteProps) {
  const { element, user } = props;
  return user ? element : <Navigate to="/login" replace={true} />;
}
