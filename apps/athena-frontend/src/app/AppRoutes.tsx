import { ReactNode } from 'react';
import {
  createHashRouter,
  Navigate,
  Outlet,
  RouteObject,
} from 'react-router-dom';
import { Login, Newsletter, Home, NotFound, NewsletterItem, Templates, NewsletterItemTemplate, Newsletters } from './pages';
import { UserBase } from '@athena/athena-common';
import { Appbar } from './components';

export enum RoutePaths {
  home = '/',
  newsletters = '/newsletters',
  newsletter = '/newsletters/:newsletterId',
  newsletterItems = '/newsletters/:newsletterId/items/:newsletterItemId',
  login = '/login',
  templates = '/templates',
  newsletterItemTemplate = '/templates/item/:newsletterItemTemplateId',
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
      <Appbar title="newsletter" />
      {children}
    </>
  );
}

const routerConfig: RouteObject[] = [
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
    path: RoutePaths.newsletterItems,
    element: <NewsletterItem />,
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
    path: RoutePaths.newsletterItemTemplate,
    element: <NewsletterItemTemplate />,
  },
];

export const appBarVisiblePaths = ['/', '/login', '/templates'];

export const router = createHashRouter(routerConfig);

interface ProtectedRouteProps {
  element: ReactNode;
  user: UserBase | null;
}
export function ProtectedRoute(props: ProtectedRouteProps) {
  const { element, user } = props;
  return user ? element : <Navigate to="/login" replace={true} />;
}
