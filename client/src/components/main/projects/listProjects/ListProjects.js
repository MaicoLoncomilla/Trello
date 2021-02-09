import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import api from '../../../../redux/action-creator';
import actions from '../../../../redux/actions';
import NewProject from '../newProject/NewProject';
import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build';

import sContainer from '../../../../styles/container.module.css';
import sButton from '../../../../styles/button.module.css';
import sText from '../../../../styles/text.module.css';
import Modify from '../../modifyTaskOrProject/Modify';

export default function ListProjects() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const buttonNewProject = useSelector(state => state.buttonNewProject)
    const { active } = useSelector(state => state.buttonModifyProject)
    const dashboard = useSelector(state => state.dashboard)
    const { BUTTONNEWPROJECT, BUTTONMODIFYPROJECT } = actions
    const { DASHBOARD } = api
    const onHandleNewProject = () => {
        dispatch({
            type: BUTTONNEWPROJECT,
            payload: true
        })
    }

    const ListProyect = (el) => {

        const onHandleDeleteProject = (id) => {
            const data = { id: id, idUser: user.id }
            if(user.dashboards.length > 1){
                dispatch(api.deleteDashboard(data))
                let position = 0;
                user.dashboards.map((el, index) => {
                    if(el.id === id){
                        position = index
                    }
                })
                if(position === 0){
                    dispatch({ type: DASHBOARD, payload: user.dashboards[++position] })
                    dispatch(api.getColumn(user.dashboards[position].id))
                }else{
                    dispatch({ type: DASHBOARD, payload: user.dashboards[0] })
                    dispatch(api.getColumn(user.dashboards[0].id))
                }
            }else {
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
    return (
        <>
            {!user.firstName && <Redirect to="/login" />}

            <div className={sContainer.containerListProject}>
                <div className={sContainer.container}>
                    <div className={sContainer.containerListAndNewProject}>
                        <p>List Projects</p>
                        <button
                            style={{ minWidth: 150 }}
                            className={sButton.buttonBlueColumn}
                            onClick={() => onHandleNewProject()}>New Project</button>
                    </div>
                    <div className={sContainer.containerListProjectMap}>
                        {user.dashboards?.map(el =>
                            ListProyect(el))}
                    </div>
                </div>
            </div>
            {buttonNewProject && <NewProject />}
            {active && <Modify />}
        </>
    )
}

