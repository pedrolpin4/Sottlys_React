/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import BasketContext from "../context/BasketContext"
import { getBasket } from "../service/basket";
import CheckoutProduct from "./CheckoutProduct";
import PaymentModal from "./PaymentModal";

export default function CheckoutBody () {
    const navigate = useNavigate();
    const {products, setProducts} = useContext(BasketContext);
    const [total, setTotal] = useState(0);
    const [delivery, setDelivery] = useState(false)
    const valorEntrega = 32;
    const [entrega, setEntrega] = useState(0);
    const [showModal, setShowModal] = useState(false)
    
    async function listBasket () {
        if(!localStorage.getItem('sottlysLogin')){
            return;
        }
        const result = await getBasket(JSON.parse(localStorage.getItem("sottlysLogin")).token)
        
        if(result.data) {
            setProducts(result.data);
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
        window.scrollTo(0,0)
        if(!localStorage.getItem('sottlysLogin')){
            navigate("/")
        }
        listBasket();
    }, [products.length]);

    return(
        <>
        <CheckoutContainer>
            <ProductsHolder>
                <h1>Sacola</h1>
                <Columns>
                    <p>Quantidade</p>
                    <p>Preço</p>
                    <p>Total</p>
                </Columns>
                {products.map( (prod, i) => <CheckoutProduct key = {i} prod= {prod} products = {products} />)}
            </ProductsHolder>
            <SummaryContainer>
                <h1>Resumo</h1>
                <DeliveryFee>
                    As opções de entrega para {localStorage.getItem('sottlysLogin') ? JSON.parse(localStorage.getItem("sottlysLogin")).user.name : ""} são:
                </DeliveryFee>
                <DeliveryOptions onClick = {() =>{
                    setDelivery(false)
                    setEntrega(0)
                }} delivery = {delivery}>
                    <p>
                        Entrega regular: 6 dias úteis
                    </p>
                    <p>
                        Grátis
                    </p>
                </DeliveryOptions>
                <DeliveryOptions1 onClick = {() =>{
                    setDelivery(true)
                    setEntrega(valorEntrega)
                }} delivery = {delivery}>
                    <p>
                        Entrega rápida: 2 dias úteis
                    </p>
                    <p>
                        R$ {valorEntrega.toFixed(2).replace(".", ",")}
                    </p>
                </DeliveryOptions1>
                <CheckoutNumbers>
                    <p>
                        Número de peças:
                    </p>
                    <p>
                        {products.length}
                    </p>
                </CheckoutNumbers>
                <CheckoutNumbers>
                    <p>
                        Subtotal:
                    </p>
                    <p>
                        R$ {total.toFixed(2).replace(".", ",")}
                    </p>
                </CheckoutNumbers>
                <CheckoutNumbers>
                    <p>
                        Entrega:
                    </p>
                    <p>
                        {entrega ? `R$ ${entrega.toFixed(2).replace(".", ",")}` : "Grátis"}
                    </p>
                </CheckoutNumbers>
                <CheckoutNumbers>
                    <p>
                        Total:
                    </p>
                    <p>
                        R$ {(total + entrega).toFixed(2).replace(".", ",")}
                    </p>
                </CheckoutNumbers>
                <ButtonGreen onClick = {() => setShowModal(true)}>
                    Finalizar Compra
                </ButtonGreen>
                <ButtonWhite onClick = {() => navigate('/')}>
                    Continuar Comprando
                </ButtonWhite>
            </SummaryContainer>
        </CheckoutContainer>
        <PaymentModal showModal = {showModal} setShowModal = {setShowModal} total = {total + entrega} entrega = {entrega}/>
        </>
    )
}

const CheckoutContainer = styled.div`
    font-family: 'Poppins', sans-serif;
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
        font-family: 'Poppins', sans-serif;
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
const DeliveryFee = styled.p`
    margin-top: 15px;
    font-size: 18px;
`

const DeliveryOptions = styled.div`
    cursor: pointer;
    padding: 10px 5px;
    height: 40px;
    border-radius: 5px;
    margin-top: 7px;
    display: flex;
    border: ${props => props.delivery ? "solid 1px #ddd" : "1.5px solid rgb(76, 155, 61)"};
    align-items: center;
    justify-content: space-between;
`

const DeliveryOptions1 = styled.div`
    cursor: pointer;
    padding: 10px 5px;
    height: 40px;
    border-radius: 5px;
    margin-top: 7px;
    display: flex;
    border: ${props => props.delivery ? "1px solid rgb(76, 155, 61)" : "solid 1px #ddd"};
    align-items: center;
    justify-content: space-between;
`


const SummaryContainer = styled.div`
    width: 25vw;
    height: 560px;
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
        font-family: 'Poppins', sans-serif;
        font-size: 24px;
        margin-top: 10px;
        font-weight: 500;
    }

    @media (max-width: 1200px){
        width: 30vw;
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

const CheckoutNumbers = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    padding: 10px 0px;
    border-bottom: .5px solid #eee;

    p{
        font-size: 17px;
    }
`

const ButtonGreen = styled.div`
    cursor: pointer;
    text-transform: uppercase;
    width: 100%;
    height: 50px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: rgb(76, 155, 61);
    margin-top: 1vh;
    font-size: 14px;
    letter-spacing: 1.2px;
`

const ButtonWhite = styled.div`
    cursor: pointer;
    text-transform: uppercase;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    background-color: #fff;
    border: 1px solid #333;
    margin-top: 1vh;
    font-size: 14px;
    letter-spacing: 1.2px;
    font-weight: 600;
`

const Columns = styled.div`
    display: flex;

    p{
        width: 100px;
        text-align: center;
        margin-right: 30px;
        font-size: 22px;
        color: #777;
    }

    p:first-child{
        margin-left: 44%;
    }

    @media(max-width: 1200px){
        p:last-child{
            display: none;
        }
    }
`