import Header from "../components/Header"
import MainBody from "../components/MainBody"

export default function Home ({sidebar, setSidebar}) {
    return(
        <>
            <Header sidebar = {sidebar} setSidebar = {setSidebar}/>
            <MainBody sidebar = {sidebar} setSidebar = {setSidebar}/>
        </>
    )
}
