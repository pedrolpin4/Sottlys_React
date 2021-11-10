import API from "./api";

const postSignUp = async (forms) => {
    const response = await API.post("/sign-up", forms)
        .catch(e =>{
            if(e.response){
                if(e.response.status === 400) return{
                    success: false,
                    message: e.response.message
                }

                if(e.response.status === 409) return{
                    success: false,
                    message: e.response.message
                }
            }

            return{
                success: false,
                message: e.response.message
            }
        })

        if(response.data) return{
            success: true,
            data: response.data
        }

        return response
}

const postSignIn = async (forms) => {
    const response = await API.post("/sign-in", forms)
    .catch(e =>{
        if(e.response){
            if(e.response.status === 400) return{
                success: false,
                message: e.response.message
            }

            if(e.response.status === 401) return{
                success: false,
                message: e.response.message
            }

            if(e.response.status === 404) return{
                success: false,
                message: e.response.message
            }
        }

        return{
            success: false,
            message: e.response.message
        }
    })

    if(response.data) return{
        success: true,
        data: response.data
    }

    return response
}

export{
    postSignIn,
    postSignUp
}