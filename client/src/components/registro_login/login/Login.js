import React, { useState } from 'react';

export default function Login(){

    const [ state, setState ] = useState({
        email: "",
        password: ""
    })

    const onChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const onHandleLogin = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={(e) => onHandleLogin(e)}>
            <input 
            onChange={(e) => onChangeText("email", e.target.value)}
            />
            <input
            onChange={(e) => onChangeText("password", e.target.value)}
            />
            <button type="submit">Ingresar</button>
        </form>
    )
}