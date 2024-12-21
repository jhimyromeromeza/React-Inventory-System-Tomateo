import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoutes>
              <LoginPage />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <ProductsPage />
            </ProtectedRoutes>
          }
        />
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
    </>
  );
};

export default App;