import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoPinterest, IoLogoTwitter, IoLogoWhatsapp} from "react-icons/io"
import { useEffect, useState } from "react/cjs/react.development";
import { getFilters } from "../service/filters";

export default function BottomPage (){
    const [sales, setSales] = useState([]);
    const [trends, setTrends] = useState([]);
    const [categories, setCategories] = useState([]);

    async function info(){
        const resultSales = await getFilters('sales');;
        if(resultSales?.data){
            const justSomeProducts = resultSales.data.filter((r,i)=> i<6);
            setSales(justSomeProducts);
        }
        const resultTrends = await getFilters('trends');;
        if(resultTrends?.data){
            const justSomeProducts = resultTrends.data.filter((r,i)=> i<6);
            setTrends(justSomeProducts);
        }
        const resultCategories = await getFilters('categories');;
        if(resultCategories?.data){
            const justSomeProducts = resultCategories.data.filter((r,i)=> i<6);
            setCategories(justSomeProducts);
        }
    }

    useEffect(()=>{
        info();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <ContainerBottom>
            <DiplayFlex>
                <Info>
                <h1>Categorias</h1>
                {categories.map((c)=><Link to={`/category/${c.id}`} key={c.id}> <p>{c.name}</p> </Link>)}
            </Info>
            <Info>
                <h1>Tendencias</h1>
                {trends.map((t)=><Link to={`/category/${t.id}`} key={t.name}><p>{t.name}</p></Link>)}
            </Info>
            <Info>
                <h1>Promocao</h1>
                {sales.map((s)=> <Link to={`/sales/${s.id}`} key={s.name}><p>{s.name}</p></Link> )}
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
    @media(max-width: 800px){
        height: 250px;
    }
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

    @media(max-width: 800px){
        max-height: 190px;
        width: auto;
        h1{
            font-size: 14px;
        }
        p{
            font-size: 13px;
            margin-top: 6px;
        }
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
    &:hover{
        cursor: pointer;
    }
    @media(max-width: 800px){
        margin-top: 10px;
        width: 35%;
    }
`