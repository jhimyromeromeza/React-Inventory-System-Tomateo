import { useState, useContext } from "react";
import { AuthContext } from "../../Context/authContext";
import { AuthContextType } from "../../Context/types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/useFirebase";

interface loginProps {
  userName: string;
  password: string;
}
const useLogin = () => {
  const { setAuthUser } = useContext(AuthContext) as AuthContextType;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (usuario: loginProps) => {
    try {
      setLoading(true);
      const succes = verifyLogin(usuario);
      if (!succes) return;
      const response = await fetch("https://x0g6umbkbf.execute-api.us-east-2.amazonaws.com/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(usuario),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "An unexpected error occurred");
      if (!data.error) {
        console.log("autenticado");
        setAuthUser([data]);
        localStorage.setItem("user", JSON.stringify(data));
        const userCredential = await signInWithEmailAndPassword(
          auth,
          usuario.userName,
          usuario.password
        );
        if (!userCredential) throw Error;
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
  return { login, loading };
};

export default useLogin;

const verifyLogin = ({ userName, password }: loginProps) => {
  if (!userName) {
    toast.error("username is required");
    return false;
  } else if (!password) {
    toast.error("paswword is required");
    return false;
  }
  return true;
};