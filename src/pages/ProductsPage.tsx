import "../card.css";
import FormProduct from "../Components/FormProduct";
import { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import ContainerProductos from "../Components/ContainerProductos";
import useGetProducts from "../Hooks/hookProducts/useGetProducts";
import { DataProduct } from "../interfaces/interfaces";
import { Toaster } from "react-hot-toast";

const ProductsPage = () => {
  //const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMovile, setIsMovile] = useState(window.innerWidth <= 768);
  const { loading, setShowReload, products } = useGetProducts();
  const [productEdit, setProductEdit] = useState<DataProduct | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMovile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOnEdit = (products: DataProduct) => {
    setProductEdit(products);
  };
  return (
    <div>
      <Banner isMobile={isMovile} />
      <Toaster />
      <div
        className=""
        /**style={{
           * 
            marginLeft: isOpen ? "200px" : "40px",
            transition: "margin-left 0.3s ease",
          }}**/
      >
        <div className="flex flex-col space-y-5 md:justify-center md:items-center">
          {productEdit ? (
            <FormProduct
              setShowReload={setShowReload}
              productEdit={productEdit}
              setProductEdit={setProductEdit}
            />
          ) : (
            <FormProduct
              setShowReload={setShowReload}
              setProductEdit={setProductEdit}
            />
          )}
          <ContainerProductos
            loading={loading}
            setShowReload={setShowReload}
            products={products}
            handleOnEdit={handleOnEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;