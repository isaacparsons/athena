import { Route, Routes, Link } from 'react-router-dom';
import Login from './pages/login';

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
