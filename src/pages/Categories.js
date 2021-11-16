import { useContext, useState } from "react"
import Header from "../components/Header"
import UserContext from "../context/UserContext"
import CategoryBody from "./CategoryBody"
import BottomPage from "../components/BottomPage"
import ProductModal from "../components/ProductModal"

export default function Categories ({sidebar, setSidebar}) {
    const { categories } = useContext(UserContext);
    const[showModal, setShowModal] = useState(false);
    const [content, setContent] = useState('');


    return(
        <>
            <Header sidebar = {sidebar} setSidebar = {setSidebar} content = {content} setContent = {setContent} setShowModal = {setShowModal}/>
            <CategoryBody sidebar = {sidebar} setSidebar = {setSidebar} setShowModal = {setShowModal}/>
            <BottomPage categories={categories}/>
            <ProductModal showModal = {showModal} setShowModal = {setShowModal} setSidebar = {setSidebar} setContent = {setContent} />
        </>
    )
}
