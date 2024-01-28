import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import { useEffect, useState } from 'react';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// pages & components
import Home from './pages/Home';
import FirstInputPage from './pages/FirstInputPage/FirstInputPage';
import SecondInputPage from './pages/SecondInputPage/SecondInputPage';
import AdminDashboardPage from './pages/AdminDashboardPage/AdminDashboardPage';
import PdfAttach from './components/PdfAttach/PdfAttach';



function App() {
  const user = useAuthContext()
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    setLoggedIn(Boolean(loggedUser));
    }, [user]);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={!loggedIn ? <Home /> : <Navigate to="/SecondInput" />}
            />
            <Route
              path="/FirstInput"
              element={loggedIn ? <FirstInputPage/> : <Navigate to="/" />}
            />
            <Route 
              path="/SecondInput"
              element={loggedIn ? <SecondInputPage /> : <Navigate to="/" />}
            />
            <Route 
              path="/PdfAttachTest"
              element={<PdfAttach />}
            />
            <Route 
              path="/AdminDashboard"
              element={<AdminDashboardPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
