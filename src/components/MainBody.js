/* eslint-disable react-hooks/exhaustive-deps */
import Category from "../components/Category"
import BottomPage from "./BottomPage"
import styled from "styled-components"
import { useEffect, useRef, useState } from "react";
import { getMainCategories } from "../service/reqMainPage";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import HomeCarousel from "./Carousel";
import Loading from "./Loading";

export default function MainBody ({sidebar, setSideBar, setShowModal, setIsVisible, load}){
    const carouselRef = useRef();
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [erro, setErro] = useState("");

    const carouselOptions = {
        rootMargin: "-200px 0px 0px 0px",
    };

    useEffect(() => {
        const carouselObserver = new IntersectionObserver(([entry]) => {
            setIsVisible(!entry.isIntersecting)
        }, carouselOptions)

        if(carouselRef.current){
            carouselObserver.observe(carouselRef.current)
        }
    }, [carouselRef, load])

    async function listMainCategories(){
        setIsLoading(true)
        const result = await getMainCategories();

        if(result?.data){
            setCategories(result?.data);
            setIsLoading(false)
            return;
        }

        if(!result?.success){
            setErro(result?.message);
            setIsLoading(false)
            return;
        }
    }

    useEffect(() => {
        listMainCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            {isLoading ?
            <ModalBackground>
                <Loading spinnerSize = {200} margin = {"calc(50vh - 200)"}/>
            </ModalBackground>
            :
            <>
                <HomeCarousel/>
                <ContainerCategories>
                    <p ref = {carouselRef}>{erro}</p>
                    {categories.map((cat)=> <Category key={cat.id} name={cat.name} id={cat.id} 
                        sidebar = {sidebar} setSideBar = {setSideBar} setShowModal = {setShowModal}/>)}
                    <BottomPage />
                </ContainerCategories>
            </> }
        </>
    )
}


const ContainerCategories = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    width: 100vw;
    min-height: 100vw;
    font-family: 'Poppins', sans-serif;
`

const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0, 0.6);
    z-index: 120;
`
