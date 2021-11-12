import API from './api';
import BearerToken from './bearer';

async function postBasket(token, body){
    let status;
    let serverError;

    const result = await API.post(`/basket`, body, BearerToken(token))
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

    if(result.status === 200) return {
        success: true,
        message: "Adicionado com sucesso",
    }

    return serverError
}

export{
    postBasket,
}