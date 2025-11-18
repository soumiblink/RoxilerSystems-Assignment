import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import StoreOwnerPage from "./pages/StoreOwnerPage";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["NORMAL_USER"]}>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/store-owner"
          element={
            <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
              <StoreOwnerPage />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/"
          element={
            user ? (
              user.role === "SYSTEM_ADMIN" ? (
                <Navigate to="/admin" />
              ) : user.role === "STORE_OWNER" ? (
                <Navigate to="/store-owner" />
              ) : (
                <Navigate to="/user" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
