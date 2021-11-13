import Home from "./pages/Home"
import GlobalStyles from "./styles/GlobalStyles"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserContext from "./context/UserContext"
import { useEffect, useState } from "react";
import BasketContext from "./context/BasketContext";

export default function App() {
    const [userData, setUserData] = useState({});
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const sottlysLogin = JSON.parse(localStorage.getItem("sottlysLogin"));
        if(sottlysLogin){
            setUserData(sottlysLogin);
        }
    }, []);

    return(
        <UserContext.Provider value={{userData,setUserData}}>
        <Router>
                <BasketContext.Provider value = {{products, setProducts}}>
                    <GlobalStyles />
                    <Routes>
                        <Route path = "/" exact element = {<Home />} />
                    </Routes>
                </BasketContext.Provider>
        </Router>
        </UserContext.Provider>
    )
}
