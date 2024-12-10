import { MdUpdate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import useDeleteProduct from "../Hooks/hookProducts/useDeleteProduct";
import { useEffect, useState } from "react";
import { storage } from "../firebase/useFirebase";
import { deleteObject, ref } from "firebase/storage";
import { DataProduct } from "../interfaces/interfaces";

export interface CardProductProps {
  product: DataProduct;
  setShowReload: React.Dispatch<React.SetStateAction<boolean>>;
  handleOnEdit: (product: DataProduct) => void;
}

const CardProduct: React.FC<CardProductProps> = ({
  product,
  setShowReload,
  handleOnEdit,
}) => {
  const { deleteProduct } = useDeleteProduct();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const element = document.getElementById(`card-${product._id}`);
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [product._id]);

  return (
    <div
      id={`card-${product._id}`}
      className="flex flex-col bg-green-400 bg-opacity-5 border-solid border-2 border-cyan-500 rounded-xl"
    >
      <div className="h-[200px] md:h-[300px]">
        {isVisible && (
          <img
            className="w-full h-[200px] md:h-[300px] object-cover rounded-xl"
            src={product.imageProduct}
          />
        )}
      </div>
      <div className="flex-grow">
        <h2 className="text-xl m-2 font-bold">{product.nameProduct}</h2>

        <div className="text-md m-2">
          <h3>Marca: {product.marca}</h3>
          <h3>
            <span>Fabricante: S/</span> {product.priceFactoryProduct}
          </h3>
          <h3>Consumidor: S/{product.priceStoreProduct}</h3>
        </div>
      </div>
      <div className="flex justify-center w-full space-x-3 p-1 ">
        <button
          className="bg-red-500 p-1 rounded-md "
          onClick={async () => {
            try {
              const namePath = product.imagePath;
              await deleteProduct(product._id);
              setShowReload(true);
              if (namePath.length > 0) {
                const storageRef = ref(storage, namePath);
                await deleteObject(storageRef);
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <MdDelete size={20} />
        </button>
        <button
          className="bg-red-500 p-1 rounded-md "
          onClick={() => {
            handleOnEdit(product);
          }}
        >
          <MdUpdate size={20} />
        </button>
      </div>
    </div>
  );
};

export default CardProduct;