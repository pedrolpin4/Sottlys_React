/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react/cjs/react.development"
import styled from "styled-components"
import BasketContext from "../context/BasketContext"
import UserContext from "../context/UserContext";
import { getBasket } from "../service/basket";
import CheckoutProduct from "./CheckoutProduct";

export default function CheckoutBody () {
    const {products, setProducts} = useContext(BasketContext);
    const {userData} = useContext(UserContext);
    const [total, setTotal] = useState(0);
    let valorEntrega = Math.round(Math.random() * (50 - 30) + 30)
    const [entrega, setEntrega] = useState(0);

    async function listBasket () {
        const result = await getBasket(userData.token)
        
        if(result.data) {
            setProducts(result.data);
            console.log(userData);
            calcTotal(result.data)
            return;
        }

        return;
    }

    function calcTotal(prods){
        let sum = 0;
        prods.forEach(e => {
            sum+= e.quantity * e.product.price
        });
        setTotal(sum)
    }

    useEffect(() => {
        listBasket();
    }, [products.length]);

    return(
        <CheckoutContainer>
            <ProductsHolder>
                <h1>Sacola</h1>
                {products.map( (prod, i) => <CheckoutProduct key = {i} prod= {prod} products = {products} />)}
            </ProductsHolder>
            <SummaryContainer>
                <h1>Resumo</h1>
                <p>
                    Número de peças {products.length}
                </p>
                <p>
                    As opções de entrega para {userData.user.name} são:
                </p>
                <p onclick = {() => setEntrega(0)}>
                    Entrega regular: 6 dias úteis - Grátis
                </p>
                <p onClick = {() => setEntrega(valorEntrega)}>
                    Entrega rápida: 2 dias úteis - {valorEntrega}
                </p>
                <p>
                    Subtotal: {total}
                </p>
                <p>
                    Entrega: {entrega}
                </p>
                <p>
                    Total: {total + entrega}
                </p>
            </SummaryContainer>
        </CheckoutContainer>
    )
}

const CheckoutContainer = styled.div`
    width: 100%;
    background-color: #efefef;
    display: flex;
    margin-top: 5rem;
    overflow-y: hidden;
    @media (max-width: 1000px){
        margin-top: 4rem;
        flex-direction: column;
        align-items: center;
    }
`

const ProductsHolder = styled.div`
    width: 55vw;
    margin-bottom: 400px;
    margin-top: 2rem;
    margin-left: 5vw;
    border-radius: 5px;
    padding: 30px;
    height: auto;
    min-height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    background-color: white;

    h1{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 24px;
        margin-top: 10px;
        font-weight: 500;
    }

    @media (max-width: 1000px){
        width: 80vw;
        margin-bottom: 0px;
    }

    @media (max-width: 850px){
        width: 100vw;
        margin-left: 0;
    }
`

const SummaryContainer = styled.div`
    width: 25vw;
    height: 500px;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 50px;
    position: fixed;
    top: 7rem;
    left: 65vw;
    display: flex;
    flex-direction: column;
    background-color: white;

    h1{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 24px;
        margin-top: 10px;
        font-weight: 500;
    }

    @media (max-width: 1000px){
        width: 80vw;
        position: relative;
        left: 2vw;
        margin-bottom: 150px;
    }

    @media (max-width: 850px){
        width: 100vw;
        margin-left: 0;
        left: 0;
    }

`