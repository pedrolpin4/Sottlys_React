import { useContext } from "react"
import Header from "../components/Header"
import UserContext from "../context/UserContext"
import BottomPage from "../components/BottomPage"
import SalesBody from "./SalesBody"

export default function Sales ({sidebar, setSidebar}) {
    const { categories } = useContext(UserContext)

    return(
        <>
            <Header sidebar={sidebar} setSidebar={setSidebar}/>
            <SalesBody />
            <BottomPage categories={categories}/>
        </>
    )
}