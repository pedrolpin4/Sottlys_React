import { useContext } from "react"
import Header from "../components/Header"
import UserContext from "../context/UserContext"
import CategoryBody from "./CategoryBody"
import BottomPage from "../components/BottomPage"

export default function Categories () {
    const { categories } = useContext(UserContext)

    return(
        <>
            <Header />
            <CategoryBody />
            <BottomPage categories={categories}/>
        </>
    )
}
