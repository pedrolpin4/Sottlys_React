import { useContext, useState } from "react"
import Header from "../components/Header"
import UserContext from "../context/UserContext"
import CategoryBody from "./CategoryBody"
import ProductModal from "../components/ProductModal"
import styled from "styled-components"

export default function Categories ({sidebar, setSidebar}) {
    const { categories } = useContext(UserContext);
    const[showModal, setShowModal] = useState(false);
    const [content, setContent] = useState('login');


    return(
        <Body>
            <Header sidebar = {sidebar} setSidebar = {setSidebar} content = {content} setContent = {setContent} setShowModal = {setShowModal}/>
            <CategoryBody sidebar = {sidebar} setSidebar = {setSidebar} setShowModal = {setShowModal} categories = {categories}/>
            <ProductModal showModal = {showModal} setShowModal = {setShowModal} setSidebar = {setSidebar} setContent = {setContent} />
        </Body>
    )
}

const Body = styled.div`
  min-height: auto;
  overflow-x: hidden;

`
