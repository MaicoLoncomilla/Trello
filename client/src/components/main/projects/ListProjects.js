import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../redux/actions';

import NewProject from './newProject/NewProject';
import List from './list/List';
import { Button } from '../../../utils/components/Button';

import sContainer from '../../../styles/container.module.css';
import Modify from './modifyProject/Modify';

export default function ListProjects() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const buttonNewProject = useSelector(state => state.buttonNewProject)
    const { active } = useSelector(state => state.buttonModifyProject)
    const { BUTTONNEWPROJECT } = actions
    const onHandleNewProject = () => {
        dispatch({
            type: BUTTONNEWPROJECT,
            payload: true
        })
    }

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

