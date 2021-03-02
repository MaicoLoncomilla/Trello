import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import api from '../../../../redux/action-creator';
import actions from '../../../../redux/actions';
import useClickOutside from '../../../../utils/functions/useClickOutside';

import sContainer from '../../../../styles/container.module.css';

import AddIcon from '@material-ui/icons/Add';
import Task from '../task/Task';
import TitleColumn from './components/TitleColumn';
import { ButtonComment } from '../../../../utils/components/Button';
import FormColumn from './components/FormColumn';

export default function Columns({ title, task, index, uuid }){

    const [ activeFormColumn, setActiveFormColumn ] = useState(false)
    const column = useSelector(state => state.column)
    const [ state, setState ] = useState({})
    const { COLUMN } = api
    const { DISPLAYTASK } = actions
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
        setState({...state, [name]: value})
    }
    const onHandleButtonTask = (el) => {
        dispatch({
            type: DISPLAYTASK,
            payload: { displayTaskActive: true, task: el }
        })
    }
    let domnNode = useClickOutside(() => {
        setActiveFormColumn(false)
    })

    return (
        <div className={sContainer.containerColumns} key={uuid}>
            <TitleColumn title={title} uuid={uuid} index={index} />
            <Droppable droppableId={`${String(index)} ${uuid}`}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className={sContainer.containerOverFlowTask}>
                        <div style={{ height: 5 }}></div>
                        {task?.map((el, index) =>
                            <Draggable draggableId={String(el.uuid)} index={index} key={el.uuid} >
                                {(provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={provided.draggableProps.style}
                                        key={el.uuid}
                                        className={sContainer.containerTaskBody}
                                        onClick={() => onHandleButtonTask(el)}>
                                        <Task el={el} />
                                    </div>
                                ))}
                            </Draggable>
                        )}
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
    )
}