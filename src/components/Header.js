import styled from "styled-components";
import Logo from './Logo';
import {IoPersonOutline, IoCartOutline, IoHeartOutline, IoSearchOutline, IoMenuOutline} from 'react-icons/io5';
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getFilters } from "../service/filters";
import Sidebar from "./SideBar";
import { getBasket } from "../service/basket";
import UserContext from "../context/UserContext";
import BasketContext from "../context/BasketContext";

export default function Header ({sidebar, setSidebar}) {
    const [trends, setTrends] = useState([]);
    const [sales, setSales] = useState([]);
    const [filters, setFilters] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [content, setContent] = useState('');
    const { setCategories, categories} = useContext(UserContext);
    const { userData } = useContext(UserContext);
    const {setProducts} = useContext(BasketContext);


    async function listCategories(){
        const result = await getFilters('categories');

        if(result?.data){
            setCategories(result?.data);
            return;
        }

        if(!result?.success){
            setErrorMessage(result?.message);
            return;
        }
    }

    async function listTrends(){
        const result = await getFilters('trends');

        if(result?.data){
            setTrends(result.data);
            return;
        }

        if(!result?.success){
            return result?.message;
        }
    }

    async function listSales(){
        const result = await getFilters('sales');

        if(result?.data){
            setSales(result.data);
            return;
        }

        if(!result?.success){
            return result.message;
        }
    }

    async function listBasket () {
        setProducts([])
        const result = await getBasket(userData.token)
        if(result.data) {
            setProducts(result.data);
            return;
        }
    }


    useEffect(() => {
        listCategories();
        listTrends();
        listSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <HeaderContainer>
            <Logo />
            <Unifier>
                <Filters categories = {categories}>
                    <DropDownOption onMouseOver = {() => {
                            setFilters([...categories]);
                        }
                    }>
                        <p>
                            Categorias
                        </p>
                    </DropDownOption>
                    <DropDownOption onMouseOver = {() => {
                            setFilters([...sales]);
                        }
                    }>
                        <p>
                            Promoções
                        </p>
                    </DropDownOption>
                    <DropDownOption className = "desktop-view" onMouseOver = {() => {
                            setFilters([...trends]);
                        }
                    }>
                        <p>
                            Tendências
                        </p>
                    </DropDownOption>
                    <div className="sub-menu">
                            {
                                filters.length ? 
                                    filters[0] === categories[0] ?
                                        filters.map(e => {
                                            return(
                                                <Link to = {`/categories/${e.id}`} key = {'c' + e.id}>
                                                    {e.name}
                                                </Link>
                                            )
                                        }) :
                                        filters[0] === trends[0] ?
                                            filters.map(e => {
                                                return(
                                                    <Link to = {`/categories/${e.id}`} key = {'t' + e.id}>
                                                        {e.name}
                                                    </Link>
                                                )
                                            }) :
                                            filters.map(e => {
                                                return(
                                                    <div className = "filter-name">
                                                        <h1>{e.name}</h1>
                                                        {e.products ? e.products.map((prod) => (
                                                            <Link to = {`/products/${prod.id}`} key = {prod.id}>
                                                                {prod.name}
                                                            </Link>
                                                        )) : ""}
                                                    </div>
                                                )
                                            })
                                    :
                                <span>{errorMessage}</span> 
                            }
                    </div>
                </Filters>
                <DropDownOption>
                        <p>Histórico</p>
                </DropDownOption>
            </ Unifier>
            <Icons>
                <IoSearchOutline size = {25} onClick = {() => {}}/>
                <IoHeartOutline size = {25} onClick = {() => {}}/>
                <IoCartOutline size = {25} onClick = {() => {
                    setSidebar(true);
                    setContent('basket');
                    listBasket();
                }}/>
                <IoPersonOutline size = {25}  onClick = {() => {
                    setSidebar(true);
                    setContent('login')
                }}/>
                <IoMenuOutline size = {25} className = "mobile-view" onClick = {() => setSidebar(true)}/>
            </Icons>
            <Sidebar sidebar = {sidebar} setSidebar = {setSidebar} content = {content} setContent = {setContent}/>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    font-family: 'Alice', serif;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 7rem;
    background-color: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0,0, 0.1);
    z-index: 2;

    @media (max-width: 1000px){
        height: 6rem;
        
        img{
            margin-right: 3.5vw;
        }

        svg{
            backface-visibility: hidden;
            width: 22px;
        }

        li{
            font-size: 1.1rem;
        }
    }

    @media (max-width: 600px){
        height: 5.5rem;

        svg{
            backface-visibility: hidden;
            width: 25px;
            margin-right: 4vw;
        }

        svg:hover{
            transform: translateY(-1px) scale(1.1);
        }
    }
`

const Unifier = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`

const Icons = styled.div`
    display: flex;
    align-items: center;
    backface-visibility: hidden;

    .mobile-view{
        display: none;
    }

    svg{
        cursor: pointer;
        margin-right: 2vw;
        transition: all .2s;
        color: #333;

        &:hover{
            transform: translateY(-2px) scale(1.2);
            color: #777;
        }
    }

    @media (max-width: 600px){
        svg{
            margin-right: 2.2vw;
        }

        .mobile-view{
            display: initial;
        }
    }

`

const Filters = styled.ul`
    height: 100%;
    display: flex;
    align-items: center;

    .sub-menu{
        position: absolute;
        top: 5rem;
        left: 0;
        width: 100vw;
        height: 350px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        flex-wrap: wrap;
        overflow-y: hidden;
        padding: 1rem 2rem;
        background-color: #fff;
        color: #333;
        transform: scaleY(0);
        transition: all .3s ease;
        opacity: 0;
        z-index: 5;

        .filter-name{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: calc((100vw - 6rem)/3);

            h1{
                margin: 15px 0px;
                font-size: 23px;
            }

            a{
                margin: 13px 0px;
                font-size: 18px;
                color: #777;
            }

            @media (max-width: 1000px){
                h1{
                    font-size: 20px;
                }

                a{
                    font-size: 16px;
                }
            }
        }

        span{
            font-size: 25px;
            color: rgba(170, 20, 20, 0.9);
        }

        a{
            margin: 15px 10px;
            font-size: 20px;
            color: #777;
        }

        &__img{
            width: calc(100vw/5);
            align-self: center;
            margin: auto 0;
        }
    }

    :hover{
        .sub-menu{
            transform: scaleY(1);
            opacity: 1;
            box-shadow: 0px 4px 4px rgba(0 , 0, 0, 0.3);
        }
    }

    @media (max-width: 850px){
        .desktop-view{
            display: none;
        }
        .sub-menu{
            box-sizing: border-box;
            height: 280px;
            top: 4.25rem;
            padding: 2rem 2rem;

            &__img{
                display: none;
            }
        }
    }

    @media (max-width: 600px){
        li{
            display: none;
        }
    }
`

const DropDownOption = styled.li`
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.2rem;
    margin-right: 2vw;
    border-bottom: 0px;
    color: #333;
    transition: all .3s;

    &:after{
        content: '';
        position: absolute;
        top: 69%;
        left: 0;
        width: 100%;
        height: 2px;
        background: black;
        will-change: transform;
        transform: scale(0);
        transition: transform 0.3s ease;
    }
    
    &:hover:after{
        transform: scale(1);
    }

    @media (max-width: 600px){
       display: none;
    }

`