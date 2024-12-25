import { useEffect, useState } from "react";
import { useValid } from "../../zustand/useProducts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useVerifyToken = (): { valid: boolean; loading: boolean } => {
  const [loading, setLoading] = useState(true);
  const { setValid, valid } = useValid();
  const navigate = useNavigate();
  useEffect(() => {
    const validateToken = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://x0g6umbkbf.execute-api.us-east-2.amazonaws.com/v1/api/validarSecion", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setValid(data.valid);

        if (!data) throw Error(data.error);
        if (!data.valid) {
          navigate("/login");
        } else {
          navigate("/");
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    validateToken();
  }, [setValid, navigate, valid]);
  return { valid, loading };
};

export default useVerifyToken;