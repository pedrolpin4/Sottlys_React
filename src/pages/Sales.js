import { useState } from "react"
import Header from "../components/Header"
import BottomPage from "../components/BottomPage"
import SalesBody from "./SalesBody"
import ProductModal from "../components/ProductModal"
import styled from "styled-components"

export default function Sales ({sidebar, setSidebar}) {
    const[showModal, setShowModal] = useState(false);
    const [content, setContent] = useState('');


    return(
        <Body>
            <Header sidebar={sidebar} setSidebar={setSidebar} content = {content} setContent = {setContent} setShowModal = {setShowModal}/>
            <SalesBody sidebar = {sidebar} setSidebar = {setSidebar} setShowModal = {setShowModal}/>
            <BottomPage />
            <ProductModal showModal = {showModal} setShowModal = {setShowModal} setSidebar = {setSidebar} setContent = {setContent} />
        </Body>
    )
}

const Body = styled.div`
  height: auto;
  overflow-x: hidden;

`