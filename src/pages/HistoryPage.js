import { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react/cjs/react.development";
import dayjs from "dayjs";
import styled from "styled-components";
import Header from "../components/Header";
import getHistory from "../service/history";

export default function HistoryPage({sidebar, setSidebar}){
    const navigate = useNavigate()
    const [shoppings, setShoppings] = useState([]);
    const [message, setMessage] = useState('');

    async function listHistory(token){
        const result = await getHistory(token)

        if(result?.data){
            setShoppings(result.data)
            return;
        }

        setMessage(result.message)
    }

    useEffect(() => {
        if(!localStorage.getItem('sottlysLogin')){
            setMessage("Você deve estar logado para ver o histórico de compras :(");
            return;
        }

        listHistory(JSON.parse(localStorage.getItem('sottlysLogin')).token)
        return;
    }, [])

    return(
        <>
            <Header sidebar = {sidebar} setSidebar = {setSidebar} />
            <HistoryContainer>
                <h1>Compras</h1>
                {
                message === "Parece que você ainda não realizou nenhuma compra :("? 
                    <>
                        <MessageContainer>
                            {message}
                        </MessageContainer>
                        <ButtonBlack onClick = {() => navigate("/")}>
                            Continuar Comprando
                        </ButtonBlack>
                    </>
                : message ? 
                    <>
                        <MessageContainer>
                            {message}
                        </MessageContainer>
                        <ButtonBlack onClick = {() => setSidebar(true)}>
                            Fazer Login
                        </ButtonBlack>
                    </>
                :
                    shoppings.map((shop, i) => {
                        let total = 0;
                        let quantity = 0;

                        shop.products.forEach(e => {
                            total+= Number(e.price);
                            quantity += e.quantity
                        })

                        return(
                            <ShoppingContainer key = {'s'+ i}>
                                <TopSection>
                                    {dayjs(shop.date).format('DD/MM/YYYY')}
                                </TopSection>
                                <ShoppingBody>
                                    { shop.products.map((prod, j) => (
                                        <ProductContainer key = {'p' + j}>
                                            <img src = {`${prod.image}`} alt = "imagem do produto"/>
                                            <ProductsInfo>
                                                <p><span>Nome:</span> {prod.name}</p>
                                                <p>{prod.description}</p>
                                            </ProductsInfo>
                                            <ProductsSpecifics>
                                                <p><span>Cor:</span> {prod.color}</p>
                                                <p><span>Tamanho:</span> {prod.size}</p>
                                            </ProductsSpecifics>
                                            <ProductsNumbers>
                                                <p><span>Preço:</span> R$ {Number(prod.price).toFixed(2).replace(".", ",")}</p>
                                                <p><span>Quantidade:</span> {prod.quantity}</p>
                                            </ProductsNumbers>
                                        </ProductContainer>
                                    ))}
                                </ShoppingBody>
                                <ShoppingInfo>
                                    <p>Forma de pagamento: <span>{shop.payment_method === 'PIX' ? 'Pix' : 'Cartão'}</span></p>
                                    <p>Número de Parcelas: <span>{shop.installments}x</span></p>
                                    <p>Taxa de Entrega: <span>RS {Number(shop.delivery_fee).toFixed(2).replace(".", ",")}</span></p>
                                    <p>Número de Peças: <span>{quantity}</span></p>
                                    <p>Valor Total: <span>R$ {Number(total).toFixed(2).replace(".", ",")}</span></p>
                                </ShoppingInfo>
                            </ShoppingContainer>
                        )}
                    )}
            </HistoryContainer>
        </>
    )
}

const MessageContainer = styled.div`
    margin-top: 12rem;
    margin-bottom: 50px;
    align-self: center;
    font-size: 32px;
    color: rgba(180, 20, 20);
`

const ShoppingContainer = styled.div`
    height: auto;
    width: 80%;
    height: auto;
    border-radius: 5px;
    box-shadow: 1.5px 1.5px 2px rgba(0, 0, 0, 0.15);
    margin: 15px 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(max-width: 1000px){
        width: 90%
    }

    @media(max-width: 850px){
        width: 95%
    }

    @media(max-width: 600px){
        width: 100%
    }
`

const TopSection = styled.div`
    height: auto;
    padding: 10px 15px;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-size: 18px;
`

const HistoryContainer = styled.div`
    margin-top: 7rem;
    min-height: calc(100vh - 7rem);
    width: 100%;
    background-color: #efefef;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        width: 80%;
        font-size: 32px;
        align-self: center;
        margin: 2rem 0px;

        @media(max-width: 1000px){
            width: 90%
        }

        @media(max-width: 850px){
            font-size: 26px;
            width: 95%;
            margin-bottom: 1rem;
        }

        @media(max-width: 600px){
            font-size: 24px;
            width: 97%;
            margin-bottom: 1rem;
        }
    }
    @media(max-width: 1000px){
        margin-top: 6rem;
        min-height: calc(100vh - 6rem);
    }
    @media(max-width: 600px){
        margin-top: 5rem;
        min-height: calc(100vh - 5rem);
    }
`

const ShoppingBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 15px;

    img{
        width: 10%;
    }

    @media(max-width: 850px){
        img{
            width: 20%;
            margin-right: 3%;
        }
    }
    @media(max-width: 600px){
        img{
            width: 30%;
        }
    }
    @media(max-width: 850px){
        font-size: 16px;
    }
`

const ButtonBlack = styled.div`
    cursor: pointer;
    text-transform: capitalize;
    width: 30%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: rgb(0,0,0);
    margin-top: 1vh;
    font-size: 24px;
`

const ProductContainer = styled.div`
    display: flex;
    width: 180px;
    width: 100%;
    height: auto;
    padding: 15px;
    border-bottom: 1px solid #eee;
`

const ProductsInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    p{
        margin-bottom: 40px;
        color: black;
    }
    span{
        color: #777;
    }

    @media(max-width: 850px){
        width: 27%;
    }
    @media(max-width: 600px){
        width: 35%;

        p:last-child{
            display: none;
        }
    }
`

const ProductsSpecifics = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
    p{
        margin-bottom: 40px;
        color: black;
    }
    span{
        color: #777;
    }
    @media(max-width: 850px){
        width: 27%;
    }
    @media(max-width: 600px){
        width: 35%;
    }
`


const ProductsNumbers = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    width: 30%;
    p{
        margin-bottom: 40px;
        color: black;
    }
    span{
        color: #777;
    }
    @media(max-width: 850px){
        width: 27%;
    }
    @media(max-width: 600px){
       display: none;
    }
`

const ShoppingInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    padding: 15px;
    font-size: 18px;
    p{
        color: #777;
        margin: 15px 2%;
    }

    span{
        color: black;
    }
    @media(max-width: 850px){
        font-size: 16px;
    }
`