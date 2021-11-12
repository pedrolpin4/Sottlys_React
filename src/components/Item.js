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
        <ItemBox ref={ref}>
            <Image>
                <img src={image} alt=""/>
                <FastBuy colors ={colors} sizes={sizes} productId={id}/> 
            </Image>         
            <ProductName>{name}</ProductName>
            <Price>
                <h3>{Number(price).toFixed(2).replace(".", ",")}</h3>
                <p>{installments}x {installmentsPrice}</p>
            </Price>
        </ItemBox>
        
    )
})

export default Item;

const Image = styled.div`
    cursor: pointer;
    width: 230px;
    height: 280px;
    border-radius: 5px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow-y: hidden;
    transition: all .4s;

    @media(max-width: 800px){
        width: 155px;
        height: 190px;
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
    font-size: 20px;
    font-weight: 700;
    @media(max-width: 800px){
        font-size: 18px;
    }
`
const ItemBox = styled.div`
    word-break: normal;
    margin-left: 20px;
`
const Price = styled.div`
    display: flex;
    h3{
        font-size: 16px;
    }
    p{
        font-size: 14px;
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
