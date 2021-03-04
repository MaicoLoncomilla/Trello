import React from 'react';
import { useSelector } from 'react-redux';

import TableList from './tableList/TableList';
import Modify from './projects/modifyProject/Modify';
import DisplayTaskModify from './tableList/task/DisplayTaskModify';
import FormAddMembers from './tableList/components/FormAddMembers';
import Spinner from '../loading/Spinner';

import sContainer from '../../styles/container.module.css';

export default function Main() {

    const { active } = useSelector(state => state.buttonTaskActive)
    const { displayTaskActive } = useSelector(state => state.displayTask)
    const activeFormAddMembers = useSelector(state => state.activeFormAddMembers)
    const spinner = useSelector(state => state.spinner)
    return (
        <>
            {spinner && <Spinner /> }
            <div className={sContainer.containerMain}>
                <TableList />
            </div>
            {active && <Modify />}
            {displayTaskActive && <DisplayTaskModify/>}
            {activeFormAddMembers && <FormAddMembers/>}
        </>
    )
}