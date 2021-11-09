import styled from "styled-components"
import Item from "./Item"
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import React, { useRef } from "react"

export default function Category(){
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
                inline: "start",
                block:"nearest"
            })
       }
    }

    return (
        <BoxCategory>
            <h1>Categoria</h1>
            <IconBox1 onClick={()=>seeMore("left")}>
                    <IoIosArrowDropleftCircle 
                 fontSize="34px" 
                 color="lightgray"
                 />
                </IconBox1>
            <ItensContainer >
                    <Item ref={left}/>
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <More ref={right}>
                        <a href="/">Veja Mais</a>
                    </More>        
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

`

const IconBox1 = styled.div`
    position: absolute;
    left: 4px;
    top: 43%;

`
const IconBox = styled.div`
    position: absolute;
    right: 4px;
    top: 43%;

`
const More = styled.div`
    width: 100px;
    height: 240px;
    display: flex;
    align-items: end;
    
    a{
        font-size: 20px;
        word-break: normal;
        font-weight: bold;
    }
    a:hover{
        text-decoration: underline;
        color: gray;
        cursor: pointer;
    }


`