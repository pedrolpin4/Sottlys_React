import Home from "./pages/Home"
import GlobalStyles from "./styles/GlobalStyles"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserContext from "./context/UserContext"
import { useEffect, useState } from "react";

export default function App() {
    const [userData, setUserData] = useState({});
    
    useEffect(() => {
        const sottlysLogin = JSON.parse(localStorage.getItem("sottlysLogin"));
        if(sottlysLogin){
            setUserData(sottlysLogin);
        }
    }, []);

    return(
        <UserContext.Provider value={{userData,setUserData}}>
        <Router>
                <GlobalStyles />
                <Routes>
                    <Route path = "/" exact element = {<Home />} />
                </Routes>
        </Router>
        </UserContext.Provider>
    )
}
