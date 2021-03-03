import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../redux/actions';
import api from '../../../redux/action-creator';

import NewProject from './newProject/NewProject';
import List from './list/List';
import { Button } from '../../../utils/components/Button';

import sContainer from '../../../styles/container.module.css';
import Modify from './modifyProject/Modify';

export default function ListProjects() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const dashboard = useSelector(state => state.dashboard)
    const buttonNewProject = useSelector(state => state.buttonNewProject)
    const { active } = useSelector(state => state.buttonModifyProject)
    const { BUTTONNEWPROJECT } = actions
    const { DASHBOARD } = api
    const onHandleNewProject = () => {
        dispatch({
            type: BUTTONNEWPROJECT,
            payload: true
        })
    }

    useEffect(() => {
        if (user.id) {
            let id = dashboard ? dashboard.uuid : user.dashboards[0].uuid
            dispatch(api.getColumn(id))
            if (!dashboard) {
                dispatch({ type: DASHBOARD, payload: user.dashboards[0] })
            }
        }
    }, [dispatch, user, DASHBOARD, dashboard])

    return (
        <>
            <div className={sContainer.containerListProject}>
                <div className={sContainer.container}>
                    <div className={sContainer.containerListAndNewProject}>
                        <p>Projects List</p>
                        <Button
                            s={"buttonBlueColumn"}
                            style={{ minWidth: 150 }}
                            onClick={onHandleNewProject}
                            label={"New Project"}
                        />
                    </div>
                    <div className={sContainer.containerListProjectMap}>
                        {user.dashboards?.map((el, index) =>
                            <List el={el} key={index} />)}
                    </div>
                </div>
            </div>
            {buttonNewProject && <NewProject />}
            {active && <Modify />}
        </>
    )
}

