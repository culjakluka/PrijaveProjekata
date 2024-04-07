import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect, useState } from "react";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";




// pages & components
import Home from "./pages/Home";
import FirstInputPage from "./pages/FirstInputPage/FirstInputPage";
import SecondInputPage from "./pages/SecondInputPage/SecondInputPage";
import AdminDashboardPage from "./pages/AdminDashboardPage/AdminDashboardPage";
import PdfAttach from "./components/PageComponents/PdfAttach/PdfAttach";
import PdfDownload from "./components/test/PdfDownload";
import ParlovTestPage from "./pages/ParlovTestPage/ParlovTestPage"

function SecondInputWrapper() {
  const { id } = useParams();
  return <SecondInputPage documentId={id} />;
}

function App() {
  const user = useAuthContext();
  const [loggedIn, setLoggedIn] = useState(null);


  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    setLoggedIn(Boolean(loggedUser));
  }, [user]);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={!loggedIn ? <Home /> : <Navigate to="/FirstInput" />}
            />
            <Route
              path="/FirstInput"
              element={loggedIn ? <FirstInputPage /> : <Navigate to="/" />}
            />
            <Route path="/SecondInput/:id" element={<SecondInputWrapper />} />
            <Route path="/PdfAttachTest" element={<PdfAttach />} />
            <Route path="/AdminDashboard" element={<AdminDashboardPage />} />

            <Route path="/parlov-test" element={<ParlovTestPage/>} />
            <Route
              path="/Test"
              element={
                <PdfDownload
                  filename="Statistika teorija - 1 kolokvij.pdf"
                  filepath="Statistika teorija - 1 kolokvij.pdf"
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
