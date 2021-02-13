import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '../../../../redux/action-creator';
import actions from '../../../../redux/actions';

import sContainer from '../../../../styles/container.module.css';
import sButton from '../../../../styles/button.module.css';
import sText from '../../../../styles/text.module.css';

import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build';

export default function List({ el }) {

    const user = useSelector(state => state.user)
    const dashboard = useSelector(state => state.dashboard)
    const dispatch = useDispatch()
    const { BUTTONMODIFYPROJECT } = actions
    const { DASHBOARD } = api

    const onHandleDeleteProject = (id) => {
        const data = { id: id, idUser: user.id }
        if (user.dashboards.length > 1) {
            dispatch(api.deleteDashboard(data))
            let position = 0;
            user.dashboards.map((el, index) => {
                if (el.id === id) {
                    position = index
                }
            })
            if (position === 0) {
                dispatch({ type: DASHBOARD, payload: user.dashboards[++position] })
                dispatch(api.getColumn(user.dashboards[position].id))
            } else {
                dispatch({ type: DASHBOARD, payload: user.dashboards[0] })
                dispatch(api.getColumn(user.dashboards[0].id))
            }
        } else {
            return alert("No puedes eliminar el ultimo proyecto")
        }
    }
    const onHandleModifyProject = (el) => {
        dispatch({
            type: BUTTONMODIFYPROJECT,
            payload: { active: true, dashboardToModify: el }
        })
    }
    const onHandleSelectProject = (el) => {
        dispatch({ type: DASHBOARD, payload: el })
        dispatch(api.getColumn(el.id))
    }
    return (
        <div key={el.id} className={sContainer.listProjectMap}>
            <div>
                <p
                    className={dashboard.id === el.id ? sText.pSelected : sText.pNoSelected}
                >{el.title}</p>
                <button
                    className={dashboard.id === el.id ? sButton.buttonGreenSelected : sButton.buttonGreenNoSelected}
                    onClick={() => onHandleSelectProject(el)}>
                    {dashboard.id === el.id ? "Proyect Selected" : "Select this Project"}
                </button>
            </div>
            <div>
                <button
                    className={sButton.buttonGreenIcon}
                    onClick={() => onHandleModifyProject(el)}><BuildIcon /></button>
                <button
                    className={sButton.buttonCloseIcon}
                    onClick={() => onHandleDeleteProject(el.id)}><DeleteIcon /></button>
            </div>
        </div>
    )

}