import { Route, Routes } from 'react-router-dom';
// import Login from './pages/Login';
import { Home } from './pages/Home';
// import Newsletter from './pages/Newsletter';
// import { useAuthContext } from './context/auth';

function AppRoutes() {
  // const auth = useAuthContext();
  return (
    <Routes>
      {/* {auth ? (
        <> */}
      <Route path="/" element={<Home />} />
      {/* <Route path="newsletters/:newsletterId" element={<Newsletter />} /> */}
      {/* </>
      ) : ( */}
      {/* // <Route path="/login" element={<Login />} /> */}
      {/* )} */}
    </Routes>
  );
}

export default AppRoutes;
