import Category from "../components/Category"
import BottomPage from "./BottomPage"
import styled from "styled-components"
import { useEffect, useState } from "react";
import { getMainCategories } from "../service/reqMainPage";

export default function MainBody (){
     const [categories, setCategories] = useState([])
     const [erro, setErro] = useState("");

     async function listMainCategories(){
         const result = await getMainCategories();

        if(result?.data){
            setCategories(result?.data);
            return;
        }

        if(!result?.success){
            setErro(result?.message);
            return;
        }
     }

    useEffect(() => {
        listMainCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <ContainerCategories>
            <p>{erro}</p>
            {categories.map((cat)=> <Category key={cat.id} name={cat.name} id={cat.id}/>)}
            <BottomPage categories={categories}/>
        </ContainerCategories>
    )
}


const ContainerCategories = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 114px;
    width: 100vw;
    font-family: 'Open Sans';
`