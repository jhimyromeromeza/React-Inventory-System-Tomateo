
// funcion que obtiene los productos de la base de datos
export const getProduct = (req, res) => {
    res.send('getProducts');
}

// funcion que recibe los productos para colocarlo en la base de datos
export const postProduct = (req, res) => {
    res.send('postProduct');
}

// funcion que actualiza los productos para colocarlo en la base de datos
export const putProduct = (req, res) => {
    res.send('putProduct');
}

//fucnion que elimina los producto basado en su id de la base de datos
export const deletePduct = (req, res) => {
    res.send('deleteProduct');
}
