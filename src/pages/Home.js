import { useState } from "react";
import MainBody from "../components/MainBody"
import ProductModal from "../components/ProductModal"
import styled from "styled-components";
import MainHeader from "../components/MainHeader";

export default function Home ({sidebar, setSidebar}) {
    const [isVisible, setIsVisible] = useState(false);
    const[load, setLoad] = useState(0);
    const[showModal, setShowModal] = useState(false);
    const [content, setContent] = useState('login');

    return(
        <Body>
            <MainHeader sidebar = {sidebar} setSidebar = {setSidebar} content = {content} isVisible = {isVisible}
                setContent = {setContent} setShowModal = {setShowModal} setIsVisible = {setIsVisible} setLoad = {setLoad}/>
            <MainBody sidebar = {sidebar} setSidebar = {setSidebar} setShowModal = {setShowModal} 
                isVisible = {isVisible} setIsVisible = {setIsVisible} load = {load} setLoad = {setLoad}/>
            <ProductModal showModal = {showModal} setShowModal = {setShowModal} setSidebar = {setSidebar} setContent = {setContent}/>
        </Body>
    )
}

const Body = styled.div`
  height: auto;
  overflow-x: hidden;

`
