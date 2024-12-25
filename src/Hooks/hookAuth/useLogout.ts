import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/useFirebase";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://x0g6umbkbf.execute-api.us-east-2.amazonaws.com/v1/api/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!data) throw Error(data.error);
      toast.success(data.message);
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};

export default useLogout;