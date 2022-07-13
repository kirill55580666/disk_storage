import React from 'react';
import styles from './my-input.module.scss'

const MyInput = ({type, placeholder, value, setValue}) => {
    return (
        <input
            className={styles.myInput}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export default MyInput;