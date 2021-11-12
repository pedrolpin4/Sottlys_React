/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import { useState } from "react/cjs/react.development"
import UserContext from "../../context/UserContext"
import { getBasket } from "../../service/basket"
import BasketProduct from "../BasketProduct";

export default function BasketContent({ setQuantity, sidebar, content, setContent, setSidebar}){
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const [total, setTotal] = useState(0);

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

    useEffect(() => {
        listBasket();
        return () => setQuantity(0)
    }, []);

    return(
        products.length ?
        <>
            {products.map((prod, i) => (<BasketProduct key = {i} prod= {prod} 
                setQuantity = {setQuantity} setTotal = {setTotal} content = {content}/>))}
            <div className = {sidebar && content === 'basket' ? "footer active": "footer"}> 
                {sidebar && content === 'basket' ? 
                <>
                    <div>Total</div>
                    <div>R$ {`${total},00`}</div> 
                </> :
                <></>
            }
            </div>
            <div className = {sidebar && content === 'basket' ? "checkout active": "checkout"}> 
            {sidebar && content === 'basket' ? 
                <>
                    <div>Finalizar compra</div>
                </> :
                <></>
            }
            </div>

        </>: message === "Seu carrinho está vazio :(" ?
            <div className = "error-container">
                <p>{message}</p>
                <div className = "nav-menu__button basket" onClick = {() => setSidebar(false)}>
                    Continuar Comprando
                </div>
            </div> :
        <div className = "error-container">
            <p>{message}</p>
            <div className = "nav-menu__button basket" onClick = {() => setContent('login')}>
                Fazer Login
            </div>
        </div>
    )
}