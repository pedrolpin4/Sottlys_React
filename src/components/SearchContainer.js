import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchContainer({setSidebar, searchContent}){
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => console.log(), [searchContent])
    return(
        <div className = "search-container">
            <h1 className = "search-title">Title</h1>
            {
                searchResults.map(sr => <Link to = {`/category/${sr.id}`}>{sr.name}</Link>)
            }
        </div>
    )
}