import React from 'react';
import { useSelector } from 'react-redux';

import DisplayTaskModify from './tableList/task/DisplayTaskModify';
import TableList from './tableList/TableList';
import Spinner from '../loading/Spinner';

import sContainer from '../../styles/container.module.css';
import AddMembers from './tableList/components/AddMembers';
import ChangeBoards from './changeboards/ChangeBoards';
import FormNewColumn from './tableList/FormNewColumn';

export default function Main() {

    const { displayTaskActive } = useSelector(state => state.displayTask)
    const spinner = useSelector(state => state.spinner)

    return (
        <>
            {spinner && <Spinner />}
            <div className={sContainer.containerMain}>
                <div className={sContainer.containerMemberBoards}>
                    <AddMembers />
                    <ChangeBoards/>
                </div>
                <div className={sContainer.containerTableListBody}>
                    <TableList />
                    <FormNewColumn />
                </div>
            </div>
            {displayTaskActive && <DisplayTaskModify />}
        </>
    )
}