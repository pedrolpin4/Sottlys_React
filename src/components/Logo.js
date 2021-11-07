import styled from "styled-components"

const Logo = ({type, size}) => (
    <LogoImg size = {size} src = {type === 'text' ? "../assets/textLogo.jpeg" :"../assets/Girassol.png"}/>
)

const LogoImg = styled.img`
    cursor: pointer;
    height: ${props => props.size ? props.size : "8rem"};
    margin-right: 60px;
`

export default Logo