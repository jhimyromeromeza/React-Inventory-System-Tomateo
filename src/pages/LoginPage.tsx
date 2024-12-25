import { Link } from "react-router-dom";
import useLogin from "../Hooks/hookAuth/useLogin";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [usuario, setUsuario] = useState({
    userName: "",
    password: "",
  });

  const { login, loading } = useLogin();
  return (
    <div className="flex flex-col justify-center h-screen items-center min-w-96">
      <div className="text-center text-2xl p-2">
        <h1>Login</h1>
      </div>
      <div className="bg-gray-400 max-w-220 p-4 bg-opacity-10 rounded-md w-[350px] ">
        <form
          className="flex flex-col space-y-4 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            login(usuario);
          }}
        >
          <div className="flex flex-col space-y-2">
            <label className="text-base">Usuario: </label>
            <input
              className="rounded-md p-2 text-black"
              onChange={(e) => {
                setUsuario({ ...usuario, userName: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label>Contraseña: </label>
            <input
              type="password"
              className="rounded-md p-2 text-black"
              onChange={(e) => {
                setUsuario({ ...usuario, password: e.target.value });
              }}
            />
          </div>
          <button type="submit" className="bg-red-500 rounded-md p-1">
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Iniciar secion"
            )}
          </button>
          <Toaster />
          <Link className="text-center text-blue-400" to="/signup">
            Crear Cuenta
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;