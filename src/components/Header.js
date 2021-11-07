import styled from "styled-components"
import Logo from './Logo'
import {IoPersonOutline, IoCartOutline, IoHeartOutline, IoSearchOutline} from 'react-icons/io5'

const Header = () =>{
    return(
        <HeaderContainer>
            <Filters>
                <Logo size = {"4rem"} type = {'text'}/>
                <DropDownOption>Categorias</DropDownOption>
                <DropDownOption>Promoções</DropDownOption>
                <DropDownOption>Tendências</DropDownOption>
                <DropDownOption>Histórico</DropDownOption>
            </Filters>
            <Icons>
                <IoSearchOutline size = {30} onClick = {() => console.log("tô clicando")}/>
                <IoHeartOutline size = {30} onClick = {() => console.log("tô clicando")}/>
                <IoCartOutline size = {30} onClick = {() => console.log("tô clicando")}/>
                <IoPersonOutline size = {30} onClick = {() => console.log("tô clicando")}/>
            </Icons>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    font-family: 'Alice', serif;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 7rem;
    background-color: #fdddd3;
    box-shadow: 0px 1px 3px rgba(0, 0,0, 0.1);

    svg{
        cursor: pointer;
        margin-right: 2rem;
        transition: all .2s;
        color: #333;

        &:hover{
            transform: translateY(-2px) scale(1.2);
            color: #777;
        }
    }
`

const Icons = styled.div`
    display: flex;
    align-items: center;
`

const Filters = styled.div`
    display: flex;
    align-items: center;
`

const DropDownOption = styled.div`
    cursor: pointer;
    font-size: 1.2rem;
    margin-right: 3rem;
    color: #333;
    transition: all .2s;

    &:hover{
        transform: translateY(-2px) scale(1.05);
        color: #555;
        text-shadow: 4px 15px 6px rgba(0, 0, 0, 0.1);
    }
`


export default Header