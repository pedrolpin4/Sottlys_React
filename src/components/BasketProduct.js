/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { deleteProduct, updateQuantity } from "../service/basket"
import UserContext from '../context/UserContext'
import { IoTrashOutline } from 'react-icons/io5'

export default function BasketProduct({prod, setQuantity, setTotal, content}){  
    const[prodQty, setProdQty] = useState(prod.quantity);
    const { userData } = useContext(UserContext);

    useEffect( () => {
        setTotal(prev => prev + Number(prod.product.price)*prod.quantity);
        setQuantity(prev => prev + prod.quantity);
    }, []);

    return (
     <div className = "nav-menu__product" key = {prod.id}>
         <IoTrashOutline size = {12} onClick = {() => deleteProduct(userData.token, prod.product.id)}/>
         <img className = "nav-menu__product--image" src ={prod.image ? prod.image.name :  "/assets/Girassol.png"} 
             alt ="imagem produto" key = {`i${prod.id}`}/>
         <div className = "nav-menu__product--info" >
             <p className = "product--name">{prod.product.name}</p>
             <div className = "product--specifics">
                 <p>Cor: <span className = "black">{prod.colors.name}</span></p>
                 <p>Tamanho: <span className = "black">{prod.size.name}</span></p>
             </div>
             <div className = "product--numbers">
                 <div className = "product--operators">
                     <div onClick = {() => {
                        if(prodQty < 1){
                            return;
                        }
                        
                        setQuantity(prev => prev - 1)
                        setProdQty(prev => prev - 1)
                        setTotal(prev => prev  - Number(prod.product.price))   

                         if(prodQty === 1){
                            deleteProduct(userData.token, prod.product.id);
                            return;
                         }
                         updateQuantity(userData.token, prod.product.id, prodQty - 1)
                    }}>
                         -
                     </div>
                     <p>{prodQty}</p>
                     <div onClick = {() => {
                         setQuantity(prev => prev + 1)
                         setProdQty(prev => prev + 1)
                         updateQuantity(userData.token, prod.product.id, prodQty + 1)
                         setTotal(prev => prev  + Number(prod.product.price))
                    }}>
                            +
                    </div>
                 </div>
                 <p>R$ {prod.product.price.replace(".", ",")}</p>
             </div>
         </div>
     </div>
    )
}