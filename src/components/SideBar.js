import { useContext, useRef, useState } from 'react';
import {IoCartOutline, IoCloseOutline, IoExitOutline, IoPersonOutline, IoSearchOutline} from 'react-icons/io5';
import SignUpForm from './content/SignUpForm';
import LoginForm from './content/LoginForm';
import '../styles/sidebar.css'
import UserContext from '../context/UserContext';
import BasketContent from './content/BasketContent';
import SearchContainer from './SearchContainer';

const Sidebar = ({ sidebar, setSidebar, content, setContent, setShowModal }) => {
    const sidebarRef = useRef();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const{userData, setUserData} = useContext(UserContext);
    const [quantity, setQuantity] = useState(0);
    const [searchContent, setSearchContent] = useState('');

    function closeModal (e) {
        if (sidebarRef.current === e.target) {
          setSidebar(false);
        }
    }

    const logOut = () => {
        localStorage.removeItem("sottlysLogin");
        setContent('login')
        setUserData({});
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
                            </> : content === 'sign-up' ?
                            <>
                                <IoPersonOutline size = {20} color = {"#777"}/>
                                <p>Registro</p>
                            </> : content === 'basket' ?
                            <>
                                <IoCartOutline size = {20} color = {"#777"}/>
                                <p>{quantity} items</p>
                            </>: content === 'search' ?
                            <>
                                <IoSearchOutline size = {20} color = {"#777"}/>
                                <input placeholder = "Olá! O que você procura?" className = "nav-menu__search" value = {searchContent}
                                    onChange = {(e) => setSearchContent(e.target.value)}/> 
                            </> :
                            <>
                                <IoPersonOutline size = {20} color = {"#777"}/>
                                <p className = "nav-menu__welcome">Bem vinde, {userData.user ? userData.user.name.split(" ")[0] : "name"}</p>
                                <IoExitOutline onClick = {logOut} size = {20} cursor = {"pointer"}/>
                            </>
                        }
                    </div>
                    <IoCloseOutline size = {25} className = "nav-menu__close" onClick = {() => setSidebar(false)}/>
                </div>
                {
                    content === 'login' ? 
                    <LoginForm setContent = {setContent} password = {password} email = {email}
                        setPassword = {setPassword} setEmail = {setEmail}
                    /> : content === 'sign-up' ? 
                    <SignUpForm setContent = {setContent} password = {password} email = {email}
                        setPassword = {setPassword} setEmail = {setEmail}
                    /> : content === 'basket' ?
                    <BasketContent setQuantity = {setQuantity} sidebar = {sidebar} content = {content} 
                        setContent = {setContent} setSidebar = {setSidebar}/>
                    : content === 'search' ?
                    <SearchContainer setSidebar = {setSidebar} searchContent = {searchContent} setShowModal = {setShowModal}/> :
                    <div className = "error-container">
                        <p>Continue suas compras:</p>
                        <div className = "nav-menu__button basket" onClick = {() => setSidebar(false)}>
                            Continuar Comprando
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Sidebar