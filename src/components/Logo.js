import styled from "styled-components"

export default function Logo () {
    return(
        <>
            <LogoText src = "../assets/textLogo.png"/>
            <LogoImg src = "../assets/Girassol.png"/>
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
    height: 100%;
    margin-right: 10vw;

    @media (max-width: 1000px){
        opacity: 1;
        margin-right: 7vw;
    }

    @media (max-width: 600px){
        margin-right: 4vw !important;
    }
`