import styled from "styled-components";
import Item from "./Item";
import { useEffect, useState } from "react";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import React, { useRef } from "react";
import { getProductsByCategory } from "../service/reqMainPage";
import { Link } from "react-router-dom";

export default function Category({name, id}){
    const [products, setProducts] = useState([]);
    const [erro, setErro] = useState("");
    const right = useRef()
    const left = useRef()

    function seeMore(direction){
        if(direction === "left"){
             left.current.scrollIntoView({
            behavior: 'smooth', 
            inline: "end",
            block:"nearest"
        })
        }
        if(direction === "right"){
            right.current.scrollIntoView({
                behavior: 'smooth', 
                inline: "end",
                block:"nearest"
            })
       }
    }

    async function listProductsByCategory(){
        const result = await getProductsByCategory(id);

        if(result?.data){
            setProducts(result?.data);
            return;
        }

        if(result?.data.length === 0){
            setErro("sem itens");
            return;
        }
    }

    useEffect(() => {
        listProductsByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <BoxCategory>
            <h1>{name}</h1>
            <IconBox1 onClick={()=>seeMore("left")}>
                <IoIosArrowDropleftCircle 
                 fontSize="34px" 
                 color="lightgray"
                 />
            </IconBox1>
            <ItensContainer >
                <p ref={left}>{erro}</p>
                {products.map((prod)=>  <Item key={prod.id} prod={prod}/>)}
                <Link to="/">
                    <More ref={right}>
                            <p>Veja Mais</p>
                    </More> 
                </Link>
                       
            </ItensContainer>
            <IconBox onClick={()=>seeMore("right")}>
                <IoIosArrowDroprightCircle 
                 fontSize="34px" 
                 color="lightgray"
                 />
            </IconBox>
        </BoxCategory>
    )
}

const BoxCategory = styled.div`
    margin-top: 40px;
    width: 95%;
    height: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    position: relative;

    h1{
        font-weight: 700;
        font-size: 24px;
        color: 000000;
        margin-bottom: 10px;
    }
    @media(max-width: 800px){
        h1{
            font-size: 22px;
        }
    }
`
const ItensContainer = styled.div`
    display: flex;
    align-items: center;
    overflow-x: hidden;
    height: auto;
    overflow-y: hidden;

    @media(max-width:800px){
        overflow-x: scroll;
    }

`

const IconBox1 = styled.div`
    position: absolute;
    left: 4px;
    top: 43%;
    z-index: 3;
    
    @media(max-width:800px){
        display:none
    }
`
const IconBox = styled.div`
    position: absolute;
    right: 4px;
    top: 43%;
    z-index: 3;

    @media(max-width:800px){
        display:none
    }
`
const More = styled.div`
    width: 100px;
    height: 240px;
    display: flex;
    align-items: end;
    
    p{
        font-size: 20px;
        word-break: normal;
        font-weight: bold;
    }
    p:hover{
        text-decoration: underline;
        color: gray;
        cursor: pointer;
    }


`