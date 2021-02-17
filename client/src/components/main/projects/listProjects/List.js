import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '../../../../redux/action-creator';
import actions from '../../../../redux/actions';

import sContainer from '../../../../styles/container.module.css';
import sButton from '../../../../styles/button.module.css';
import sText from '../../../../styles/text.module.css';

import BuildIcon from '@material-ui/icons/Build';

export default function List({ el }) {

    const dashboard = useSelector(state => state.dashboard)
    const dispatch = useDispatch()
    const { BUTTONMODIFYPROJECT } = actions
    const { DASHBOARD } = api

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
                    onClick={() => onHandleModifyProject(el)}><BuildIcon />
                </button>
            </div>
        </div>
    )

}