import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../redux/action-creator';
import actions from '../../../../redux/actions';

export default function ModifyProject() {
    const { dashboardToModify } = useSelector(state => state.buttonModifyProject)
    const user = useSelector(state => state.user)
    const { BUTTONMODIFYPROJECT } = actions
    const [ state, setState ] = useState({
        title: dashboardToModify.title,
        description: dashboardToModify.description,
        id: dashboardToModify.id,
        idUser: user.id
    })

    const dispatch = useDispatch()
    const onChangeText = (name, value) => {
        setState({...state, [name]: value})
    }
    const onHandleCloseModifyProject = () => {
        dispatch({
            type: BUTTONMODIFYPROJECT,
            payload: false
        })
    }
    const onHandleModifyProject = () => {
        if(!state.title){
            return alert("This projects need a title")
        }
        dispatch(api.modifyDashboard(state))
        onHandleCloseModifyProject()
    }

    return (
        <div>
            <div>
                <button onClick={() => onHandleCloseModifyProject()}>X</button>
            </div>
            <input
                placeholder="Title"
                value={state.title}
                onChange={(e) => onChangeText("title", e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={state.description}
                onChange={(e) => onChangeText("description", e.target.value)}
            />
            <button onClick={() => onHandleModifyProject()}>Save Changes</button>
        </div>
    )
}