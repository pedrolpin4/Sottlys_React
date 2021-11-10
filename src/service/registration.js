import API from "./api";

const postSignUp = async (forms) => {
    const response = await API.post("/sign-up", forms)
        .catch(e =>{
            if(e.response){
                if(e.response.status === 400) return{
                    success: false,
                    message: "preencha os campos vazios ou inválidos"
                }

                if(e.response.status === 409) return{
                    success: false,
                    message: "parece que esse email já está cadastrado"
                }

                if(e.response.status === 401) return{
                    success: false,
                    message: "parece que esse cpf já está cadastrado"
                }
            }

            return{
                success: false,
                message: "erro de servidor, já estamos trabalhando para resolver :)"
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
                message: "email e/ou senha inválidos"
            }

            if(e.response.status === 404) return{
                success: false,
                message: "email e/ou senha inválidos"
            }
        }

        return{
            success: false,
            message: "erro de servidor"
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