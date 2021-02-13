import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useClickOutside from '../../../../utils/functions/useClickOutside';
import actions from '../../../../redux/actions';
import { DivCloseIcon } from '../../../../utils/components/Div';
import { DivActivity, DivDescription, DivMembers, DivTitleColumn } from './displayTaskComponents/components';

import sSection from '../../../../styles/section.module.css';

export default function DisplayTaskModify(){

    const { task } = useSelector(state => state.displayTask);
    const column = useSelector(state => state.column)
    const columnSelected = column.filter(el => el.id === task.columnId)
    const { DISPLAYTASK } = actions
    const dispatch = useDispatch();

    const onHandleClose = () => {
        dispatch({ type: DISPLAYTASK, payload: false })
    }

    let domnNode = useClickOutside(() => {
        dispatch({ type: DISPLAYTASK, payload: false })
    })
    return (
        <div className={sSection.containerModifyTask}>
            <div className={sSection.containerDisplayTask} ref={domnNode}>
                <DivCloseIcon onClick={onHandleClose}/>
                <DivTitleColumn task={task} column={columnSelected[0]}/>
                <DivMembers/>
                <DivDescription description={task.description}/>
                <DivActivity/>
            </div>
        </div>
    )
}