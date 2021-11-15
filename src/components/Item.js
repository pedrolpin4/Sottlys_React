import styled from "styled-components"
import React, { forwardRef, useEffect } from "react"
import FastBuy from "./FastBuy";

const Item = forwardRef((props, ref) => {
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

    if(images.length !== 0 ){
        image = images[0].name
    }
    
    const installmentsPrice = parseFloat(price/installments).toFixed(2).replace('.', ',')

    useEffect(() => {
        // listProductsByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <ItemBox ref={ref} page ={props.page}>
            <Image  page ={props.page}>
                <img src={image} alt=""/>
                <FastBuy colors ={colors} sizes={sizes} productId={id}/> 
            </Image>         
            <ProductName page ={props.page}>{name}</ProductName>
            <Price page ={props.page}>
                <h3>{Number(price).toFixed(2).replace(".", ",")}</h3>
                <p>{installments}x {installmentsPrice}</p>
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
    overflow-y: hidden;
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
    font-size: ${(props) =>  props.page? '24px' : '20px'};
    font-weight: 700;
    @media(max-width: 800px){
        font-size: 18px;
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
    }
    p{
        font-size: ${(props) =>  props.page? '17px' : '14px'};
        color: gray;
        margin-left: 15px;
    }

    @media(max-width: 800px){
        h3{
            font-size: 15px;
        }
        p{
            font-size: 13px;
        }
    }
`
