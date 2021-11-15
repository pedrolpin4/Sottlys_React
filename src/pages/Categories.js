import { useContext } from "react"
import Header from "../components/Header"
import UserContext from "../context/UserContext"
import CategoryBody from "./CategoryBody"
import BottomPage from "../components/BottomPage"

export default function Categories ({sidebar, setSidebar}) {
    const { categories } = useContext(UserContext)

    return(
        <>
            <Header sidebar = {sidebar} setSidebar = {setSidebar}/>
            <CategoryBody />
            <BottomPage categories={categories}/>
        </>
    )
}
