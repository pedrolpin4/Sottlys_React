/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import getSearchs from "../service/search";
import { useNavigate } from "react-router";

export default function SearchContainer({setSidebar, searchContent, setShowModal}){
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [searchType, setSearchType] = useState('Categorias');
    const[message, setMessage] = useState("Comece sua pesquisa em Sott'lys");


    async function listSearchResults(){
        setMessage('');
        setSearchResults([])

        const newType = searchType === 'Produtos' ? 'produtos' :
         searchType === 'Categorias' ? 'categorias' : searchType === 'Promoções' ? 'promocoes' : 'tendencias';
        
        const result = await getSearchs(searchContent, newType);

        if(result?.data){
            setSearchResults(result.data)
            return;
        }

        setMessage(result.message)
    }
    useEffect(() => listSearchResults(), [searchContent, searchType])
    return(
        <div className = "search-container">
            <div className = "search-types">
                <div className = {searchType === "Categorias" ? "search-type selected" : "search-type"}
                     onClick = {() => setSearchType('Categorias')}
                >
                    Categorias
                </div>
                <div className = {searchType === "Tendências" ? "search-type selected" : "search-type"}
                     onClick = {() => setSearchType('Tendências')}
                >
                    Tendências
                </div>
                <div className = {searchType === "Promoções" ? "search-type selected" : "search-type"}
                    onClick = {() => setSearchType('Promoções')}
                >
                    Promoções
                </div>

            </div>
            <h1 className = "search-title">{searchType}</h1>
            {
                searchResults.length ?
                <div className = "links-container">
                    {
                        searchType === "Categorias" ?
                        searchResults.map(sr => <p className = "search-link" onClick = {() => {
                            navigate(`/category/${sr.id}`)
                            setSidebar(false)
                        }}>
                            {sr.name}
                        </p>) :
                        searchType === "Promoções" ?
                        searchResults.map(sr => <p className = "search-link" onClick = {() => {
                            navigate(`/sales/${sr.id}`)
                            setSidebar(false)
                        }}>
                            {sr.name}
                        </p>) :
                        searchResults.map(sr => (
                        <div className = "search-link" onClick = { () =>{
                            setSidebar(false)
                            navigate(`/category/${sr.id}`);
                        }}>
                            {sr.name}
                        </div>))
                    }
                </div> :
                <h2>{message}</h2>
            }
        </div>
    )
}