import { useEffect, useState } from "react";
import CardProduct from "./CardProduct";
import "./cardProduct.css";
import { DataProduct } from "../interfaces/interfaces";
import { useMarca } from "../zustand/useProducts";

export interface ContainerProductosProps {
  loading: boolean;
  products: Array<DataProduct>;
  setShowReload: React.Dispatch<React.SetStateAction<boolean>>;
  handleOnEdit: (product: DataProduct) => void;
}
const ContainerProductos: React.FC<ContainerProductosProps> = ({
  loading,
  products,
  setShowReload,
  handleOnEdit,
}) => {
  const [listProducts, SetListProducts] = useState<Array<DataProduct>>([]);
  const [selectOption, setSelectOption] = useState("");
  const { marca } = useMarca();
  useEffect(() => {
    if (JSON.stringify(products) !== JSON.stringify(listProducts)) {
      SetListProducts(products);
    }
  }, [products]);
  
  return (
    <div className="w-full md:w-[70%]">
      <h2 className="text-center text-2xl font-semibold p-4">Productos</h2>
      <div className="md:flex md:justify-between mb-4 md:gap-x-2 space-y-2 md:space-y-0">
        <div className="text-gray-600">
          <select
            className="w-[200px] h-10 rounded-md "
            value={selectOption}
            onChange={(e) => {
              const Option = e.target.value;
              setSelectOption(e.target.value);
              SetListProducts(() => {
                if (Option == "Todo") return products;
                return products.filter((product) => product.marca === Option);
              });
            }}
          >
            <option value="" disabled hidden>
              Seleciona Marca
            </option>
            <option value="Todo">Todo</option>
            {marca.map((opcion, index) => {
              return <option key={index}>{opcion}</option>;
            })}
          </select>
        </div>
        <div className="text-gray-600  ">
          <label className=" p-2 text-md input input-bordered flex items-center gap-2 ">
            <input
              type="search"
              placeholder="ingrese Nombre del Producto"
              className="h-10 rounded-md w-[300px] p-2  grow "
              onChange={(e) => {
                SetListProducts(() => {
                  return products.filter((product) =>
                    product.nameProduct
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  );
                });
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
      {loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ): (
        <div className="cardProduct">
        {listProducts.map((product) => {
          return (
            <CardProduct
              key={product._id}
              product={product}
              setShowReload={setShowReload}
              handleOnEdit={handleOnEdit}
            />
          );
        })}
      </div>
      )}
    </div>
  );
};

export default ContainerProductos;