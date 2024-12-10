import { useState } from "react";
import { Product } from "../../interfaces/interfaces";
import toast from "react-hot-toast";

const usePostProducts = () => {
  const [loading, setLoading] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const sendProduct = async (product: Product) => {
    try {
      setLoading(true);
      const response = await fetch("/api/newProduct", {
        method: "Post",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.erorr);
      toast.success("Producto creado");
      setDataProduct(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { sendProduct, loading, dataProduct };
};

export default usePostProducts;