import { useState, useRef, useEffect } from "react";
//import { FiMenu } from "react-icons/fi";
import { RiAdminFill } from "react-icons/ri";
//import Sidebar from "./Sidebar";
import useLogout from "../Hooks/hookAuth/useLogout";

export interface BannerProps {
  //setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  //isOpen: boolean;
}
const Banner: React.FC<BannerProps> = ({ isMobile }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useLogout();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex bg-white w-full h-[60px] justify-between items-center">
        <div className="flex  items-center">
          {!isMobile && <img className="h-[25px]" src={"/logofactura.png"} />}
          {/**<button onClick={() => setIsOpen((prev) => !prev)}>
              <FiMenu size={25} className="text-gray-500 ml-4" />
            </button>**/}
        </div>
        <div className="">
          <div className="md:flex">
            <img className="h-[30px]" src={"/logo.png"} />
            {!isMobile && (
              <h1 className="text-black text-2xl font-semibold">
                TOMATEO RIOS ALEJANDRO
              </h1>
            )}
          </div>
        </div>
        <div className="text-gray-600 ">
          <button
            className="md:flex p-2"
            onClick={() => setIsDropdown((prev) => !prev)}
          >
            {isMobile ? "" : "Administrador"}
            <RiAdminFill size={25} className="text-black mr-4" />
          </button>
          {isDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-[60px] md:w-full z-10 bg-white p-2 cursor-pointer hover:bg-cyan-400 hover:duration-300"
            >
              <button
                onClick={async () => {
                  await logout();
                  console.log("logout");
                }}
              >
                cerrar Secion
              </button>
            </div>
          )}
        </div>
      </div>
      {/**isOpen && (
          <Sidebar isopen={isOpen} setIsOpen={setIsOpen} isMobile={isMobile} />
        )**/}
    </div>
  );
};

export default Banner;