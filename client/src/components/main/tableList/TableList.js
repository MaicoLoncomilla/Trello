import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function TableList(){

    const [ state, setState ] = useState({
        title: "",
        description: ""
    })
    const [ redirect, setRedirect ] = useState(false)
    const newTodo = (e) => {
        e.preventDefault()
        if(!state.title){
            return alert('necesitas un title')
        }        
        axios.post('http://localhost:3001/inQueue', state)
        .then((r) => {
            console.log(r)
        })
        .catch(err => console.log(err))
    }   
    const onChangeText = (name, value) => {
        setState({...state, [name]: value})
    }
    return(
        <>
        {redirect && <Redirect to="/login"/>}
        <div>
           <form onSubmit={(e) => newTodo(e)}>
               <input 
               onChange={(e) => onChangeText('title', e.target.value)}
               />
               <textarea
               onChange={(e) => onChangeText('description', e.target.value)}
               />
               <button type="submit">New todo</button>
           </form>
        </div>
        </>
    )
}