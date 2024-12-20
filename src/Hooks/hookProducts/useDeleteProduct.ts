import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/deleteProduct/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) throw new Error("error al eliminar producto");
      toast.success(data.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return { deleteProduct, loading };
};

export default useDeleteProduct;