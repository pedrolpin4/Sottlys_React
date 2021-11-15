import { useContext } from "react"
import Header from "../components/Header"
import UserContext from "../context/UserContext"
import BottomPage from "../components/BottomPage"
import SalesBody from "./SalesBody"

export default function Categories () {
    const { categories } = useContext(UserContext)

    return(
        <>
            <Header />
            <SalesBody />
            <BottomPage categories={categories}/>
        </>
    )
}