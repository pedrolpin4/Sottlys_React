import Category from "../components/Category"
import BottomPage from "./BottomPage"
import styled from "styled-components"

export default function MainBody (){
    return(
        <ContainerCategories>
            <Category />
            <Category />
            <Category />
            <BottomPage />
        </ContainerCategories>
    )
}


const ContainerCategories = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 114px;
    width: 100%;
    font-family: 'Open Sans';
`