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
            message:  "Nosso servidor não está funcionando, já estamos trabalhando nisso!!"
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

async function getProductsInSales(){
    let status;
    let serverError;

    const result = await API.get(`products-in-sales`)
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
            message:  "Nosso servidor não está funcionando, já estamos trabalhando nisso!!"
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

async function getProductsBySales(id){
    let status;
    let serverError;

    const result = await API.get(`/products-sales/${id}`)
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
    getProductsBySales,
    getProductsInSales,
};
