import { useState } from "react";
import Header from "../components/Header"
import MainBody from "../components/MainBody"
import ProductModal from "../components/ProductModal"
import styled from "styled-components";

export default function Home ({sidebar, setSidebar}) {
    const[showModal, setShowModal] = useState(false);
    const [content, setContent] = useState('');

    return(
        <Body>
            <Header sidebar = {sidebar} setSidebar = {setSidebar} content = {content} setContent = {setContent} setShowModal = {setShowModal}/>
            <MainBody sidebar = {sidebar} setSidebar = {setSidebar} setShowModal = {setShowModal}/>
            <ProductModal showModal = {showModal} setShowModal = {setShowModal} setSidebar = {setSidebar} setContent = {setContent}/>
        </Body>
    )
}

const Body = styled.div`
  height: auto;
  overflow-x: hidden;

`
