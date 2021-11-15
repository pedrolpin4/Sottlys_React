import Home from "./pages/Home"
import GlobalStyles from "./styles/GlobalStyles"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserContext from "./context/UserContext"
import { useEffect, useState } from "react";
import Categories from "./pages/Categories"
import BasketContext from "./context/BasketContext";
import Checkout from "./pages/Checkout";
import HistoryPage from "./pages/HistoryPage";

export default function App() {
    const [userData, setUserData] = useState({});
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sidebar, setSidebar] = useState(false);
    
    useEffect(() => {
        const sottlysLogin = JSON.parse(localStorage.getItem("sottlysLogin"));
        if(sottlysLogin){
            setUserData(sottlysLogin);
        }
    }, []);

    return(

        <UserContext.Provider value={{userData,setUserData, categories, setCategories}}>
        <Router>
                <BasketContext.Provider value = {{products, setProducts}}>
                    <GlobalStyles />
                    <Routes>
                        <Route path = "/" exact element = {<Home sidebar = {sidebar} setSidebar = {setSidebar}/>} />
                        <Route path = "/checkout" exact element = {<Checkout />} />
                        <Route path = "/category/:id" exact element = {<Categories sidebar = {sidebar} setSidebar = {setSidebar}/>} />
                        <Route path = "/history" exact element = {<HistoryPage sidebar = {sidebar} setSidebar = {setSidebar}/>} />
                    </Routes>
                </BasketContext.Provider>
        </Router>
        </UserContext.Provider>
    )
}
