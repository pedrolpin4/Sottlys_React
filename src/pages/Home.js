import { useState } from "react";
import Header from "../components/Header"
import MainBody from "../components/MainBody"

export default function Home () {
    const [sidebar, setSidebar] = useState(false);

    return(
        <>
            <Header sidebar = {sidebar} setSidebar = {setSidebar}/>
            <MainBody sidebar = {sidebar} setSidebar = {setSidebar}/>
        </>
    )
}
