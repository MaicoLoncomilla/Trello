import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import actions from '../../../../redux/actions';
import api from '../../../../redux/action-creator';

import { Input, TextArea } from '../../../../utils/components/Input';
import { Button } from '../../../../utils/components/Button';
import useClickOutside from '../../../../utils/functions/useClickOutside';

import CloseIcon from '@material-ui/icons/Close';

import sSection from '../../../../styles/section.module.css';

export default function NewProject(){

    const { BUTTONNEWPROJECT } = actions
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [ state, setState ] = useState({
        title: "",
        description: "",
        idUser: user.id,
        uuid: uuidv4(),
    })
    const onHandleCloseNewProject = () =>{
        dispatch({ type: BUTTONNEWPROJECT, payload: false })
    }

    const onHandleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const onHandleNewProject = () => {
        if(!state.title){
            return alert("Dashboard need a title")
        }
        const newProject = {
            description: state.description,
            uuid: uuidv4(),
            title: state.title,
            userRol: { state: "owner"}
        }
        user.dashboards.push(newProject)
        dispatch(api.newDashboard(state))
        onHandleCloseNewProject()
    }

    let domnNode = useClickOutside(() => {
        dispatch({ type: BUTTONNEWPROJECT, payload: false })
    })
    return (
        <div className={sSection.containerModifyTask}>
            <div className={sSection.containerTask} ref={domnNode}>
                <div
                    className={sSection.containerButtonClose}
                    onClick={() => onHandleCloseNewProject()}>
                    <CloseIcon />
                </div>
                <Input
                    s={"inputModifyTask"}
                    placeholder={"Title"}
                    onChangeText={onHandleChangeText}
                    number={30}
                    name={"title"}
                    type={"text"}
                    autoFocus={true}
                />
                <TextArea
                    s={"textAreaModifyTask"}
                    placeholder={"Description"}
                    number={1000}
                    value={state.description}
                    name={"description"}
                    onChangeText={onHandleChangeText}
                />
                <div className={sSection.containerButtonModifyTask}>
                    <Button
                        s={'buttonGreen'}
                        label={"New Project"}
                        onClick={onHandleNewProject}
                        type={"button"}
                    />
                </div>
            </div>
        </div>
    )
}