import {Routes, Route} from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import FormProductPage from "./pages/FormProductPage";


const App = () => {
  return(
    <>
    <Routes>
      <Route path="/" element={<ProductsPage />}></Route>
      <Route path="/" element={<FormProductPage />}></Route>
    </Routes>
    </>
  )
}

export default App;