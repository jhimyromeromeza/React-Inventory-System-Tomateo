import { create } from "zustand";
import { DataProduct } from "../interfaces/interfaces";

interface useProductState {
  products: DataProduct[];
  setProducts: (products: DataProduct[]) => void;
}
interface useValidState {
  valid: boolean;
  setValid: (valid: boolean) => void;
}

interface useMarcaState {
  marca: string[];
  setMarca: (marca: string[]) => void;
}

//estado con zunstand de productos
export const useProducts = create<useProductState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));

//estado de zustand de validacion de autenticacion
export const useValid = create<useValidState>((set) => ({
  valid: false,
  setValid: (valid) => set({ valid }),
}));

//estado de zustand de marca
export const useMarca = create<useMarcaState>((set) => ({
  marca: [],
  setMarca: (marca) => set({ marca }),
}));
