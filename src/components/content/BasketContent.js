/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import { useState } from "react/cjs/react.development"
import UserContext from "../../context/UserContext"
import { getBasket } from "../../service/basket"

export default function BasketContent(){
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('')
    const {userData} = useContext(UserContext);

    async function listBasket () {
        const result = await getBasket(userData.token)
        
        if(result.data) {
            setProducts(result.data);
            return;
        }

        setMessage(result.message);
        return;
    }

    useEffect(() => listBasket(), []);

    return(
        products.length ?
        products.map(prod => (
            <>
                <p>{prod.quantity}</p>
                <p>{prod.colors.name}</p>
                <p>{prod.size.name}</p>
                <p>{prod.product.name}</p>
                <p>{prod.product.description}</p>
                <p>{prod.product.price}</p>
                <p>{prod.product.installments}</p>
            </>
        )) :
        <p>{message}</p>
    )
}