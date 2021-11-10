import { postSignIn } from "../service/registration";

export default function LoginForm ({setContent, email, setEmail, password, setPassword}){

    const forms = {
        email,
        password
    }

    async function handleLogin(e) {
        e.preventDefault();
        console.log('loguei');
        const result = await postSignIn(forms);
        
        if(result.success){
            setContent('login')
            return;
        }
        return;
    }

    return(
        <>
            <form className = "nav-menu__form" onSubmit = {handleLogin}>
                <h2 className = "nav-menu__form--title">Identifique-se</h2>
                <p className ="nav-menu__input--name">Digite seu email</p>
                <input className = "nav-menu__input" placeholder = "email" type = "email" 
                    value = {email} onChange = {(e) => setEmail(e)}
                />
                <p className ="nav-menu__input--name">Senha</p>
                <input className = "nav-menu__input" placeholder = "senha [6-11] caracteres" type = "password"
                    value = {password} onChange = {(e) => setPassword(e)}
                />
                <button className = "nav-menu__button" type = "submit">
                    ENTRAR
                </button>
            </form>
            <h3 className = "nav-menu__register">Primeira compra?</h3>
            <button className = "nav-menu__button--switcher" onClick = {() => setContent('sign-up')}>
                CRIAR NOVO CADASTRO
            </button>
        </>
    )
}