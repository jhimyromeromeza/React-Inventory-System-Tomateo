import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { AiOutlineProduct } from "react-icons/ai";
import { useEffect } from "react";

interface SidebarProps {
  isopen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isopen, setIsOpen, isMobile }) => {
  useEffect(() => {
    // Evita el scroll en el body cuando el menú está abierto en dispositivos móviles
    if (isopen && isMobile) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Limpia el estilo cuando el componente se desmonta
    return () => {
      document.body.style.overflow = "";
    };
  }, [isopen, isMobile]);
  return (
    <nav
      className={`fixed w-full  h-screen  overflow-hidden bg-black text-slate-200 z-10`}
    >
      <div className="w-full flex flex-col  justify-between p-3">
        {isopen && <h2 className="">Menu</h2>}
        <ul className="flex-grow">
          <li>
            <AiOutlineProduct size={25} />
            {isopen && <Link to="/">Productos</Link>}
          </li>
          <li>
            <GiReceiveMoney size={25} />
            {isopen && <Link to="/">Cobranzas</Link>}
          </li>
        </ul>
        <div>
          <button onClick={() => setIsOpen(!isopen)}>
            {isopen ? (
              <FaChevronLeft size={15} />
            ) : (
              <MdKeyboardArrowRight size={25} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;