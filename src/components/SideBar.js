import { useRef } from 'react';
import {IoCloseOutline, IoPersonOutline} from 'react-icons/io5';
import { useState } from 'react/cjs/react.development';
import SignUpForm from './SignUpForm';
import '../styles/sidebar.css'
import LoginForm from './LoginForm';

const Sidebar = ({ sidebar, setSidebar, content, setContent }) => {
    const sidebarRef = useRef();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    function closeModal (e) {
        if (sidebarRef.current === e.target) {
          setSidebar(false);
        }
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
                    <LoginForm setContent = {setContent} password = {password} email = {email}
                        setPassword = {setPassword} setEmail = {setEmail}
                    /> :
                    <SignUpForm setContent = {setContent} password = {password} email = {email}
                        setPassword = {setPassword} setEmail = {setEmail}
                    />
                }
            </div>
        </>
    )
}

export default Sidebar