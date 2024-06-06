import {Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import FormProductPage from "./pages/FormProductsPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/create" element={<FormProductPage />} />
      </Routes>
    </>
  );
}

export default App;