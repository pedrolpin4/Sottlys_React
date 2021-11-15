import styled from "styled-components";
import Item from "./Item";
import { useEffect, useState } from "react";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import React, { useRef } from "react";
import { getProductsByCategory } from "../service/reqMainPage";
import { Link } from "react-router-dom";

export default function Category({name, id, sidebar, setSidebar}){
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
            const justSomeProducts = result.data.filter((r,i)=> i<16);
            setProducts(justSomeProducts);
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
                {products.map((prod)=>  <Item key={prod.id} prod={prod} sidebar = {sidebar} setSidebar = {setSidebar}/>)}
                <Link to={`/category/${id}`}>
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
        font-family: 'Alice';
        font-weight: 700;
        font-size: 30px;
        color: 000000;
        margin-bottom: 15px;
        text-transform: capitalize;
    }
    @media(max-width: 800px){
        h1{
            font-family: 'Alice';
            font-size: 28px;
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
    z-index: 1;
    
    @media(max-width:800px){
        display:none
    }
`
const IconBox = styled.div`
    position: absolute;
    right: 4px;
    top: 43%;
    z-index: 1;

    @media(max-width:800px){
        display:none
    }
`
const More = styled.div`
    width: 100px;
    height: 240px;
    margin-left: 15px;
    display: flex;
    text-align: center;
    align-items: flex-start;
    
    p{
        font-size: 18px;
        word-break: normal;
        font-weight: bold;
    }
    p:hover{
        text-decoration: underline;
        color: gray;
        cursor: pointer;
    }


`