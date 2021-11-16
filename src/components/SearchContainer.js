import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BasketContext from "../context/BasketContext"

export default function SearchContainer({setSidebar, searchContent, setShowModal}){
    const [searchResults, setSearchResults] = useState([]);
    const [searchType, setSearchType] = useState('Produtos');
    const {
        setCurrentProduct
    } = useContext(BasketContext)

    useEffect(() => console.log("to buscando prr, calma aí"), [searchContent, searchType])
    return(
        <div className = "search-container">
            <div className = "search-types">
                <div className = {searchType === "Produtos" ? "search-type selected" : "search-type"}
                    onClick = {() => setSearchType('Produtos')}
                >
                    Produtos
                </div>
                <div className = {searchType === "Categorias" ? "search-type selected" : "search-type"}
                     onClick = {() => setSearchType('Categorias')}
                >
                    Categorias
                </div>
                <div className = {searchType === "Promoções" ? "search-type selected" : "search-type"}
                    onClick = {() => setSearchType('Promoções')}
                >
                    Promoções
                </div>

            </div>
            <h1 className = "search-title">{searchType}</h1>

            {
                searchType === "Categorias" ?
                searchResults.map(sr => <Link to = {`/category/${sr.id}`}>{sr.name}</Link>) :
                searchType === "Promoções" ?
                searchResults.map(sr => <Link to = {`/sales/${sr.id}`}>{sr.name}</Link>) :
                searchResults.map(sr => (
                <div onClick = { () =>{
                    setSidebar(false)
                    setCurrentProduct(sr.id)
                    setShowModal(true)
                }}>{sr.name}</div>))
            }
        </div>
    )
}