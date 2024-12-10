import { Link } from "react-router-dom";
import useSignup from "../Hooks/hookAuth/useSignup";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
//import { createUserWithEmailAndPassword } from "firebase/auth";
//import { auth } from "../firebase/useFirebase";

const SignupPage = () => {
  const { signup } = useSignup();
  const [newUser, setNewUser] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <div>
      <div className="flex flex-col justify-center h-screen items-center min-w-96">
        <div className="text-center text-2xl p-2">
          <h1>Registrarse</h1>
        </div>
        <div className="bg-gray-400 max-w-220 p-4 bg-opacity-10 rounded-md w-[350px] ">
          <form
            className="flex flex-col space-y-4 w-full"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                //await createUserWithEmailAndPassword(auth, newUser.userName, newUser.password);
                //alert("Usuario registrado exitosamente");
                signup(newUser);
              } catch (error) {
                alert("Usuario no creado");
                console.log(error);
              }
            }}
          >
            <div className="flex flex-col space-y-2">
              <label className="text-base">Usuario: </label>
              <input
                className="rounded-md p-2 text-black"
                onChange={(e) => {
                  setNewUser({ ...newUser, userName: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Contraseña: </label>
              <input
                className="rounded-md p-2 text-black"
                onChange={(e) => {
                  setNewUser({ ...newUser, password: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Confirmar contraseña: </label>
              <input
                className="rounded-md p-2 text-black"
                onChange={(e) => {
                  setNewUser({ ...newUser, confirmPassword: e.target.value });
                }}
              />
            </div>
            <button className="bg-red-500 rounded-md p-1">Registrarse</button>
            <Toaster />
            <Link className="text-center text-blue-400" to="/login">
              Iniciar Seccion
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;