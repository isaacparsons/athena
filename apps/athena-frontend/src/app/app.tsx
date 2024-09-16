import { Route, Routes, Link } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import AuthProvider from './context/auth';

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
