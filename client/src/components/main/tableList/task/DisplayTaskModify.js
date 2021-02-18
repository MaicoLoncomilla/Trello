import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useClickOutside from '../../../../utils/functions/useClickOutside';
import actions from '../../../../redux/actions';
import { DivCloseIcon } from '../../../../utils/components/Div';
import { DivMembers } from './displayTaskComponents/components';
import DivTitleColumn from './displayTaskComponents/DivTitleColumn';
import DivDescription from './displayTaskComponents/DivDescription';
import DivActivity from './displayTaskComponents/DivActivity';

import sSection from '../../../../styles/section.module.css';

export default function DisplayTaskModify() {

    const { task } = useSelector(state => state.displayTask);
    const column = useSelector(state => state.column)
    const columnSelected = column.filter(el => el.id === task.columnId)
    const index = column.findIndex(el => el.id === columnSelected[0]?.id)
    const indexTask = column[index]?.tasks.findIndex(el => el.id === task.id)
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
                <DivCloseIcon onClick={onHandleClose} />
                <DivTitleColumn task={task} columnSelected={columnSelected[0]} index={index} indexTask={indexTask}/>
                <DivMembers />
                <DivDescription task={task} index={index} indexTask={indexTask}/>
                <DivActivity task={task} index={index} indexTask={indexTask}/>
            </div>
        </div>

    )
}