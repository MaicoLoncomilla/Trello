import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../redux/action-creator';
import { Redirect } from 'react-router-dom';

export default function Register(){

    const [ state, setState ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: ""
    })
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const onChangeText = (name, value) => {
        setState({...state, [name]: value})
    }
    const onHandleCreateUser = (e) => {
        e.preventDefault();
        if(!state.firstName || !state.lastName || !state.email || !state.password || !state.repeatPassword){
            return alert('error')
        }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(state.email)){
            return alert('Error lo ingresado no es un Email')
        }
        dispatch(api.register(state))
    }
    return (
        <>
        {user.firstName && <Redirect to="/"/>}
        <form onSubmit={(e) => onHandleCreateUser(e)}>
            <div>
                <input
                    onChange={(e) => onChangeText("firstName", e.target.value)}
                    placeholder="First Name" />
                <input
                    onChange={(e) => onChangeText("lastName", e.target.value)}
                    placeholder="Last Name" />
            </div>
            <input
                onChange={(e) => onChangeText("email", e.target.value)}
                placeholder="Email" />
            <div>
                <input
                    onChange={(e) => onChangeText("password", e.target.value)}
                    placeholder="Password" />
                <input
                    onChange={(e) => onChangeText("repeatPassword", e.target.value)}
                    placeholder="Repeat Password" />
            </div>
            <button type="submit">Sign Up</button>
        </form>
        </>
    )
}