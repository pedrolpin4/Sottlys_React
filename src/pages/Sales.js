import Header from "../components/Header"
import BottomPage from "../components/BottomPage"
import SalesBody from "./SalesBody"

export default function Sales ({sidebar, setSidebar}) {

    return(
        <>
            <Header sidebar={sidebar} setSidebar={setSidebar}/>
            <SalesBody />
            <BottomPage />
        </>
    )
}