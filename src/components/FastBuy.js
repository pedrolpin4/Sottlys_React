/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from '../context/UserContext';
import { postBasket } from "../service/postBasket";

export default function FastBuy({colors, sizes, productId, setSidebar}) {
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const { userData } = useContext(UserContext);

    function addToBasket(){
        const chosenColor = colors.filter(col => col.name === color);
        const chosenSize = sizes.filter(s => s.name === size);

        if(!userData.user){
            setSidebar(true)
            return;
        }

        let body = {
            colorId: chosenColor[0].id,
            sizeId: chosenSize[0].id,
            userId: userData.user.id, 
            productId,
        }
        postBasket(userData.token, body); 
    }

    useEffect(() => {
        if(colors){
            setColor(colors[0].name)
        }
        if(sizes){
            setSize(sizes[0].name)
        }
    }, [])

    return(
        <ContainerFastBuy>
            <ContainerSizes>
                {
                    sizes.map(s => (
                            size === s.name ?
                            <Size key = {s.id} onClick = {() => setSize(s.name)} selected = {true}>{s.name}</Size> : 
                            <Size key = {s.id} onClick = {() => setSize(s.name)} selected = {false}>{s.name}</Size>
                    ))
                }
            </ContainerSizes>
            <ContainerColor>
            {
                colors.map(c => (
                    color === c.name ? 
                    <Color hex = {c.hexadecimal} key = {c.id} onClick = {() => setColor(c.name)} selected = {true}></Color> : 
                    <Color hex = {c.hexadecimal} key = {c.id} onClick = {() => setColor(c.name)} selected = {false}></Color>
                ))
            }
            </ContainerColor>
            <BuyButton onClick={addToBasket}>
               <p>Comprar</p>
            </BuyButton>
        </ContainerFastBuy>
    )
}

const ContainerFastBuy = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 1;
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
    color: ${props => props.selected ? "black": "white"};
    background-color: ${props => props.selected ? "white": "black"};
    border: ${props => props.selected ? "solid 1px black": "none"};
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 700;
    transition: all .2s;
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
    border: ${props => props.selected ? "2px solid black": "solid 1px gray"};
    background-color: ${props => props.hex};
    font-size: 14px;
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
