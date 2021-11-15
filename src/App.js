import Home from "./pages/Home"
import GlobalStyles from "./styles/GlobalStyles"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserContext from "./context/UserContext"
import { useEffect, useState } from "react";
import Categories from "./pages/Categories"

export default function App() {
    const [userData, setUserData] = useState({});
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        const sottlysLogin = JSON.parse(localStorage.getItem("sottlysLogin"));
        if(sottlysLogin){
            setUserData(sottlysLogin);
        }
    }, []);

    return(
        <UserContext.Provider value={{userData,setUserData, categories, setCategories}}>
            <Router>
                <GlobalStyles />
                <Routes>
                    <Route path = "/" exact element = {<Home />} />
                    <Route path = "/category/:id" exact element = {<Categories />} />
                </Routes>
            </Router>
        </UserContext.Provider>
    )
}
