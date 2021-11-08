import Home from "./pages/Home"
import GlobalStyles from "./styles/GlobalStyles"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export default function App () {
    return(
        <Router>
            <GlobalStyles />
            <Routes>
                <Route path = "/" exact element = {<Home />} />
            </Routes>
        </Router>
    )
}
