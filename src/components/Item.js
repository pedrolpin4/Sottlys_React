import styled from "styled-components"
import React, { forwardRef, useContext } from "react"
import FastBuy from "./FastBuy";
import BasketContext from "../context/BasketContext";
import UserContext from "../context/UserContext";

const Item = forwardRef((props, ref) => {
    const { productsSales } = useContext(UserContext)
    let newPrice =false;
    let image = 'https://renonvstakeinfo.org/wp-content/uploads/2019/07/nocontentyet.jpg';
    const {
        name,
        images,
        installments,
        price,
        colors,
        sizes,
        id
    } = props.prod
    console.log(props.prod);

    const {
        sidebar,
        setSidebar,
        setShowModal,
    } = props

    const {
        setCurrentProduct
    } = useContext(BasketContext)

    if(images.length !== 0 ){
        image = images[0].name
    }

    const newArray = productsSales.filter((e)=> id === e.product_id);
    if(newArray.length !== 0){
        newPrice = newArray[0].new_price;
    }

    
    const installmentsPrice = parseFloat(price/installments).toFixed(2).replace('.', ',')

    return(
        <ItemBox ref={ref} page ={props.page}>
            <Image  page ={props.page}>
                <img src={image} alt="" onClick = {() => {
                    setShowModal(true)
                    setCurrentProduct({...props.prod})
                }}/>
                <FastBuy colors ={colors} sizes={sizes} productId={id} sidebar = {sidebar} setSidebar = {setSidebar}/> 
            </Image>         
            <ProductName page ={props.page} onClick = {() => setShowModal(true)}>{name}</ProductName>
            <Price page ={props.page} sales={newPrice}>
                <h3>{Number(price).toFixed(2).replace(".", ",")}</h3>
                <p>{installments}x {installmentsPrice}</p>
                <h2>{newPrice?'R$' + newPrice : ""}</h2>
            </Price>
        </ItemBox>
        
    )
})

export default Item;

const Image = styled.div`
    cursor: pointer;
    width: ${(props) => props.page? '275px' : '230px'};
    height: ${(props) =>  props.page? '350px' : '280px'};
    border-radius: 5px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow: hidden;
    transition: all .4s;

    @media(max-width: 800px){
        width: 150px;
        height: 190px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    img{
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }
    &:hover div{
        transform: translateY(0);
        opacity: 1;
    }

`
const ProductName = styled.h2`
    cursor: pointer;
    font-size: ${(props) =>  props.page? '22px' : '18px'};
    font-weight: 400;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    @media(max-width: 800px){
        font-size: 16px;
    }
`
const ItemBox = styled.div`
    word-break: normal;
    margin-left: 20px;
    margin-bottom: ${(props) =>  props.page? '30px' : '0px'};
    @media(max-width: 800px){
        margin: 10px 5px;
    }
`
const Price = styled.div`
    display: flex;
    h3{
        font-size: ${(props) =>  props.page? '19px' : '16px'};
        text-decoration: ${(props) =>  props.sales? 'line-through' : 'none'};
    }
    h2{
        font-size: ${(props) =>  props.page? '19px' : '16px'};
    }
    p{
        font-size: ${(props) =>  props.page? '17px' : '14px'};
        color: gray;
        margin-left: 15px;
        visibility: ${(props) =>  props.sales? 'hidden' : 'visible'};
    }

    @media(max-width: 800px){
        h3{
            font-size: 14px;
        }
        p{
            font-size: 12px;
        }
    }
`
