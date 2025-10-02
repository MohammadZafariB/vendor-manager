// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { VendorProvider } from "./contexts/VendorContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import PersonalInfo from "./pages/PersonalInfo.tsx"; // 👈 صفحه جدید
import PrivateRoute from "./components/PrivateRoute.tsx";

export default function App() {
  return (
    <AuthProvider>
      <VendorProvider>
        <Router>
          <Routes>

            {/* صفحه اصلی */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            {/* صفحه اطلاعات کاربر */}
            <Route
              path="/personal-info"
              element={
                <PrivateRoute>
                  <PersonalInfo />
                </PrivateRoute>
              }
            />

            {/* صفحات عمومی */}
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
