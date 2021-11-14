import { IoTrashOutline } from "react-icons/io5";
import styled from "styled-components";

export default function CheckoutProduct ({prod, products}) {
    return (
        <ProductContainer key = {prod.id}>
            <IoTrashOutline size = {20} onClick = {() => {
            }}/>
            <CheckoutImg src ={prod.image ? prod.image.name :  "/assets/Girassol.png"} 
                alt ="imagem produto" key = {`i${prod.product.id}`}/>
            <ProductInfo>
                <ProductName>{prod.product.name}</ProductName>
                <p>Cor: <span className = "black">{prod.colors.name}</span></p>
                <p>Tamanho: <span className = "black">{prod.size.name}</span></p>
            </ProductInfo>
            <Operators>
                <div>
                    -
                </div>
                <p>{prod.quantity}</p>
                <div>
                        +
                </div>
            </Operators>
            <p>R$ {Number(prod.product.price).toFixed(2).replace(".", ",")}</p>
            <p>R$ {(Number(prod.product.price)*prod.quantity).toFixed(2).replace(".", ",")}</p>
        </ProductContainer>
       )
}

const ProductContainer = styled.div`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    width: 100%;
    height: 130px;
    display: flex;
    margin-top: 20px;
    position: relative;
    align-items: center;

    svg{
        cursor: pointer;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }

    p{
        width: 100px;
        margin-right: 30px;
        font-size: 16px;
    }

    @media (max-width: 1200px){
        p:last-child{
            display: none;
        }
        svg{
            width: 15px;
        }

        p{
            font-size: 14px;
        }
    }
`

const CheckoutImg = styled.img`
    width: 15%;
    height: 120px;
    margin-right: 10px;
`

const ProductName = styled.h2`
    font-size: 18px;
    margin-bottom: 25px;
    color: black;

    @media (max-width: 850px){
        font-size: 15px
    }
`

const ProductInfo = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
    margin-right: 25px;

    p{
        font-size: 14px;
        color: #aaa;
        margin-bottom: 10px;
    }

    @media(max-width: 1200px){
        p:last-child{
            display: initial;
        }
    }
`

const Operators = styled.div`
    width: 15%;
    margin-right: 30px;
    display: flex;
    justify-content: space-between;
    color: #aaa;

    p{
        width: auto;
        color: #333;
        padding: 4px 0px;
        margin: 0px 7px;
    }

    div:last-child{
        cursor: pointer;
        padding: 4px 6px;
        transition: .2s;
    }

    div:hover{
        background-color: #111;
        color: #fff;
    }

    div:first-child{
        cursor: pointer;
        padding: 4px 6px;
    }
`