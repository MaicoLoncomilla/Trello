import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import api from '../../../redux/action-creator';
import actions from '../../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';

import sSection from '../../../styles/section.module.css';
import sInput from '../../../styles/input.module.css';
import sButton from '../../../styles/button.module.css';

export default function Modify() {

    const { BUTTONTASKACTIVE, BUTTONMODIFYPROJECT } = actions;
    const { DASHBOARD } = api
    const dispatch = useDispatch()
    const { dashboardToModify } = useSelector(state => state.buttonModifyProject)
    const { task } = useSelector(state => state.buttonTaskActive)
    const column = useSelector(state => state.column)
    const user = useSelector(state => state.user)
    const [state, setState] = useState({
        title: task ? task.title: dashboardToModify.title,
        description: task ? task.description : dashboardToModify.description,
        id: task ? task.id : dashboardToModify.id,
        idDashboard: column ? column[0]?.dashboardId: false,
        idUser: user.id
    })

    const onHandleClose = () => {
        if(task){
            dispatch({
                type: BUTTONTASKACTIVE,
                payload: false
            })
        }else {
            dispatch({
                type: BUTTONMODIFYPROJECT,
                payload: false
            })
        }
    }
    const onHandleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const onHandleSaveChange = () => {
        if (!state.title) {
            return alert('The task need a title')
        }
        if (task) {
            dispatch(api.modifyTask(state))
            dispatch({
                type: BUTTONTASKACTIVE,
                payload: false
            })
        } else {
            dispatch(api.modifyDashboard(state))
            dispatch({ type: DASHBOARD, payload: state })
            dispatch({ type: BUTTONMODIFYPROJECT, payload: false })
        }

    }
    const onHandleDelete = () => {
        const taskToDelete = {
            id: task?.id,
            idDashboard: column[0]?.dashboardId
        }
        if (task) {
            dispatch(api.deleteTask(taskToDelete))
            dispatch({
                type: BUTTONTASKACTIVE,
                payload: false
            })
        } else {
            const data = { id: dashboardToModify.id, idUser: user.id }
            if(user.dashboards.length > 1){
                dispatch(api.deleteDashboard(data))
                let position = 0;
                user.dashboards.map((el, index) => {
                    if(el.id === dashboardToModify.id){
                        position = index
                    }
                })
                if(position == 0){
                    dispatch({ type: DASHBOARD, payload: user.dashboards[++position] })
                    dispatch(api.getColumn(user.dashboards[position].id))
                }else{
                    dispatch({ type: DASHBOARD, payload: user.dashboards[0] })
                    dispatch(api.getColumn(user.dashboards[0].id))
                }
                dispatch({ type: BUTTONMODIFYPROJECT, payload: false })
            }else {
                return alert("No puedes eliminar el ultimo proyecto")
            }
        }

    }
    return (
        <section className={sSection.containerModifyTask}>
            <div className={sSection.containerTask}>
                <div
                    className={sSection.containerButtonClose}
                    onClick={() => onHandleClose()}>
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
                    className={sButton.buttonGreen}
                    onClick={() => onHandleSaveChange()}>Save Changes</button>
                    <button 
                    className={sButton.buttonCloseActive}
                    onClick={() => onHandleDelete()}>Delete Task</button>
                </div>
            </div>
        </section>
    )
}