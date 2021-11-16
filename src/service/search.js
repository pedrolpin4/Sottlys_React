import API from './api';

export default async function getSearchs(content, type){
    let status;
    let serverError;

    if(!content.length){
        return{
            success: true,
            message: "Não há resultados para essa pesquisa :(",
        };
    }

    const result = await API.get(`/search?type=${type}&content=${content}`)
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

    console.log(result.data);

    if(result.status === 204) return {
        success: true,
        message: "Não há resultados para essa pesquisa :(",
    }

    if(result?.data) return {
        success: true,
        data: result.data,
    }

    return serverError
}
