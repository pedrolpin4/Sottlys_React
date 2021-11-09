import API from './api'

async function getFilters(filter){
    let status;
    let serverError;

    const result = await API.get(`/${filter}`)
    .catch(err => {
        if(err.response){
            status = err.response.status;
            return status
        }

        serverError = {
            success: false,
            message: "Looks like our server is not okay, we'll fix it ASAP"
        }     
    })

    if(status === 404)return {
        success: false,
        message: `Looks like there are no ${filter} on the server`,
    }  

    if(result?.data) return {
        success: true,
        data: result.data,
    }

    return serverError
}

export {
    getFilters,
}