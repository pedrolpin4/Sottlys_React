import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from '../context/UserContext';
import { postBasket } from "../service/postBasket";

export default function FasdtBuy({colors, sizes, productId}) {
    // const [color, setColor] = useState();
    const [sizeId, setSizeId] = useState(0);
    const { userData } = useContext(UserContext)

    async function addToBasket(){
        let body = {
            colorId: 7,
            sizeId,
            userId: userData.user.id, 
            productId,
        }
        postBasket(userData.token, body);
    }

    return(
        <ContainerFasdtBuy>
            <ContainerSizes>
                {sizes.map((s)=> <Size key={s.id} onClick={()=>setSizeId(s.id)}>{s.name}</Size>)}
            </ContainerSizes>
            <ContainerColor>
                <Color></Color>
                <Color></Color>
                <Color></Color>
                <Color></Color>
            </ContainerColor>
            <BuyButton onClick={addToBasket}>
               <p>Comprar</p>
            </BuyButton>
        </ContainerFasdtBuy>
    )
}

const ContainerFasdtBuy = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.5);
    height: 50%;
    border-radius: 5px;
    opacity: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(115px);
    transition: all .4s;
    justify-content: space-between;
    align-items: center;
`
const ContainerSizes = styled.div`
    display: flex;
    justify-content: center;
    width: 170px;
    margin-top: 13px;
`
const Size = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    height: 27px;
    width: 27px;
    border-radius: 50%;
    color: white;
    background-color: black;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 700;
    transition: all .2s;
    &:hover{
        background-color:#fff;
        color: black;
        border: solid 1px black;
    }
`
const ContainerColor = styled.div`
    display: flex;
    width: 100%;
    justify-content:center;
    width: 170px;

`
const Color  = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    border: solid 1px gray;
    background-color: white;
    font-size: 14px;
    &:hover{
        border: solid 1px black;
    }

`
const BuyButton = styled.div`
    width: 100%;
    height: 40px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    p{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color: white;
        font-size: 18px;
        text-transform: uppercase;
    }

    &:hover{
        background-color:#b53f3f;
    }

`