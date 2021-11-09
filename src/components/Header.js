import styled from "styled-components"
import Logo from './Logo'
import {IoPersonOutline, IoCartOutline, IoHeartOutline, IoSearchOutline, IoMenuOutline} from 'react-icons/io5'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getFilters } from "../service/filters"

export default function Header () {
    const [categories, setCategories] = useState([]);
    const [trends, setTrends] = useState([]);
    const [sales, setSales] = useState([]);
    const [filters, setFilters] = useState([]);

    async function listCategories(){
        const result = await getFilters('categories')

        if(result?.data){
            setCategories(result.data);
            return;
        }

        if(!result?.success){
            return result?.message;
        }
    }

    async function listTrends(){
        const result = await getFilters('trends')

        if(result?.data){
            setTrends(result.data);
            return;
        }

        if(!result?.success){
            return result?.message;
        }
    }

    async function listSales(){
        const result = await getFilters('sales')

        if(result?.data){
            setSales(result.data);
            return;
        }

        if(!result?.success){
            return result.message;
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
                <Filters>
                    <DropDownOption>
                        <p onMouseOver = {() => {
                            setFilters([...categories])
                            console.log(categories);
                        }}>
                            Categorias
                        </p>
                    </DropDownOption>
                    <DropDownOption>
                        <p onMouseOver = {() => {
                            setFilters([...sales])
                            console.log(sales);
                        }
                        }>
                            Promoções
                        </p>
                    </DropDownOption>
                    <DropDownOption className = "desktop-view">
                        <p onMouseOver = {() => {
                            setFilters([...trends])
                            console.log(trends);
                        }}>
                            Tendências
                        </p>
                    </DropDownOption>
                    <div className="sub-menu">
                            {filters.map(e => {
                                return(
                                    <Link to = {`/categories/${e.id}`} key = {e.id}>
                                        {e.name}
                                    </Link>
                                )
                            })}
                            <img className = "sub-menu__img" src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80" alt = "category img"/>
                    </div>
                </Filters>
                <DropDownOption>
                        <p>Histórico</p>
                </DropDownOption>
            </ Unifier>
            <Icons>
                <IoSearchOutline size = {25} onClick = {() => console.log("tô clicando")}/>
                <IoHeartOutline size = {25} onClick = {() => console.log("tô clicando")}/>
                <IoCartOutline size = {25} onClick = {() => console.log("tô clicando")}/>
                <IoPersonOutline size = {25} onClick = {() => console.log("tô clicando")}/>
                <IoMenuOutline size = {25} className = "mobile-view"/>
            </Icons>
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
    background-color: #fdddd3;
    box-shadow: 0px 1px 3px rgba(0, 0,0, 0.1);
    z-index: 2;

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
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        overflow-y: hidden;
        padding: 0rem 3rem;
        background-color: #fff;
        color: #333;
        transform: scaleY(0);
        transition: all .3s ease;
        opacity: 0;
        z-index: 3;

        a{
            margin: 20px 0px
        }

        &__img{
            width: calc(100vw/5);
            align-self: center;
            margin: auto 0;
        }
    }

    :hover{
        .sub-menu{
            transform: scale(1);
            opacity: 1;
            box-shadow: 0px 400px 0px 0px rgba(0,0,0,0.3);
        }
    }

    @media (max-width: 850px){
        .desktop-view{
            display: none;
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