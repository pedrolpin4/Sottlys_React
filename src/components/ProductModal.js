/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import BasketContext from "../context/BasketContext";
import UserContext from "../context/UserContext";
import { postBasket } from "../service/postBasket";

export default function ProductModal ({showModal, setShowModal, setSidebar, setContent }){
    const modalRef = useRef();
    const siteRef = useRef();
    let newPrice = false;
    const {
        currentProduct,
    } = useContext(BasketContext);

    const {
        userData,
        productsSales,
    } = useContext(UserContext)

    const {
        name,
        images,
        description,
        installments,
        price,
        colors,
        sizes,
        id
    } = currentProduct;

    const [imgSrc, setImgSrc] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');

    const newArray = productsSales.filter((e)=> id === e.product_id);
    
    if(newArray.length !== 0){
        newPrice = newArray[0].new_price;
    }

    
    function closeModal(e){
        if(modalRef.current === e.target){
            setShowModal(false)
        }
    }

    async function addToBasket(){
        const chosenColor = colors.filter(col => col.name === color);
        const chosenSize = sizes.filter(s => s.name === size);

        if(!JSON.parse(localStorage.getItem('sottlysLogin')).user){
            setShowModal(false);
            setContent('login')
            setSidebar(true);
            return;
        }

        let body = {
            colorId: chosenColor[0].id,
            sizeId: chosenSize[0].id,
            userId: userData.user.id, 
            productId: id,
        }

        await postBasket(userData.token, body); 
        setShowModal(false);
    }

    const modalKeyEvents = useCallback(e => {
        if(e.key === "Escape" && showModal === true){
            setShowModal(false)
        }
    }, [setShowModal, showModal])

    useEffect(()=> {
        if(colors){
            setColor(colors[0].name)
        }
        if(sizes){
            setSize(sizes[0].name)
        }
        if(images){
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
                                                <LittleImg src = {img.name} alt = "" key = {i} onMouseOver = {() => setImgSrc(img.name)} onClick = {() => setImgSrc(img.name)}/>
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
                                            <div>
                                                <p className = {newPrice ? 'slashed' : ''}>R$ {Number(price).toFixed(2).replace(".", ",")}</p>
                                                <h2>{newPrice ? 'R$ ' + Number(newPrice).toFixed(2).replace(".", ",") : ""}</h2>
                                            </div>
                                            <p>{installments}x R$ {newPrice ? 'R$ ' + (Number(newPrice)/installments).toFixed(2).replace(".", ",") : (Number(price)/(installments)).toFixed(2).replace(".", ",")}</p>
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
                                        <ButtonBlack onClick = {() => {
                                            addToBasket();
                                        }}>
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
    overflow-x: hidden;
    top: 5vh;
    left: 5vw;
    background: #fff;
    opacity: 1;
    z-index: 130;
    padding: 15px 20px 21px 20px;

    @media(max-width: 1000px){
        width: 95vw;
        height: 95vh;
        top: 2.5vh;
        left: 2.5vw;
    }
`

const LittleImgContainer = styled.div`
    width: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 5px;

    @media(max-width: 850px){
        width: 60%;
        height: 10vh;
        justify-content: flex-start;
        align-self: center;
        flex-direction: row;
        margin-right: 0px;
    }

    @media(max-width: 600px){
        width: 70%;
        height: 10vh;
        justify-content: flex-start;
        align-self: center;
        flex-direction: row;
        margin-right: 0px;
    }

`

const LittleImg = styled.img`
    width: 50%;
    margin-bottom: 15px;

    @media(max-width: 850px){
        width: 12%;
        height: 100%;
        flex-direction: row;
        margin-right: 15px;
    }
`

const BigImg = styled.img`
    width: 40%;
    margin-right: 5%;
    @media(max-width: 850px){
        width: 60%;
        align-self: center;
        margin-right: 0px;
        margin-bottom: 40px;
    }

    @media(max-width: 600px){
        width: 70%;
    }

`

const ProductsInfoContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-self: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media(max-width: 850px){
        width: 70%;
    }
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

    @media(max-width: 850px){
        overflow-y: scroll;
        flex-direction: column;
    }
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

    .slashed{
        text-decoration: line-through;
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