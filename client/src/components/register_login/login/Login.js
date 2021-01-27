import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import api from '../../../redux/action-creator'

export default function Login(){

    const [ state, setState ] = useState({
        email: "",
        password: ""
    })
    const onChangeText = (name, value) => {
        setState({...state, [name]: value})
    }
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const onHandleLogin = (e) => {
        e.preventDefault();
        if(!state.email || !state.password){
            return alert('Complete the form')
        }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(state.email)){
            return alert('Email is not correct!')
        }
        dispatch(api.login(state))
    }
    
    return (
        <>
        {user && user.firstName && <Redirect to="/"/>}
        <div>
            <form onSubmit={(e) => onHandleLogin(e)}>
                <input
                    placeholder="Email"
                    onChange={(e) => onChangeText("email", e.target.value)}
                />
                <input
                    placeholder="Password"
                    onChange={(e) => onChangeText("password", e.target.value)}
                />
                <button type="submit">Ingresar</button>
            </form>
            <Link to="/register"><p>Create a new account</p></Link>
        </div>
        </>
    )
}