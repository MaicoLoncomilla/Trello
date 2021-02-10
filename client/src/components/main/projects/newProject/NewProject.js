import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../redux/actions';
import api from '../../../../redux/action-creator';

import CloseIcon from '@material-ui/icons/Close';

import sSection from '../../../../styles/section.module.css';
import sInput from '../../../../styles/input.module.css';
import sButton from '../../../../styles/button.module.css';

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
        <div className={sSection.containerModifyTask}>
            <div className={sSection.containerTask}>
                <div
                    className={sSection.containerButtonClose}
                    onClick={() => onHandleCloseNewProject()}>
                    <CloseIcon />
                </div>
                <input
                    placeholder="Title"
                    className={sInput.inputModifyTask}
                    onChange={(e) => onHandleChangeText("title", e.target.value)}
                    maxLength={30}
                />
                <textarea
                    placeholder="Description"
                    maxLength={1000}
                    className={sInput.textAreaModifyTask}
                    onChange={(e) => onHandleChangeText("description", e.target.value)}
                />
                <div className={sSection.containerButtonModifyTask}>

                    <button className={sButton.buttonGreen} onClick={() => onHandleNewProject()}>
                        New Project
                    </button>
                </div>
            </div>
        </div>
    )
}