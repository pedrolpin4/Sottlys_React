import styled from "styled-components"
import { useNavigate } from "react-router";

export default function Logo ({isVisible = true}) {
    const navigate = useNavigate();
    return(
        <>
            <LogoText src = {isVisible ? "../assets/textLogo.png" : "../assets/white.png"} onClick={()=> navigate("/")}/>
            <LogoImg src = "../assets/Girassol.png" onClick={()=> navigate("/")}/>
        </>

    )
}

const LogoText = styled.img`
    position: absolute;
    top: 50%;
    left: 0;
    display: initial;
    cursor: pointer;
    height: 50%;
    transform: translateY(-50%);

    @media (max-width: 1000px){
        display: none;
    }
`

const LogoImg = styled.img`
    opacity: 0;
    cursor: pointer;
    height: 55%;
    margin-right: 10vw;

    @media (max-width: 1000px){
        opacity: 1;
        margin-right: 7vw;
        margin-left: 5px;
    }

    @media (max-width: 600px){
        margin-right: 4vw !important;
    }
`