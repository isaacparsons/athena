import Cookies from 'js-cookie';
import _ from 'lodash';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
// import Login from './pages/Login';
import { Home } from './pages/Home';
import { Box, CircularProgress } from '@mui/material';
import { Login, Newsletter } from './pages';
import { NotFound } from './pages/NotFound';
import { ReactNode, useEffect } from 'react';
import { useStore } from './store';
import { useShallow } from 'zustand/react/shallow';
// import Newsletter from './pages/Newsletter';
// import { useAuthContext } from './context/auth';
import { UserBase } from '@athena/athena-common';
import { NewsletterItem } from './pages/NewsletterItem';
import { Templates } from './pages/Templates';
import { Appbar } from './components';

const SESSION_COOKIE_NAME = 'newsletter_session';

type RoutePathConfig = {
  value: string;
  parent: RoutePathConfig | null;
};
const HomeRoutePathConfig: RoutePathConfig = {
  value: '/',
  parent: null,
};
const LoginRoutePathConfig: RoutePathConfig = {
  value: '/login',
  parent: HomeRoutePathConfig,
};

const NewsletterRoutePathConfig: RoutePathConfig = {
  value: '/newsletters/:newsletterId',
  parent: HomeRoutePathConfig,
};

const NewsletterItemRoutePathConfig: RoutePathConfig = {
  value: `${NewsletterRoutePathConfig.value}/items/:newsletterItemId`,
  parent: NewsletterRoutePathConfig,
};

const TemplatesRoutePathConfig: RoutePathConfig = {
  value: `/templates`,
  parent: HomeRoutePathConfig,
};

const NewsletterItemTemplateRoutePathConfig: RoutePathConfig = {
  value: `${TemplatesRoutePathConfig.value}/item-template/:newsletterItemTemplateId`,
  parent: TemplatesRoutePathConfig,
};

export const ROUTE_PATHS = {
  home: HomeRoutePathConfig,
  login: LoginRoutePathConfig,
  newsletter: NewsletterRoutePathConfig,
  newsletterItem: NewsletterItemRoutePathConfig,
  templates: TemplatesRoutePathConfig,
  newsletterItemTemplates: NewsletterItemTemplateRoutePathConfig,
};
export const routePathConfigArr = Object.values(ROUTE_PATHS);
export const appBarVisiblePaths = Object.values(
  _.pick(ROUTE_PATHS, ['home', 'login', 'templates'])
).map((i) => i.value);

export function AppRoutes() {
  const { user, fetchUser, loading } = useStore(
    useShallow((state) => ({
      user: state.user.data,
      fetchUser: state.user.fetch,
      loading: state.user.loading,
    }))
  );
  const navigate = useNavigate();

  // const checkSession = useCallback(async () => {
  //   const sessionId = Cookies.get(SESSION_COOKIE_NAME);
  //   if (!sessionId) {
  //     navigate('/login');
  //   }
  // }, [api, navigate, user]);

  useEffect(() => {
    // checkSession();
    if (!user) fetchUser();
  }, []);

  return (
    <Box sx={{ flex: 1, minHeight: '100vh', bgcolor: grey[200] }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Appbar title="Newsletter" />
          <Routes>
            <Route path={ROUTE_PATHS['login'].value} element={<Login />} />
            <Route path={ROUTE_PATHS['home'].value} element={<Home />} />
            <Route
              path={ROUTE_PATHS['newsletter'].value}
              element={<Newsletter />}
            />
            <Route
              path={ROUTE_PATHS['newsletterItem'].value}
              element={<NewsletterItem />}
            />
            <Route
              path={ROUTE_PATHS['templates'].value}
              element={<Templates />}
            />
            {/* <Route
            path={ROUTE_PATHS['newsletterItemTemplates'].value}
            element={}
          /> */}

            {/* <Route
            path={ROUTE_PATHS['settings'].value}
            element={}
          /> */}
            {/* <Route
            path={ROUTE_PATHS['account'].value}
            element={}
          /> */}
            <Route path="error" element={<NotFound />} />
          </Routes>
        </>
      )}
    </Box>
  );
}

interface ProtectedRouteProps {
  element: ReactNode;
  user: UserBase | null;
}
export function ProtectedRoute(props: ProtectedRouteProps) {
  const { element, user } = props;
  return user ? element : <Navigate to="/login" replace={true} />;
}
