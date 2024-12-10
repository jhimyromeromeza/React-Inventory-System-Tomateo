import { useState, useContext } from "react";
import { AuthContextType } from "../../Context/types";
import { AuthContext } from "../../Context/authContext";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/useFirebase";
import toast from "react-hot-toast";

interface SignupProps {
  userName: string;
  password: string;
  confirmPassword: string;
}

const useSignup = () => {
  const { setAuthUser } = useContext(AuthContext) as AuthContextType;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signup = async (newUser: SignupProps) => {
    try {
      setLoading(true);
      const success = verifyDatosRegister(newUser);
      if (!success) return;
      const response = await fetch("/api/signup", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.Error);
      setAuthUser([data]);
      const userCretentials = await createUserWithEmailAndPassword(
        auth,
        newUser.userName,
        newUser.password
      );
      if (!userCretentials) throw new Error();
      toast.success("Registrado correctamente");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading };
};
export default useSignup;

const verifyDatosRegister = (usuario: SignupProps) => {
  if (!usuario.userName) {
    toast.error("username is required");
    return false;
  }
  if (!usuario.password) {
    toast.error("password is required");
    return false;
  }
  if (!usuario.confirmPassword) {
    toast.error("confirm password is required");
    return false;
  }
};