import { useState } from "react";
import Header from "../components/Header"
import MainBody from "../components/MainBody"
import ProductModal from "../components/ProductModal"

export default function Home ({sidebar, setSidebar}) {
    const[showModal, setShowModal] = useState(false);

    return(
        <>
            <Header sidebar = {sidebar} setSidebar = {setSidebar}/>
            <MainBody sidebar = {sidebar} setSidebar = {setSidebar} setShowModal = {setShowModal}/>
            <ProductModal showModal = {showModal} setShowModal = {setShowModal} />
        </>
    )
}
