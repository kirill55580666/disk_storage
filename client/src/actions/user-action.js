import axios from "axios";
import {setLogout, setUser} from "../reducers/userReducer";
import {API_URL} from '../config/config'

export const registration = async (email, password) => {
    try  {
        const response = await axios.post(`${API_URL}api/registration`,{
            email,
            password
        })
        alert(response.data)
    } catch (e) {
        alert(e.response.data.message)
    }

}

export const login = (email, password) => {
    return async dispatch => {
        try  {
            const response = await axios.post(`${API_URL}api/login`,{
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const logout = () => {
    return dispatch => {
        try {
            dispatch(setLogout())
            localStorage.removeItem('token')
        } catch (e) {
            alert(e)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try  {
            const response = await axios.get(`${API_URL}api/auth`,{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            localStorage.removeItem('token')
            alert(e.response.data.message)
        }
    }
}

export const uploadAvatar =  (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`${API_URL}api/files/avatar`, formData,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteAvatar =  () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files/avatar`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}