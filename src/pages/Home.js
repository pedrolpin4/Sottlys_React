import { useState } from "react";
import Header from "../components/Header"
import MainBody from "../components/MainBody"
import ProductModal from "../components/ProductModal"

export default function Home ({sidebar, setSidebar}) {
    const[showModal, setShowModal] = useState(false);
    const [content, setContent] = useState('');

    return(
        <>
            <Header sidebar = {sidebar} setSidebar = {setSidebar} content = {content} setContent = {setContent}/>
            <MainBody sidebar = {sidebar} setSidebar = {setSidebar} setShowModal = {setShowModal}/>
            <ProductModal showModal = {showModal} setShowModal = {setShowModal} setSidebar = {setSidebar} setContent = {setContent}/>
        </>
    )
}
