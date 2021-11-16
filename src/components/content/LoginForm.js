import { useContext, useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import UserContext from "../../context/UserContext";
import { postSignIn } from "../../service/registration";
import Loading from "../Loading";

export default function LoginForm ({setContent, email, setEmail, password, setPassword}){
    const[showPassword, setShowPassword] = useState(false);
    const[errorMessage, setErrorMessage] = useState('');
    const[isLoading, setIsLoading] = useState(false);
    const[isDisabled, setIsDisabled] = useState(false);
    const {setUserData} = useContext(UserContext);

    const forms = {
        email,
        password
    }

    async function handleLogin(e) {
        e.preventDefault();
        setIsLoading(true);
        setIsDisabled(true)
        setErrorMessage('')
        const result = await postSignIn(forms);
        
        if(result.success){
            setIsLoading(false);
            setIsDisabled(false);
            setUserData({...result.data});
            setContent('user-page');
            localStorage.setItem("sottlysLogin", JSON.stringify({...result.data}));
            return;
        }

        setErrorMessage(result.message);
        setIsLoading(false);
        setIsDisabled(false);
        return;
    }

    useEffect(() => {
        if(localStorage.getItem("sottlysLogin")){
            setContent('user-page')
        }
        setEmail('');
        setPassword('');
        setErrorMessage('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            <form className = "nav-menu__form" onSubmit = {handleLogin}>
                <IoEyeOutline className = "show-password--login" onClick = {() => setShowPassword(!showPassword)}/>
                <h2 className = "nav-menu__form--title">Identifique-se</h2>
                <p className ="nav-menu__input--name">Digite seu email</p>
                <input className = {errorMessage ? "nav-menu__input invalid" : "nav-menu__input"} disabled = {isDisabled}
                    placeholder = "email [ex: oi@uol.com]" type = "email" value = {email} onChange = {(e) => setEmail(e.target.value)}
                />
                <p className ="nav-menu__input--name">Senha</p>
                <input className = {errorMessage ? "nav-menu__input invalid" : "nav-menu__input"} placeholder = "senha [6-11] caracteres" pattern=".{6,11}"
                    type = {showPassword ? "text" : "password"} value = {password} onChange = {(e) => setPassword(e.target.value)} disabled = {isDisabled}
                />
                <button className = "nav-menu__button" type = "submit">
                    {isLoading ? <Loading spinnerSize = {35} /> :"ENTRAR"}
                </button>
                <p className = "error-message">{errorMessage}</p>
            </form>
            <h3 className = "nav-menu__register">Primeira compra?</h3>
            <button className = "nav-menu__button--switcher" onClick = {() => setContent('sign-up')}>
                CRIAR NOVO CADASTRO
            </button>
        </>
    )
}