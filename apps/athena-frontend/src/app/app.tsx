import { Route, Routes, Link } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import AuthProvider from './context/auth';
import Newsletter from './pages/newsletter';

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="newsletters/:newsletterId" element={<Newsletter />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
