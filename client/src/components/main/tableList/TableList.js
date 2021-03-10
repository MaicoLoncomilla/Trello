import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import api from '../../../redux/action-creator';
import onDragEnd from './onDragEnd';
import Columns from './columns/Columns';

import sContainer from '../../../styles/container.module.css';

export default function TableList() {

    const { COLUMN, DASHBOARD } = api;
    const column = useSelector(state => state.column)
    const user = useSelector(state => state.user)
    const dashboard = useSelector(state => state.dashboard)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user.id) {
            let id = dashboard ? dashboard.uuid : user.dashboards[0].uuid
            dispatch(api.getColumn(id))
            if (!dashboard) {
                dispatch({ type: DASHBOARD, payload: user.dashboards[0] })
            }
        }
    }, [dispatch, user, DASHBOARD, dashboard])

    const dragEnd = (result) => {
        onDragEnd(column, result, COLUMN, api, dispatch)
    }

    return (
        <DragDropContext onDragEnd={result => dragEnd(result)}>
            <Droppable
                droppableId="all-columns"
                direction="horizontal"
                type="column">
                {(provided) => (
                    <div
                        className={sContainer.containerDroppable}
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {column?.map((el, index) =>
                            <Columns
                                key={index}
                                uuid={el.uuid}
                                index={index}
                                title={el.title}
                                task={el.tasks?.sort((a, b) => a.taskPriority - b.taskPriority)}
                            />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}