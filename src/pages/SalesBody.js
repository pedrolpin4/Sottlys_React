import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductsBySales } from "../service/reqMainPage";
import styled from "styled-components";
import Item from "../components/Item";
import { getInfoSales } from "../service/pages";
import BottomPage from "../components/BottomPage";
import Loading from "../components/Loading";

export default function SalesBody({sidebar, setSidebar, setShowModal}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState("")
  const [erro, setErro] = useState("");
  const { id } = useParams();

    async function listProductsBySales(){
        setIsLoading(true)
        const result = await getProductsBySales(id);
        
        if(result?.data){
            setIsLoading(false)
            setProducts(result.data);
        }

        if(result?.data.length === 0){
            setIsLoading(false)
            setErro("Sem itens desta Categoria :(");
            return;
        }
    }

    async function infoSales(){
        const result = await getInfoSales(id);
        if(result?.data){
            setName(result.data[0].name);
        }

        if(result?.data.length === 0){
            setErro("Esta categoria não existe");
            return;
        }
    }

    useEffect(() => {
        setErro('');
        listProductsBySales();
        infoSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return(
        <>
        {
            isLoading ? 
            <ModalBackground>
                <Loading spinnerSize = {200}/>
            </ModalBackground>
            :
            <>
                <ContainerBody>
                <Erro>
                    {erro}
                </Erro>
                <Title>
                    {name}
                </Title>
                <ContainerItens>
                    {products.map((prod)=>  <Item key={prod.id + 's'} prod={prod} page={true} sidebar = {sidebar} setSidebar = {setSidebar} setShowModal = {setShowModal}/>)}
                </ContainerItens>
                </ContainerBody>
                <BottomPage />
            </>
        }
        </>

    );
}

const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0, 0.7);
    z-index: 120;
`

const Erro = styled.div`
    margin-top: 7rem;
    font-size: 28px;
    font-weight: 700;
    display: flex;
    justify-content: center;

`
const ContainerItens = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  padding: 0 7px;
  margin-top: 20px;
  @media(max-width: 800px){
        padding: 0;
        margin-left: 0;
    }

`

const Title = styled.div`
    font-size: 33px;
    font-weight: 700;
    margin-left: 50px;
    margin-top: 20px;
    @media(max-width: 800px){
        margin-left: 20px;
        font-size: 28px;
    }

`

const ContainerBody = styled.div`
    min-height: calc(100vh - 7rem - 520px);
    @media(max-width: 1000px){
        min-height: calc(100vh - 6rem - 520px);
    }
    @media(max-width: 600px){
        min-height: calc(100vh - 5.5rem - 350px);
    }

`