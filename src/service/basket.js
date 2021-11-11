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
    console.log(BearerToken(token));

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

export {
    getBasket,
}