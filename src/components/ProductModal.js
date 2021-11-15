/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import {useCallback, useContext, useEffect, useRef} from 'react';
import BasketContext from "../context/BasketContext";
import { useState } from "react/cjs/react.development";

export default function ProductModal ({showModal, setShowModal }){
    const modalRef = useRef();
    const siteRef = useRef();
    const {
        currentProduct,
    } = useContext(BasketContext);

    const {
        name,
        images,
        description,
        installments,
        price,
        colors,
        sizes,
    } = currentProduct
    const [imgSrc, setImgSrc] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    
    function closeModal(e){
        if(modalRef.current === e.target){
            setShowModal(false)
        }
    }

    const modalKeyEvents = useCallback(e => {
        if(e.key === "Escape" && showModal === true){
            setShowModal(false)
        }
    }, [setShowModal, showModal])

    useEffect(()=> {
        if(currentProduct){
            setColor(colors[0].name)
            setSize(sizes[0].name)
            setImgSrc(images[0].name)
        }

        document.addEventListener("keydown", modalKeyEvents)   

        return () => document.removeEventListener('keydown', modalKeyEvents) 
    }, [modalKeyEvents])

    return(
        <>
            {   showModal 
                ?
                <>
                    <ModalBackground 
                        ref = {modalRef} 
                        onClick ={closeModal}    
                    >
                        <ModalContainer>
                            <TopSection>
                                <Xbutton onClick = {() => setShowModal(false)}>
                                    X
                                </Xbutton>
                            </TopSection>
                            <ModalBody ref = {siteRef}>
                                    <LittleImgContainer>
                                        {
                                            images.map((img,i) => (
                                                <LittleImg src = {img.name} alt = "" key = {i} onMouseOver = {() => setImgSrc(img.name)}/>
                                            ))
                                        }
                                    </LittleImgContainer>
                                    <BigImg src = {imgSrc || images[0].name} alt =""/>
                                    <ProductsInfoContainer>
                                        <ProductName>{name}</ProductName>
                                        <ProductDescription>
                                            {description}
                                        </ProductDescription>
                                        <ProductNumbers>
                                            <p>R$ {Number(price).toFixed(2).replace(".", ",")}</p>
                                            <p>{installments}x R$ {(Number(price)/(installments)).toFixed(2).replace(".", ",")}</p>
                                        </ProductNumbers>                                    
                                        <ColorName>Cor: {color || colors[0].name}</ColorName>
                                        <ColorContainer>
                                            {
                                                colors.map(c => (
                                                    color === c.name ? 
                                                    <ColorDiv hex = {c.hexadecimal} key = {c.id} onClick = {() => setColor(c.name)} selected = {true}></ColorDiv> : 
                                                    <ColorDiv hex = {c.hexadecimal} key = {c.id} onClick = {() => setColor(c.name)} selected = {false}></ColorDiv>
                                                ))
                                            }
                                        </ColorContainer>
                                        <SizeName>Tamanho: {size || sizes[0].name}</SizeName>
                                        <ColorContainer>
                                            {
                                                sizes.map(s => (
                                                        size === s.name ?
                                                        <SizeDiv key = {s.id} onClick = {() => setSize(s.name)} selected = {true}>{s.name}</SizeDiv> : 
                                                        <SizeDiv key = {s.id} onClick = {() => setSize(s.name)} selected = {false}>{s.name}</SizeDiv>
                                                ))
                                            }
                                        </ColorContainer>
                                        <ButtonBlack onClick = {() => setShowModal(true)}>
                                            Adicionar ao carrinho
                                        </ButtonBlack>                                       
                                    </ProductsInfoContainer>
                            </ModalBody>
                        </ModalContainer>
                    </ModalBackground>      
                </>
                :
                <></>
            }
        </>
    )
}

const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0, 0.6);
    z-index: 120;
`

const ModalContainer = styled.div`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    position: fixed;
    width: 90vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    top: 5vh;
    left: 5vw;
    background: #fff;
    opacity: 1;
    z-index: 130;
    padding: 15px 20px 21px 20px;
`

const LittleImgContainer = styled.div`
    width: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 5px;
`

const LittleImg = styled.img`
    width: 50%;
`

const BigImg = styled.img`
    width: 40%;
    margin-right: 5%;
`

const ProductsInfoContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const TopSection = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
`

const ProductName = styled.h1`
    font-size: 24px;
    text-transform: capitalize;
    margin-bottom: 20px;
`

const ModalBody = styled.div`
    display: flex;
    height: calc(90vh - 80px);
`

const Xbutton = styled.p`
    font-size: 20px;
    color: #333333;
    cursor: pointer;
`

const ProductNumbers = styled.div`
    display: flex;

    p{
        font-size: 15px;
        color: #777;
        margin: 10px 7px;
    }

    margin-bottom: 30px;
`

const ColorName = styled.h2`
    font-size: 16px;
    margin-bottom: 15px;
`

const ColorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const ColorDiv = styled.div`
    cursor: pointer;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: ${props => props.hex};
    border: 2px solid ${props => props.selected ? '#000' : '#ddd'};
    margin: 0px 10px 20px 10px;
`

const SizeName = styled.h2`
    font-size: 16px;
    margin-bottom: 15px;
`

const SizeDiv = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: 0px 10px 20px 10px;
    background-color: ${props => props.selected ? '#000' : '#fff'};
    color: ${props => props.selected ? '#fff' : '#000'};;
    border: 1px solid #777;
`

const ButtonBlack = styled.div`
    cursor: pointer;
    width: 80%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: rgb(0,0,0);
    font-size: 18px;
    border-radius: 3px;
    margin-top: 15px;
`

const ProductDescription = styled.p`
    width: 100%;
    text-align: center;
    overflow-wrap: break-word;
    margin-bottom: 20px;
    color: #777;
`