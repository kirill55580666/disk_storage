import React, {useState} from 'react';
import './registration.scss'
import MyInput from "../UI/MyInput/MyInput";
import {registration} from "../../actions/user-action";

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className='registration'>
            <div className="registration__header">Регистрация</div>
            <MyInput value={email} setValue={setEmail} type='text' placeholder='Введите email...'/>
            <MyInput value={password} setValue={setPassword} type='password' placeholder='Введите пароль...'/>
            <button
                className="registration__button"
                onClick={() => registration(email, password)}
            >
                Зарегистрироваться
            </button>
        </div>
    );
};

export default Registration;