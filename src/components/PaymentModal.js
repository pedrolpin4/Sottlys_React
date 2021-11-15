import styled from "styled-components";
import {useCallback, useEffect, useRef} from 'react';
import { useContext, useState } from "react/cjs/react.development";
import { useNavigate } from "react-router";
import { postPayment } from "../service/postPayment";
import UserContext from '../context/UserContext'

function PaymentModal ({showModal, setShowModal, total, entrega}){
    const modalRef = useRef();
    const characters = ['A' ,'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
     'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const [installment, setInstallment] = useState(6);
    const [payed, setPayed] = useState(false)
    const siteRef = useRef();
    const [payment, setPayment] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const { userData } = useContext(UserContext)
    
    function closeModal(e){
        if(modalRef.current === e.target){
            setShowModal(false)
        }
    }

    async function handlePayment(){
        const result = await postPayment(userData.token, {
            installments: installment,
            paymentMethod: payment ? 'CARTÃO DE CRÉDITO' : 'PIX',
            deliveryFee: entrega,
        })

        if(result.success){
            setPayed(true)
            return;
        }

        setMessage(result.message)
    }

    const modalKeyEvents = useCallback(e => {
        if(e.key === "Escape" && showModal === true){
            setShowModal(false)
        }
    }, [setShowModal, showModal])

    useEffect(()=> {
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
                            <LinkScreen ref = {siteRef}>
                                <PaymentContent>
                                    {payed ?
                                    <>
                                        <h1 className = "green">
                                            Pagamento Feito com sucesso!!!
                                        </h1> 
                                        <ButtonWhite onClick = {() => navigate("/")}>
                                            Continuar Comprando
                                        </ButtonWhite>
                                    </>
                                    : message ? 
                                    <>
                                        <h1 className = "red">
                                            {message}
                                        </h1> 
                                        <ButtonWhite onClick = {() => navigate("/")}>
                                            Voltar para Home
                                        </ButtonWhite>
                                    </>
                                    :
                                    <>
                                        <h1>Método de Pagamento</h1>
                                        <PaymentSelection>
                                            <DeliveryOptions onClick = {() =>{
                                                setPayment(false)
                                            }} payment = {payment}>
                                                <p>
                                                    PIX
                                                </p>
                                                <p>
                                                    1x R$ {total.toFixed(2).replace(".", ",")}
                                                </p>
                                            </DeliveryOptions>
                                            <DeliveryOptions1 onClick = {() =>{
                                                setPayment(true)
                                            }} payment = {payment}>
                                                <p>
                                                    Cartão de Crédito
                                                </p>
                                                <p>
                                                    {installment}x R$ {(total/installment).toFixed(2).replace(".", ",")}
                                                </p>
                                            </DeliveryOptions1>
                                            {
                                                payment ?
                                                (
                                                    <ContainerInstallments>
                                                        <Installment1 onClick = {() => setInstallment(1)} installment = {installment}>
                                                            1x
                                                        </Installment1>
                                                        <Installment2 onClick = {() => setInstallment(2)} installment = {installment}>
                                                            2x
                                                        </Installment2>
                                                        <Installment3 onClick = {() => setInstallment(3)} installment = {installment}>
                                                            3x
                                                        </Installment3>
                                                        <Installment4 onClick = {() => setInstallment(4)} installment = {installment}>
                                                            4x
                                                        </Installment4>
                                                        <Installment5 onClick = {() => setInstallment(5)} installment = {installment}>
                                                            5x
                                                        </Installment5>
                                                        <Installment6 onClick = {() => setInstallment(6)} installment = {installment}>
                                                            6x
                                                        </Installment6>
                                                    </ContainerInstallments>
                                                ) : 
                                                <Pix>
                                                    <p>PIX Copia e Cola:</p>
                                                    <PixCode>
                                                        <div>
                                                            {characters.map( c => <span>{characters[Math.round(Math.random()*36)]}</span>)}
                                                            <span>SOTTLYS.INC-CNPJ0303600101265</span>
                                                        </div>
                                                    </PixCode>
                                                </Pix>
                                            }
                                        </PaymentSelection>
                                        <ButtonConfirm onClick = {() => handlePayment()}>
                                            Confirmar Pagamento
                                        </ButtonConfirm>
                                    </>
                                }
                                </PaymentContent>
                            </LinkScreen>
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
    position: fixed;
    width: 700px;
    height: 60vh;
    display: flex;
    flex-direction: column;
    top: 20vh;
    left: calc((100vw - 700px)/2);
    background: #fff;
    opacity: 1;
    z-index: 130;
    padding: 15px 20px 21px 20px;
    border-radius: 20px;

    @media(max-width: 1000px){
        width: 580px;
        left: calc((100% - 580px)/2);
    }

    @media(max-width: 600px){
        width: 100vw;
        left: 0px;
    }

    @media(max-height: 700px){
        top: 15vh;
        height: 70vh;
    }

    @media(max-height: 500px){
        top: 10vh;
        height: 80vh;
    }

    @media(max-width: 350px){
        top: 3vh;
        height: 94vh;
    }
`

const TopSection = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
`

const LinkScreen = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`

const Xbutton = styled.p`
    font-size: 20px;
    color: #333;
    cursor: pointer;
`

const PaymentContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;

    .green{
        color: rgb(76, 155, 61);
        margin-top: 70px;
    }

    .red{
        color: rgb(155, 42, 61);
        margin-top: 70px;
    }

    h1{
        font-size: 24px;
        color: #333;
    }
`

const PaymentSelection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const DeliveryOptions = styled.div`
    cursor: pointer;
    width: 90%;
    padding: 10px 5px;
    height: 40px;
    border-radius: 5px;
    margin-top: 40px;
    display: flex;
    border: ${props => props.payment ? "solid 1px #ddd" : "1px solid rgb(76, 155, 61)"};
    align-items: center;
    justify-content: space-between;
`

const DeliveryOptions1 = styled.div`
    cursor: pointer;
    width: 90%;
    padding: 10px 5px;
    height: 40px;
    border-radius: 5px;
    margin-top: 7px;
    display: flex;
    border:${props => props.payment ? "1px solid rgb(76, 155, 61)" : "solid 1px #ddd" };;
    align-items: center;
    justify-content: space-between;
`

const ButtonConfirm = styled.div`
    position: absolute;
    border-radius: 5px;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    text-transform: uppercase;
    width: 70%;
    height: 50px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: rgb(76, 155, 61);
    margin-top: 1vh;
    font-size: 14px;
    letter-spacing: 1.2px;
`

const ContainerInstallments = styled.div`
    display: flex;
    justify-content: center;
    width: 80%;
    margin-top: 30px;

    div{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 7px;
        height: 35px;
        width: 35px;
        border-radius: 50%;
        color: black;
        background-color: white;
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 700;
        transition: all .2s;
    }

    p{
        cursor: pointer;
        font-size: 12px;
        font-weight: 400;
    }

    @media(max-width: 600px){
        margin-top: 70px;
    }
`
const Installment1 = styled.div`
    border: ${props => props.installment === 1 ? "1px solid rgb(76, 155, 61)" : "1px solid #ddd"};
`

const Installment2 = styled.div`
    border: ${props => props.installment === 2 ? "1px solid rgb(76, 155, 61)" : "1px solid #ddd"};
`
const Installment3 = styled.div`
    border: ${props => props.installment === 3 ? "1px solid rgb(76, 155, 61)" : "1px solid #ddd"};
`
const Installment4 = styled.div`
    border: ${props => props.installment === 4 ? "1px solid rgb(76, 155, 61)" : "1px solid #ddd"};
`
const Installment5 = styled.div`
    border: ${props => props.installment === 5 ? "1px solid rgb(76, 155, 61)" : "1px solid #ddd"};
`
const Installment6 = styled.div`
    border: ${props => props.installment === 6 ? "1px solid rgb(76, 155, 61)" : "1px solid #ddd"};
`

const Pix = styled.div`
    margin-top: 30px;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const PixCode = styled.div`
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    display: flex;
    width: 60%;
    flex-wrap: wrap;
    overflow-wrap: break-word;

    div{
        display: flex;
        flex-wrap: wrap;
    }
`

const ButtonWhite = styled.div`
    cursor: pointer;
    text-transform: uppercase;
    width: 80%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    background-color: #fff;
    border: 1px solid #333;
    margin-top: 70px;
    font-size: 14px;
    letter-spacing: 1.2px;
    font-weight: 600;
`



export default PaymentModal