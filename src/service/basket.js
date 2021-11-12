import API from './api';
import BearerToken from './bearer';

async function getBasket(token){
    let status;
    let serverError;

    const result = await API.get(`/basket`, BearerToken(token))
    .catch(err => {
        if(err.response){
            status = err.response.status;
            return status
        }

        serverError = {
            success: false,
            message: "Nosso servidor não está funcionando, já estamos trabalhando nisso!!"
        }     
    })

    if(status === 401)return {
        success: false,
        message: `Parece que você não está logado`,
    }

    if(result.status === 204) return {
        success: true,
        message: "Seu carrinho está vazio :(",
    }

    if(result?.data) return {
        success: true,
        data: result.data,
    }

    return serverError
}

async function updateQuantity(token, productId, quantity){
    let status;
    let serverError;
    let newToken = BearerToken(token);
    console.log(newToken);


    const result = await API.put(`/quantity`, {
        productId,
        quantity
    } ,newToken)

    .catch(err => {
        if(err.response){
            status = err.response.status;
            return status
        }

        serverError = {
            success: false,
            message: "Nosso servidor não está funcionando, já estamos trabalhando nisso!!"
        }     
    })

    if(status === 401)return {
        success: false,
        message: `Parece que você não está logado`,
    }

    if(result.success) return {
        success: true
    }

    return serverError
}

async function deleteProduct(token, productId, setPosition){
    let status;
    let serverError;
    let newToken = BearerToken(token);
    console.log(newToken);

    const result = await API.delete(`/basket`, {data: {productId,},headers:{
        Authorization: `Bearer ${token}`
    } })

    .catch(err => {
        if(err.response){
            status = err.response.status;
            return status
        }

        serverError = {
            success: false,
            message: "Nosso servidor não está funcionando, já estamos trabalhando nisso!!"
        }     
    })

    if(status === 401)return {
        success: false,
        message: `Parece que você não está logado`,
    }

    if(result.success){
        setPosition(true)
        return {
            success: true
        }
    } 

    return serverError
}

export {
    getBasket,
    updateQuantity,
    deleteProduct
}