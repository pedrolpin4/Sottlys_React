import API from './api'

async function getMainCategories(){
    let status;
    let serverError;

    const result = await API.get(`/main-categories`)
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
        message: `Looks like there are no categories on the server`,
    }  

    if(result?.data) return {
        success: true,
        data: result.data,
    }

    return serverError
}

async function getProductsByCategory(id){
    let status;
    let serverError;

    const result = await API.get(`/products-category/${id}`)
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
        message: `Looks like there are no categoriy on the server`,
    }  

    if(result?.data) return {
        success: true,
        data: result.data,
    }

    return serverError
}

export {
    getMainCategories,
    getProductsByCategory,
};
