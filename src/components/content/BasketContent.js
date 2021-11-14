/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router";
import { useState } from "react/cjs/react.development"
import BasketContext from "../../context/BasketContext";
import UserContext from "../../context/UserContext"
import { getBasket } from "../../service/basket"
import BasketProduct from "../BasketProduct";

export default function BasketContent({ setQuantity, sidebar, content, setContent, setSidebar}){
    const [message, setMessage] = useState('');
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const {
        products, 
        setProducts,
    } = useContext(BasketContext);
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
    }, [products.length]);

    return(
        products.length ?
        <div className = "products-container">
            {products.map((prod, i) => (<BasketProduct key = {i} prod= {prod} products = {products} setProducts = {setProducts}
                setQuantity = {setQuantity} setTotal = {setTotal} content = {content}/>))}
            <div className = {sidebar && content === 'basket' ? "footer active": "footer"}> 
                {sidebar && content === 'basket' ? 
                <>
                    <div>Total</div>
                    <div>R$ {total.toFixed(2).replace(".", ",")}</div> 
                </> :
                <></>
            }
            </div>
            <div className = {sidebar && content === 'basket' ? "checkout active": "checkout"}  onClick = {() => navigate("/checkout")}> 
            {sidebar && content === 'basket' ? 
                <>
                    <div>Finalizar compra</div>
                </> :
                <></>
            }
            </div>

        </div>: message === "Seu carrinho está vazio :(" ?
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