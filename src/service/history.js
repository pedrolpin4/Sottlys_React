import API from './api';
import BearerToken from './bearer';

export default async function getHistory(token){
    let status;
    let serverError;

    const result = await API.get(`/history`, BearerToken(token))
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
        message: "Parece que você ainda não realizou nenhuma compra :(",
    }

    if(result?.data) return {
        success: true,
        data: result.data,
    }

    return serverError
}
