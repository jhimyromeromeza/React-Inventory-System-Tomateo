import usePostProducts from "../Hooks/hookProducts/usePostProducts";
import { useState, useEffect } from "react";
import useUpdateProduct from "../Hooks/hookProducts/useUpdateProduct";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/useFirebase";
import { DataProduct } from "../interfaces/interfaces";
import { useMarca } from "../zustand/useProducts";
import toast from "react-hot-toast"
import { Product } from "../interfaces/interfaces";

interface FormProductProps {
  setShowReload: React.Dispatch<React.SetStateAction<boolean>>;
  productEdit?: DataProduct;
  setProductEdit: React.Dispatch<React.SetStateAction<DataProduct | null>>;
}

const FormProduct: React.FC<FormProductProps> = ({
  setShowReload,
  productEdit,
  setProductEdit,
}) => {
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const { marca } = useMarca();
  const [inputProduct, setInputProduct] = useState({
    nameProduct: "",
    marca: "",
    priceFactoryProduct: 0,
    priceStoreProduct: 0,
    imageProduct: "",
    imagePath: "",
  });

  useEffect(() => {
    if (productEdit) {
      setInputProduct(productEdit);
    }
  }, [productEdit]);

  useEffect(() => {}, [isLoadingFile]);

  const { sendProduct } = usePostProducts();
  const { updateProduct } = useUpdateProduct();

  return (
    <div className="flex flex-col justify-center items-center m-2">
      <div className="text-xl m-2 md:text-2xl">
        <h1>Registrar Producto</h1>
      </div>
      <div className="bg-gray-500 bg-opacity-20 rounded-xl w-full text-gray-700 ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const allCanpos = verifyInput(inputProduct);
            if(!allCanpos) return; 
            if (productEdit) {
              updateProduct(inputProduct, productEdit._id);
              setProductEdit(null);
            } else {
              sendProduct(inputProduct);
            }
            setInputProduct({
              nameProduct: "",
              marca: "",
              priceFactoryProduct: 0,
              priceStoreProduct: 0,
              imageProduct: "",
              imagePath: "",
            });
            setShowReload(true);
          }}
        >
          <div className="space-y-2 ">
            <div className=" md:flex md:space-x-3">
              <div>
                <input
                  name="nameProduct"
                  className="w-full rounded-md h-10 text-base mb-2"
                  placeholder="Nombre de Producto"
                  type="text"
                  value={inputProduct.nameProduct}
                  onChange={(e) =>
                    setInputProduct({
                      ...inputProduct,
                      nameProduct: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <input
                  name="priceFactoryProduct"
                  className="w-full rounded-md h-10 text-base mb-2"
                  type="number"
                  placeholder="Precio de fabrica"
                  value={inputProduct.priceFactoryProduct || ""}
                  onChange={(e) =>
                    setInputProduct({
                      ...inputProduct,
                      priceFactoryProduct: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <input
                  name="priceStoreProduct"
                  className="w-full rounded-md h-10 text-base mb-2"
                  placeholder="Price de venta"
                  type="number"
                  value={inputProduct.priceStoreProduct || ""}
                  onChange={(e) =>
                    setInputProduct({
                      ...inputProduct,
                      priceStoreProduct: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className=" rounded-md h-10 text-base">
                <select
                  id="OptionMarcas"
                  name="OptionMarcas"
                  className="w-full rounded-md h-10 text-gray-500 "
                  value={inputProduct.marca}
                  onChange={(e) => {
                    setInputProduct({ ...inputProduct, marca: e.target.value });
                  }}
                >
                  <option value="" disabled hidden>
                    Seleccione una opción
                  </option>
                  {marca.map((opcion, index) => {
                    return <option key={index}>{opcion}</option>;
                  })}
                </select>
              </div>
            </div>

            <div className="md:flex md:flex-end space-y-2 md:space-y-0 md:space-x-7">
              <input
                type="file"
                onChange={(e) => {
                  const handleFileUpload = async () => {
                    if (e.target.files && e.target.files.length > 0) {
                      setIsLoadingFile(true); // Estado inicial al cargar
                      try {
                        const archivo = e.target.files[0];
                        if (!archivo)
                          throw new Error("No se seleccionó un archivo.");

                        // Crear imagen y procesar
                        const img = new Image();
                        img.src = URL.createObjectURL(archivo);

                        // Promesa para esperar la carga de la imagen
                        await new Promise((resolve, reject) => {
                          img.onload = resolve;
                          img.onerror = reject;
                        });

                        // Crear canvas y redimensionar
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");
                        if (!ctx)
                          throw new Error(
                            "No se pudo obtener el contexto del canvas."
                          );

                        const maxWidth = 800;
                        const maxHeight = 800;
                        let { width, height } = img;

                        if (width > height && width > maxWidth) {
                          height = (maxWidth / width) * height;
                          width = maxWidth;
                        } else if (height > maxHeight) {
                          width = (maxHeight / height) * width;
                          height = maxHeight;
                        }

                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);

                        // Convertir canvas a WebP
                        const dataUrl = canvas.toDataURL("image/webp", 0.8);
                        const blob = await fetch(dataUrl).then((res) =>
                          res.blob()
                        );
                        //console.log("Tamaño de la imagen WebP:", blob.size / 1024, "KB");

                        // Subir archivo a Firebase Storage
                        const refArchivo = ref(
                          storage,
                          `Imagenes/${archivo.name}.webp`
                        );
                        await uploadBytes(refArchivo, blob);
                        const urlImage = await getDownloadURL(refArchivo);

                        // Actualizar estado del producto con la URL
                        setInputProduct((prev) => ({
                          ...prev,
                          imageProduct: urlImage,
                          imagePath: `Imagenes/${archivo.name}.webp`,
                        }));
                      } catch (error) {
                        console.error("Error procesando la imagen:", error);
                      } finally {
                        setIsLoadingFile(false); // Estado final después de procesar
                      }
                    }
                  };

                  handleFileUpload(); // Ejecutar la función async dentro del evento
                }}
              />
              <div>
                <input
                  placeholder="agregar marca"
                  className="h-10 rounded-md placeholder-red-400"
                  value={inputProduct.marca}
                  onChange={(e) => {
                    setInputProduct({ ...inputProduct, marca: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="text-white">
              <button
                className="bg-red-500 w-full rounded-md p-1"
                disabled={isLoadingFile}
              >
                {isLoadingFile ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Crear"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormProduct;


const verifyInput = (inputProduct: Product) => {
  if(!inputProduct.nameProduct){
    toast.error("Ingresar nombre del producto")
    return false
  }else if (!inputProduct.marca){
    toast.error("Ingresar marca")
    return false;
  }else if(!inputProduct.imagePath && !inputProduct.imageProduct ){
    toast.error("Ingresar imagen");
    return false
  }else{
    return true;
  }
}