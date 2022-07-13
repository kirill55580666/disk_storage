import React, {useState} from 'react';
import './navbar.scss'
import Logo from '../../assets/img/navbar-logo.svg'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../actions/user-action";
import {showLoader} from "../../reducers/appReducer";
import {getFiles, searchFiles} from '../../actions/file-action'
import avatarLogo from '../../assets/img/avatar.svg'
import {API_URL} from '../../config/config'

//const API_URL = 'http://localhost:7000/'

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)

    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div className="navbar">
            <Link to="/" className="navbar__link">
                <img src={Logo} alt="лого" className="navbar__logo"/>
                <div className="navbar__header">MERN CLOUD</div>
            </Link>
            {isAuth && <input
                value={searchName}
                onChange={e => searchChangeHandler(e)}
                className='navbar__search'
                type="text"
                placeholder="Название файла..."/>}
            {!isAuth && <div className="navbar__login">
                <Link to="/login">Войти</Link>
            </div> }
            {!isAuth && <div className="navbar__registration">
                <Link to="/registration">Регистрация</Link>
            </div> }
            {isAuth && <div
                className="navbar__login"
                onClick={() => dispatch(logout())}
            >
                Выйти
            </div> }
            {isAuth && <Link to="/profile">
                <img className="navbar__avatar" src={avatar}/>
            </Link>}
        </div>
    );
};

export default Navbar;