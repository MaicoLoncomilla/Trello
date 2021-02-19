import React, { useState } from 'react';
import api from '../../../redux/action-creator';
import actions from '../../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';

import { DivCloseIcon } from '../../../utils/components/Div';
import useClickOutside from '../../../utils/functions/useClickOutside';

import sSection from '../../../styles/section.module.css';
import sButton from '../../../styles/button.module.css';
import { Input, TextArea } from '../../../utils/components/Input';

export default function Modify() {

    const { BUTTONMODIFYPROJECT } = actions;
    const { DASHBOARD, USER } = api
    const dispatch = useDispatch()
    const { dashboardToModify } = useSelector(state => state.buttonModifyProject)
    const user = useSelector(state => state.user)
    const index = user.dashboards.findIndex(el => el.id === dashboardToModify.id)
    const [state, setState] = useState({
        title: dashboardToModify.title,
        description: dashboardToModify.description,
        uuid: dashboardToModify.uuid,
        idUser: user.id
    })

    const onHandleClose = () => {
        dispatch({ type: BUTTONMODIFYPROJECT, payload: false })
    }
    const onHandleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const onHandleSaveChange = () => {
        if (!state.title) {
            return alert('Project need a title')
        }
        user.dashboards[index].title = state.title
        user.dashboards[index].description = state.description
        dispatch(api.modifyDashboard(state))
        dispatch({ type: USER, payload: user })
        dispatch({ type: BUTTONMODIFYPROJECT, payload: false })
    }
    const onHandleDelete = () => {
        const data = { uuid: dashboardToModify.uuid, idUser: user.id }
        if (user.dashboards.length > 1) {

            let position = user.dashboards.findIndex(el => el.uuid === dashboardToModify.uuid)
            dispatch(api.deleteDashboard(data))

            user.dashboards.splice(position, 1)
            dispatch({ type: USER, payload: user })

            dispatch({ type: DASHBOARD, payload: user.dashboards[position === 0 ? position ++ : 0] })
            dispatch(api.getColumn(user.dashboards[position === 0 ? position : 0].uuid))
            return dispatch({ type: BUTTONMODIFYPROJECT, payload: false })
        } else {
            return alert("No puedes eliminar el ultimo proyecto")
        }
    }
    let domnNode = useClickOutside(() => {
        dispatch({ type: BUTTONMODIFYPROJECT, payload: false })
    })
    return (
        <section className={sSection.containerModifyTask}>
            <div className={sSection.containerTask} ref={domnNode}>
                <DivCloseIcon onClick={onHandleClose}/>
                <Input
                    placeholder={"Title"}
                    s={"inputModifyTask"}
                    onChangeText={onHandleChangeText}
                    name={"title"}
                    value={state.title}
                    autoFocus={true}
                />
                <TextArea
                    s={"textAreaModifyTask"}
                    placeholder={"Description..."}
                    value={state.description}
                    number={255}
                    onChangeText={onHandleChangeText}
                    name={"description"}
                />
                <div className={sSection.containerButtonModifyTask}>
                    <button
                        className={sButton.buttonGreen}
                        onClick={() => onHandleSaveChange()}>Save Changes</button>
                    <button
                        className={sButton.buttonCloseActive}
                        onClick={() => onHandleDelete()}>Delete Proyect</button>
                </div>
            </div>
        </section>
    )
}