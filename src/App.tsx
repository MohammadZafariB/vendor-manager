import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { VendorProvider } from "./contexts/VendorContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home.tsx";
import Landing from "./pages/Landing.tsx";
import Register from "./pages/Register.tsx";
import PersonalInfo from "./pages/PersonalInfo.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Login from "./pages/Login.tsx";

export default function App() {
  return (
    <AuthProvider>
      <VendorProvider>
        <Router>
          <Routes>

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            <Route
              path="/personal-info"
              element={
                <PrivateRoute>
                  <PersonalInfo />
                </PrivateRoute>
              }
            />

            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
                            <ToastContainer />

        </Router>
      </VendorProvider>
    </AuthProvider>
  );
}
