import styled from "styled-components"
import { useNavigate } from 'react-router-dom'

export default function CheckoutHeader () {
    const navigate = useNavigate();

    return(
        <HeaderContainer>
          <LogoCheckout src = "../assets/textLogo.png" onClick = {() => navigate("/")}/>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5rem;
    background-color: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0,0, 0.1);
    z-index: 2;
    @media (max-width: 850px){
        height: 4rem;
    }
`

const LogoCheckout = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    display: initial;
    height: 5rem;
    cursor: pointer;
    transform: translate(-50%, -50%);

    @media (max-width: 850px){
        height: 4rem;
    }
`