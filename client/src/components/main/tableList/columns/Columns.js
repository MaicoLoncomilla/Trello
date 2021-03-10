import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import api from '../../../../redux/action-creator';
import useClickOutside from '../../../../utils/functions/useClickOutside';

import sContainer from '../../../../styles/container.module.css';

import AddIcon from '@material-ui/icons/Add';
import TitleColumn from './components/TitleColumn';
import { ButtonComment } from '../../../../utils/components/Button';
import FormColumn from './components/FormColumn';
import TaskDraggable from '../task/TaskDraggable';

export default function Columns({ title, task, index, uuid }) {

    const [activeFormColumn, setActiveFormColumn] = useState(false)
    const column = useSelector(state => state.column)
    const [state, setState] = useState({})
    const { COLUMN } = api
    const dispatch = useDispatch()
    const onHandleInputAddTask = (e) => {
        e.preventDefault()

        if (!state.title) {
            return alert('You need a title')
        }

        let newState = {
            uuid: uuidv4(),
            title: state.title,
            columnUuid: uuid,
            comments: [],
            description: "",
            taskPriority: task.length
        }
        let taskArray = task
        taskArray.push(newState)

        dispatch({
            type: COLUMN,
            payload: Object.values({
                ...column,
                [index]: {
                    ...column[index],
                    tasks: taskArray,
                }
            })
        })
        dispatch(api.newTask(newState))
        setActiveFormColumn(!activeFormColumn)
        setState({ ...state, title: "" })
    }

    const onChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    let domnNode = useClickOutside(() => {
        setActiveFormColumn(false)
    })

    return (
        <Draggable draggableId={String(`${index} ${uuid}`)} index={index}>
            {provided => (
                <div
                    className={sContainer.containerColumns}
                    {...provided.draggableProps}
                    ref={provided.innerRef}>
                    <div className={sContainer.containerDraggable} {...provided.dragHandleProps}></div>
                    <TitleColumn
                        title={title}
                        uuid={uuid}
                        index={index}
                        key={uuid}
                    />
                    <Droppable droppableId={uuid} type="task">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={sContainer.containerOverFlowTask}
                            >
                                <div style={{ height: 5 }}></div>
                                <TaskDraggable task={task} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <div ref={domnNode}>
                        {activeFormColumn ?
                            <FormColumn
                                s={"formAddTask"}
                                state={state}
                                onChangeText={onChangeText}
                                onSubmit={onHandleInputAddTask}
                                setActiveFormColumn={setActiveFormColumn}
                                activeFormColumn={activeFormColumn}
                                placeholder={"Enter a title for this card..."}
                                label={"Add New Task"}
                            />
                            :
                            <ButtonComment
                                s={"buttonAddTask"}
                                icon={<AddIcon fontSize="small" />}
                                label={"Add New Task"}
                                el={!activeFormColumn}
                                onClick={setActiveFormColumn}
                            />
                        }
                    </div>
                </div>
            )}
        </Draggable>
    )
}