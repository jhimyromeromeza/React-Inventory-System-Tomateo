import { useEffect, useState } from "react";
import { useMarca, useProducts } from "../../zustand/useProducts";
import { DataProduct } from "../../interfaces/interfaces";
import toast from "react-hot-toast";

const useGetProducts = (): {
  loading: boolean;
  products: DataProduct[];
  setShowReload: React.Dispatch<React.SetStateAction<boolean>>;
} => {
  const [loading, setLoading] = useState(false);
  const { products, setProducts } = useProducts();
  const [showlReload, setShowReload] = useState(false);
  const { setMarca } = useMarca();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://x0g6umbkbf.execute-api.us-east-2.amazonaws.com/api/products", {
          method: "GET",
          credentials: "include",
          headers: { "content-type": "application/json" },
        });
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setProducts(data);
        const allMarcasProduct = [];
        const marcaSet = new Set();
        for (let i = 0; i < data.length; i++) {
          if (!marcaSet.has(data[i].marca)) {
            marcaSet.add(data[i].marca);
            allMarcasProduct.push(data[i].marca);
          }
        }
        setMarca(allMarcasProduct);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
        setShowReload(false);
      }
    };
    getProducts();
  }, [setProducts, showlReload, setMarca]);
  return { loading, products, setShowReload };
};

export default useGetProducts;