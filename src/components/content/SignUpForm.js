import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react/cjs/react.development";
import { postSignUp } from "../../service/registration";
import Loading from "../Loading";

export default function SignUpForm ({setContent, email, setEmail, password, setPassword}) {
    const[repeatPassword, setRepeatPassword] = useState('');
    const[name, setName] = useState('');
    const[cpf, setCpf] = useState('');
    const[phone, setPhone] = useState('');
    const[street, setStreet] = useState('');
    const[number, setNumber] = useState('');
    const[complement, setComplement] = useState('');
    const[district, setDistrict] = useState('');
    const[neighborhood, setNeighborhood] = useState('');
    const[city, setCity] = useState('');
    const[showPassword, setShowPassword] = useState(false);
    const[showRepeatPassword, setShowRepeatPassword] = useState(false);
    const[errorMessage, setErrorMessage] = useState('');
    const[isLoading, setIsLoading] = useState(false);
    const[isDisabled, setIsDisabled] = useState(false);

    const forms = {
        name: name,
        email: email,
        password: password,
        cpf: cpf.replace('-', '').replace('.', "").replace('.', ""),
        address: {
          district: district,
          city: city,
          neighborhood: neighborhood,
          street: street,
          number: number,
          complement: complement,
        },
        phone: phone.replace('(', '').replace(')', '').replace('-', '').replace(" ", ""),
    }

    const cpfMask = (cpf) => {
        return cpf
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    }

    const phoneMask = (phone) => {
        return phone
            .replace(/\D/g,'')
            .replace(/^(\d{2})(\d)/g,"($1) $2")
            .replace(/(\d)(\d{4})$/,"$1-$2")
            .replace(/(-\d{4})\d+?$/, '$1');
    }

    async function handleRegister(e) {
        e.preventDefault();
        setIsLoading(true);
        setIsDisabled(true);
        const result = await postSignUp(forms);
    
        if(result.success){
            setContent('login');
            setIsLoading(false);
            setIsDisabled(false)
            return;
        }

        if(result.message){
            setErrorMessage(result.message);
            setIsLoading(false);
            setIsDisabled(false)    
            return;
        }

        setIsLoading(false);
        setIsDisabled(false)
        return;
    }

    return (
        <>
            <form className = "nav-menu__form" onSubmit = {handleRegister}>
                <IoEyeOutline className = "show-password" onClick = {() => setShowPassword(!showPassword)}/>
                <IoEyeOutline className = "show-repeatPassword" onClick = {() => setShowRepeatPassword(!showRepeatPassword)}/>
                <p className ="nav-menu__input--register">Informações de login</p>
                <input className = {errorMessage === "parece que esse email já está cadastrado" ? "nav-menu__input invalid" : "nav-menu__input"} placeholder = "Digite seu email" type = "email" 
                    value = {email} onChange = {(e) => setEmail(e.target.value)} disabled = {isDisabled}
                />
                <input className = "nav-menu__input" placeholder = "senha [6-11] caracteres" type = {showPassword ? "text" : "password"}
                    value = {password} onChange = {(e) => setPassword(e.target.value)} pattern=".{6,11}" disabled = {isDisabled}
                />
                <input className = {password === repeatPassword ? "nav-menu__input" : "nav-menu__input invalid"} placeholder = "repetir senha" type = {showRepeatPassword ? "text" : "password"}
                    value = {repeatPassword} onChange = {(e) => setRepeatPassword(e.target.value)} pattern=".{6,11}" disabled = {isDisabled}
                />
                <p className ="nav-menu__input--register">Informações pessoais</p>
                <input className = "nav-menu__input" placeholder = "Digite seu nome completo" type = "text"
                    value = {name} onChange = {(e) => setName(e.target.value)} pattern=".{3,}" disabled = {isDisabled}
                />
                <input className = {errorMessage === "parece que esse cpf já está cadastrado" ? "nav-menu__input invalid" : "nav-menu__input"} placeholder = "Digite seu cpf" type = "text" disabled = {isDisabled}
                    onChange = {(e) => setCpf(e.target.value)} value = {cpfMask(cpf)} pattern = ".{14}"
                />
                <input className = "nav-menu__input" placeholder = "Digite seu telefone [(xx) xxxxx-xxxx]" type = "text"
                    onChange = {(e) => setPhone(e.target.value)} value = {phoneMask(phone)} pattern = ".{14,15}" disabled = {isDisabled}
                />                            
                <p className ="nav-menu__input--register">Informações de endereço</p>
                <input className = "nav-menu__input uf" placeholder = "Digite seu Estado [UF]" type = "text" disabled = {isDisabled}
                    onChange = {(e) => setDistrict(e.target.value)} value = {district} pattern = "([a-zA-Z]){2}"
                />
                <input className = "nav-menu__input" placeholder = "Digite sua Cidade" type = "text"
                    onChange = {(e) => setCity(e.target.value)} value = {city} pattern = ".{2,}" disabled = {isDisabled}
                />
                <input className = "nav-menu__input" placeholder = "Digite seu Bairro" type = "text" disabled = {isDisabled}
                    onChange = {(e) => setNeighborhood(e.target.value)} value = {neighborhood} pattern = ".{2,}"
                />
                <input className = "nav-menu__input" placeholder = "Digite o nome de sua Rua" type = "text"
                    onChange = {(e) => setStreet(e.target.value)} value = {street} pattern = ".{1,}" disabled = {isDisabled}
                />
                <input className = "nav-menu__input" placeholder = "Digite o número da sua residência" type = "text"
                    onChange = {(e) => setNumber(e.target.value)} value = {number} pattern = ".{1,}" disabled = {isDisabled}
                />
                <input className = "nav-menu__input" placeholder = "Digite seu Complemento [opcional]" type = "text"
                    onChange = {(e) => setComplement(e.target.value)} value = {complement} disabled = {isDisabled}
                /> 
                <button className = "nav-menu__button" type = "submit">
                    {isLoading ?  <Loading spinnerSize = {30} color = {"#fff"} /> : "Registrar"}
                </button>
                <p className = "error-message">{errorMessage}</p>
                <p className = "nav-menu__p--switcher" onClick = {() => setContent('login')}>Já está cadastrado? Faça login!</p>
            </form>
        </>
    )
}