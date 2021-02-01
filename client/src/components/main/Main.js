import React from 'react';
import { useSelector } from 'react-redux';
import NewProject from './projects/newProject/NewProject';
import ModifyTask from './tableList/columns/modifyTask/ModifyTask';
import TableList from './tableList/TableList';

export default function Main() {

    const { active } = useSelector(state => state.buttonTaskActive)
    const buttonNewProject = useSelector(state => state.buttonNewProject)

    return (
        <div>
            <TableList />
            {active && <ModifyTask />}
            {buttonNewProject && <NewProject/>}
        </div>
    )
}