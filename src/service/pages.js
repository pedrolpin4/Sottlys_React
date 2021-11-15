import API from './api'

async function getInfoCategory(id){
    let status;
    let serverError;

    const result = await API.get(`/category/${id}`)
    .catch(err => {
        if(err.response){
            status = err.response.status;
            return status
        }

        serverError = {
            success: false,
            message:  "Nosso servidor não está funcionando, já estamos trabalhando nisso!!"
        }     
    })

    if(result?.data) return {
        success: true,
        data: result.data,
    }

    return serverError
}

export {
    getInfoCategory,
};