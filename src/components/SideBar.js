import { useRef } from 'react';
import {IoCloseOutline, IoPersonOutline} from 'react-icons/io5';
import { useState } from 'react/cjs/react.development';
import '../styles/sidebar.css'

const Sidebar = ({ sidebar, setSidebar, content, setContent }) => {
    const sidebarRef = useRef();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[repeatPassword, setRepeatPassword] = useState('');
    const[cpf, setCpf] = useState('');
    const[phone, setPhone] = useState('');
    const[name, setName] = useState('')

    function closeModal (e) {
        if (sidebarRef.current === e.target) {
          setSidebar(false);
        }
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
            .replace(/(\d)(\d{4})$/,"$1-$2");
    }

    return(
        <>
            <div className = {sidebar ? "nav-overlay active" : "nav-overlay"} onClick = {closeModal} ref = {sidebarRef}></div>
            <div className = {sidebar ? "nav-menu active" : "nav-menu"}>
                <div className = "nav-menu__header">
                    <div className = "nav-menu__info">
                        {   content === 'login' ?
                            <>
                                <IoPersonOutline size = {20} color = {"#777"}/>
                                <p>Login</p>
                            </> : 
                            <>
                                <IoPersonOutline size = {20} color = {"#777"}/>
                                <p>Registro</p>
                            </> 
                        }
                    </div>
                    <IoCloseOutline size = {25} className = "nav-menu__close" onClick = {() => setSidebar(false)}/>
                </div>
                {
                    content === 'login' ? 
                    <>
                        <form className = "nav-menu__form">
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
                    </>: 
                    <>
                        <form className = "nav-menu__form">
                            <p className ="nav-menu__input--register">Informações de login</p>
                            <input className = "nav-menu__input" placeholder = "Digite seu email" type = "email" 
                                value = {email} onChange = {(e) => setEmail(e.target.value)}
                            />
                            <input className = "nav-menu__input" placeholder = "senha [6-11] caracteres" type = "password"
                                value = {password} onChange = {(e) => setPassword(e.target.value)}
                            />
                            <input className = "nav-menu__input" placeholder = "repetir senha" type = "password"
                                value = {repeatPassword} onChange = {(e) => setRepeatPassword(e.target.value)}
                            />
                            <p className ="nav-menu__input--register">Informações pessoais</p>
                            <input className = "nav-menu__input" placeholder = "Digite seu cpf" type = "text"
                                onChange = {(e) => setCpf(e.target.value)} value = {cpfMask(cpf)} pattern = "[0-9]{11}"
                            />
                            <input className = "nav-menu__input" placeholder = "Digite seu telefone" type = "text"
                                onChange = {(e) => setPhone(e.target.value)} value = {phoneMask(phone)} pattern = "[0-9]{11}"
                            />                            
                            <p className ="nav-menu__input--register">Informações de endereço</p>
                            <input className = "nav-menu__input" placeholder = "Estado" type = "text"
                                onChange = {(e) => setName(e.target.value)} value = {name} 
                            />
                            <input className = "nav-menu__input" placeholder = "Município" type = "text"
                                onChange = {(e) => setName(e.target.value)} value = {name} 
                            />
                            <input className = "nav-menu__input" placeholder = "Rua" type = "text"
                                onChange = {(e) => setName(e.target.value)} value = {name} 
                            />
                            <input className = "nav-menu__input" placeholder = "Número" type = "text"
                                onChange = {(e) => setName(e.target.value)} value = {name}
                            />
                            <input className = "nav-menu__input" placeholder = "Complemento" type = "text"
                                onChange = {(e) => setName(e.target.value)} value = {name}
                            />
                            <button className = "nav-menu__button" type = "submit">
                                Registrar
                            </button>
                            <p className = "nav-menu__p--switcher" onClick = {() => setContent('login')}>Já está cadastrado? Faça login!</p>
                        </form>
                    </>
                }
            </div>
        </>
    )
}

export default Sidebar