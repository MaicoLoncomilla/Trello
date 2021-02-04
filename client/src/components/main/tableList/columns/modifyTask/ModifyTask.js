import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import api from '../../../../../redux/action-creator';
import actions from '../../../../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';

import sSection from '../../../../../styles/section.module.css';
import sInput from '../../../../../styles/input.module.css';
import sButton from '../../../../../styles/button.module.css';

export default function ModifyTask() {

    const { BUTTONTASKACTIVE } = actions
    const dispatch = useDispatch()
    const { task } = useSelector(state => state.buttonTaskActive)
    const column = useSelector(state => state.column)
    const [state, setState] = useState({
        title: task.title,
        description: task.description,
        id: task.id,
        idDashboard: column[0].dashboardId
    })
    const onHandleCloseButtonTask = () => {
        dispatch({
            type: BUTTONTASKACTIVE,
            payload: false
        })
    }
    const onHandleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const onHandleSaveChange = () => {
        if (!state.title) {
            return alert('The task need a title')
        }
        dispatch(api.modifyTask(state))
        dispatch({
            type: BUTTONTASKACTIVE,
            payload: false
        })
    }
    const onHandleDeleteTask = () => {
        const taskToDelete = {
            id: task.id,
            idDashboard: column[0].dashboardId
        }
        dispatch(api.deleteTask(taskToDelete))
        dispatch({
            type: BUTTONTASKACTIVE,
            payload: false
        })
    }
    return (
        <section className={sSection.containerModifyTask}>
            <div className={sSection.containerTask}>
                <div
                    className={sSection.containerButtonClose}
                    onClick={() => onHandleCloseButtonTask()}>
                    <CloseIcon />
                </div>
                <input
                    placeholder="Title"
                    className={sInput.inputModifyTask}
                    onChange={(e) => onHandleChangeText("title", e.target.value)}
                    value={state.title}
                />
                <textarea
                    placeholder="Description"
                    maxLength={1000}
                    className={sInput.textAreaModifyTask}
                    onChange={(e) => onHandleChangeText("description", e.target.value)}
                    value={state.description}
                />
                <div className={sSection.containerButtonModifyTask}>
                    <button 
                    className={sButton.buttonSaveChange}
                    onClick={() => onHandleSaveChange()}>Save Changes</button>
                    <button 
                    className={sButton.buttonDeleteTask}
                    onClick={() => onHandleDeleteTask()}>Delete Task</button>
                </div>
            </div>
        </section>
    )
}