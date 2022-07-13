import React, {useState} from 'react';
import './login.scss'
import MyInput from "../UI/MyInput/MyInput";
import {login} from "../../actions/user-action";
import {useDispatch} from "react-redux";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    return (
        <div className='login'>
            <div className="login__header">Авторизация</div>
            <MyInput value={email} setValue={setEmail} type='text' placeholder='Введите email...'/>
            <MyInput value={password} setValue={setPassword} type='password' placeholder='Введите пароль...'/>
            <button
                className="login__button"
                onClick={() => dispatch(login(email, password))}
            >
                Войти
            </button>
        </div>
    );
};

export default Login;