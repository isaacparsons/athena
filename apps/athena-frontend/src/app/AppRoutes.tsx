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
  NewsletterRoute,
} from './pages';
import { Appbar, WithIdParamRoute } from '@frontend/components';
import { useUser } from '@frontend/store';
import { RoutePaths } from '@frontend/config';

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
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: RoutePaths.login,
    element: <Login />,
  },
  {
    path: RoutePaths.newsletters,
    element: (
      <ProtectedRoute>
        <WithAppbar>
          <WithOutlet>
            <Newsletters />
          </WithOutlet>
        </WithAppbar>
      </ProtectedRoute>
    ),
  },
  {
    path: RoutePaths.newsletter,
    element: (
      <ProtectedRoute>
        <WithOutlet>
          <WithIdParamRoute
            k="newsletterId"
            render={(id) => <NewsletterRoute id={id} />}
          />
        </WithOutlet>
      </ProtectedRoute>
    ),
  },
  {
    path: RoutePaths.templates,
    element: (
      <ProtectedRoute>
        <WithAppbar>
          <WithOutlet>
            <Templates />
          </WithOutlet>
        </WithAppbar>
      </ProtectedRoute>
    ),
  },
  {
    path: RoutePaths.template,
    element: (
      <ProtectedRoute>
        <WithAppbar>
          <Template />
        </WithAppbar>
      </ProtectedRoute>
    ),
  },
];

export const appBarVisiblePaths = ['/', '/login', '/templates'];

export const router = createHashRouter(routerConfig);

interface ProtectedRouteProps {
  children: ReactNode;
}
export function ProtectedRoute(props: ProtectedRouteProps) {
  const { children } = props;
  const { user } = useUser();
  return user ? children : <Navigate to="/login" replace={true} />;
}
