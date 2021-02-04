import React from 'react';
import { useSelector } from 'react-redux';
import TableList from './tableList/TableList';
import sContainer from '../../styles/container.module.css'
import Modify from './modifyTaskOrProject/Modify';

export default function Main() {

    const { active } = useSelector(state => state.buttonTaskActive)
   
    return (
        <>
            <div className={sContainer.containerMain}>
                <TableList />
            </div>
            {active && <Modify />}
        </>
    )
}