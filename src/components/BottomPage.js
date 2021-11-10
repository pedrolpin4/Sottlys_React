import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMainCategories } from "../service/reqMainPage";
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoPinterest, IoLogoTwitter, IoLogoWhatsapp} from "react-icons/io"

export default function BottomPage (){
    const [categories, setCategories] = useState([])

    async function listMainCategories () {
        const result = await getMainCategories();
        if(result?.data){
            setCategories(result?.data);
            return;
        }
    }

    useEffect(() => {
        listMainCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <ContainerBottom>
            <DiplayFlex>
                <Info>
                <h1>Categorias</h1>
                {categories.map((c)=><Link to="/" key={c.id}> <p>{c.name}</p> </Link>)}
            </Info>
            <Info>
                <h1>Tendencias</h1>
                <Link to="/">
                    <p>Tops</p>
                </Link>
                <Link to="/">
                    <p>Saia midi</p>
                </Link>
                <Link to="/">
                    <p>Chapeu bucket</p>
                </Link>
                <Link to="/">
                    <p>Vestido A-line</p>
                </Link>
                <Link to="/">
                    <p>Biquini cropped</p>
                </Link>
                <Link to="/">
                    <p>Sandalia Anabela</p>
                </Link>
            </Info>
            <Info>
                <h1>Promocao</h1>
                <Link to="/">
                    <p>Blusas</p>
                </Link>
                <Link to="/">
                    <p>Shorts</p>
                </Link>
                <Link to="/">
                    <p>Acessorio</p>
                </Link>
                <Link to="/">
                    <p>Vestidos</p>
                </Link>
                <Link to="/">
                    <p>Roupas de Banho</p>
                </Link>
                <Link to="/">
                    <p>Sapatos</p>
                </Link>
            </Info>
            </DiplayFlex>
            <Logos>
                <IoLogoFacebook fontSize="30px"/>
                <IoLogoInstagram fontSize="30px"/>
                <IoLogoLinkedin fontSize="30px"/>
                <IoLogoPinterest fontSize="30px"/>
                <IoLogoTwitter fontSize="30px"/>
                <IoLogoWhatsapp fontSize="30px"/>
            </Logos>
            
            
        </ContainerBottom>
    )
}

const ContainerBottom = styled.div`
    width: 100%;
    height: 360px;
    background-color: lightgray;
    margin-top: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin-right: 5%;

    h1{
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 10px;
    }
    p{
        margin-top: 10px;
    }
`

const DiplayFlex = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-left: 5%;

`
const Logos = styled.div`
    display: flex;
    width: 25%;
    justify-content: space-between;
    margin-top: 30px;
    
`