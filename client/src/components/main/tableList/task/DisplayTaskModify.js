import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useClickOutside from '../../../../utils/functions/useClickOutside';
import actions from '../../../../redux/actions';
import { DivCloseIconAbsolute } from '../../../../utils/components/Div';
import DivTitleColumn from './displayTaskComponents/DivTitleColumn';

import sSection from '../../../../styles/section.module.css';
import ContainerLeft from './displayTaskComponents/ContainerLeft';
import ContainerRight from './displayTaskComponents/ContainerRight';
import { ListCover, ListMembers } from './displayTaskComponents/components';
import DivImage from './displayTaskComponents/DivImage';

export default function DisplayTaskModify() {

    const { task } = useSelector(state => state.displayTask);
    const column = useSelector(state => state.column)
    const columnSelected = column.filter(el => el.uuid === task.columnUuid)
    const lista = useSelector(state => state.listAddToCard)
    const index = column.findIndex(el => el.uuid === columnSelected[0]?.uuid)
    const indexTask = column[index]?.tasks.findIndex(el => el.uuid === task.uuid)
    const { DISPLAYTASK } = actions
    const dispatch = useDispatch();

    const onHandleClose = () => {
        dispatch({ type: DISPLAYTASK, payload: false })
    }

    let domnNode = useClickOutside(() => {
        if(lista) return
        dispatch({ type: DISPLAYTASK, payload: false })
    })
    return (

        <div className={sSection.containerModifyTask}>
            <div className={sSection.containerDisplayTask} ref={domnNode}>
                <DivCloseIconAbsolute onClick={onHandleClose} />
                { column[index]?.tasks[indexTask]?.imageTask?.url && 
                <DivImage index={index} indexTask={indexTask} task={task}/>}
                <DivTitleColumn task={task} columnSelected={columnSelected[0]} index={index} indexTask={indexTask}/>
                <div style={{display: "flex"}}>
                    <ContainerLeft task={task} index={index} indexTask={indexTask}/>
                    <ContainerRight task={task} index={index} indexTask={indexTask}/>
                </div>
            </div>
            {lista.active === "Members" && <ListMembers position={lista.position} task={task}/>}
            {lista.active === "Cover" && <ListCover position={lista.position} task={task} index={index} indexTask={indexTask}/>}
        </div>

    )
}