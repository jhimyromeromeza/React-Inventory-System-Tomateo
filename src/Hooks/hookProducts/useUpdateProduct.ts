import { useState } from "react";
import { Product } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const updateProduct = async (newProduct: Product, id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://matizadostomateo.com/api/updateProduct/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      if (!response) throw new Error(data.error);
      toast.success("Producto actualizado");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return { updateProduct, loading };
};

export default useUpdateProduct;