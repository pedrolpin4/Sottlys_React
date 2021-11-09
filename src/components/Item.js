import styled from "styled-components"
import React, { forwardRef } from "react"

const Item = forwardRef((props, ref) => {
    

    return(
        <ItemBox ref={ref}>
            <Image src="https://cdn.awsli.com.br/600x450/31/31885/produto/25840335/5e9c65111b.jpg" />
            <ProductName>sapato bunitin </ProductName>
            <Price>
                <h3 >R$ 239,90</h3>
                <p>6x 39,90</p>
            </Price>
        </ItemBox>
        
    )
})

export default Item;

const Image = styled.img`
    width: 200px;
    height: 240px;
    margin-right: 20px;
    border-radius: 5px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);

    @media(max-width: 800px){
        width: 155px;
        height: 190px;
    }
`
const ProductName = styled.h2`
    font-size: 20px;
    font-weight: 700;
    @media(max-width: 800px){
        font-size: 18px;
    }
`
const ItemBox = styled.div`
    word-break: normal;

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
