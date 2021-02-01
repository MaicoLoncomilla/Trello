import React, { useState } from 'react';
import actions from '../../../../redux/actions';
import api from '../../../../redux/action-creator';
import { useDispatch, useSelector } from 'react-redux';

export default function NewProject(){

    const { BUTTONNEWPROJECT } = actions
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [ state, setState ] = useState({
        title: "",
        description: "",
        idUser: user.id
    })
    const onHandleCloseNewProject = () =>{
        dispatch({
            type: BUTTONNEWPROJECT,
            payload: false
        })
    }

    const onHandleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const onHandleNewProject = () => {
        if(!state.title){
            return alert("Dashboard need a title")
        }
        dispatch(api.newDashboard(state))
        onHandleCloseNewProject()
    }

    return (
        <div>
            <button onClick={() => onHandleCloseNewProject()}>X</button>
            <input
            onChange={(e) => onHandleChangeText("title", e.target.value)}
            />
            <textarea
            onChange={(e) => onHandleChangeText("description", e.target.value)}
            />
            <button onClick={() => onHandleNewProject()}>
                New Project
            </button>
        </div>
    )
}