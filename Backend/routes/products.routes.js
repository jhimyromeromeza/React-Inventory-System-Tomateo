import { Router } from "express"
import  {getProduct, postProduct, putProduct, deletePduct } from "../controllers/products.controller.js"

const route = Router();

route.get('/', getProduct);
route.post('/created', postProduct);
route.put('/update', putProduct);
route.delete('/delete',deletePduct);

export default route;