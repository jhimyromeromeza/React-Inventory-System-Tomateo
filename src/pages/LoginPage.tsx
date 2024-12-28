import { Link } from "react-router-dom";
import useLogin from "../Hooks/hookAuth/useLogin";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { MdEmail } from "react-icons/md";

const LoginPage = () => {
  const [usuario, setUsuario] = useState({
    userName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
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
            <label className="text-base">Correo: </label>
            <label className="relative text-gray-600 p-2 text-md input input-bordered flex items-center gap-2">
            <input
              className="rounded-md p-2 text-black bg-white"
              onChange={(e) => {
                setUsuario({ ...usuario, userName: e.target.value });
              }}
            />
            <MdEmail size={20} className="absolute right-3"/>
            </label>
          </div>
          <div className="flex flex-col space-y-2">
            <label>Contraseña: </label>
            <div className="relative text-gray-600 ">
            <label className="p-2 text-md input input-bordered flex items-center gap-2">
              <input
                type={!showPassword ? "password": "text"}
                className="rounded-md p-2 text-black bg-white"
                onChange={(e) => {
                  setUsuario({ ...usuario, password: e.target.value });
                }}
              />
              <button className="absolute right-3"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <MdVisibilityOff size={20}/>
                ): (
                  <MdVisibility size={20}/>
                )}
              </button>
            </label>
            </div>
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