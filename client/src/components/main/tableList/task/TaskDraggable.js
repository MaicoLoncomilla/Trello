import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

import actions from '../../../../redux/actions';
import Task from './Task';

import sContainer from '../../../../styles/container.module.css';

export default function TaskDraggable({ task }) {

  const { DISPLAYTASK } = actions;
  const dispatch = useDispatch()
  const onHandleButtonTask = (el) => {
    dispatch({
      type: DISPLAYTASK,
      payload: { displayTaskActive: true, task: el }
    })
  }
  return (
    <>
      {task?.map((el, index) =>
        <Draggable draggableId={String(el.uuid)} index={index} key={el.uuid} >
          {(provided => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              key={el.uuid}
              className={sContainer.containerTaskBody}
              onClick={() => onHandleButtonTask(el)}>
              <Task el={el} />
            </div>
          ))}
        </Draggable>
      )}
    </>
  )

}