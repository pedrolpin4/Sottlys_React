import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react/cjs/react.development";
import { postSignUp } from "../service/registration";

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

    const forms = {
        name: name,
        email: email,
        password: password,
        cpf: cpf.replace('-', '').replace('.', ""),
        address: {
          district: district,
          city: city,
          neighborhood: neighborhood,
          street: street,
          number: number,
          complement: complement,
        },
        phone: phone.replace('(', '').replace(')', '').replace('-', ''),
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
        const result = await postSignUp(forms);
        
        if(result.success){
            setContent('login')
            return;
        }
        console.log(result.message);
        return;
    }

    return (
        <>
            <form className = "nav-menu__form" onSubmit = {handleRegister}>
                <IoEyeOutline className = "show-password" onClick = {() => setShowPassword(!showPassword)}/>
                <IoEyeOutline className = "show-repeatPassword" onClick = {() => setShowRepeatPassword(!showRepeatPassword)}/>
                <p className ="nav-menu__input--register">Informações de login</p>
                <input className = "nav-menu__input" placeholder = "Digite seu email" type = "email" 
                    value = {email} onChange = {(e) => setEmail(e.target.value)}
                />
                <input className = "nav-menu__input" placeholder = "senha [6-11] caracteres" type = {showPassword ? "password" : "text"}
                    value = {password} onChange = {(e) => setPassword(e.target.value)}
                />
                <input className = "nav-menu__input" placeholder = "repetir senha" type = {showRepeatPassword ? "password" : "text"}
                    value = {repeatPassword} onChange = {(e) => setRepeatPassword(e.target.value)}
                />
                <p className ="nav-menu__input--register">Informações pessoais</p>
                <input className = "nav-menu__input" placeholder = "Digite seu nome completo" type = "text"
                    value = {name} onChange = {(e) => setName(e.target.value)}
                />
                <input className = "nav-menu__input" placeholder = "Digite seu cpf" type = "text"
                    onChange = {(e) => setCpf(e.target.value)} value = {cpfMask(cpf)}
                />
                <input className = "nav-menu__input" placeholder = "Digite seu telefone [(xx) xxxxx-xxxx]" type = "text"
                    onChange = {(e) => setPhone(e.target.value)} value = {phoneMask(phone)}
                />                            
                <p className ="nav-menu__input--register">Informações de endereço</p>
                <input className = "nav-menu__input" placeholder = "Estado" type = "text"
                    onChange = {(e) => setDistrict(e.target.value)} value = {district} 
                />
                <input className = "nav-menu__input" placeholder = "Cidade" type = "text"
                    onChange = {(e) => setCity(e.target.value)} value = {city} 
                />
                <input className = "nav-menu__input" placeholder = "Bairro" type = "text"
                    onChange = {(e) => setNeighborhood(e.target.value)} value = {neighborhood} 
                />
                <input className = "nav-menu__input" placeholder = "Rua" type = "text"
                    onChange = {(e) => setStreet(e.target.value)} value = {street} 
                />
                <input className = "nav-menu__input" placeholder = "Número" type = "text"
                    onChange = {(e) => setNumber(e.target.value)} value = {number}
                />
                <input className = "nav-menu__input" placeholder = "Complemento" type = "text"
                    onChange = {(e) => setComplement(e.target.value)} value = {complement}
                />
                <button className = "nav-menu__button" type = "submit">
                    Registrar
                </button>
                <p className = "nav-menu__p--switcher" onClick = {() => setContent('login')}>Já está cadastrado? Faça login!</p>
            </form>
        </>
    )
}