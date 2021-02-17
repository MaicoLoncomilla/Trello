import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

import api from '../../../../redux/action-creator';
import actions from '../../../../redux/actions';
import useClickOutside from '../../../../utils/functions/useClickOutside';

import sContainer from '../../../../styles/container.module.css';
import sButton from '../../../../styles/button.module.css';
import sForm from '../../../../styles/form.module.css';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Task from '../task/Task';
import TitleColumn from './components/TitleColumn';
import { TextArea } from '../../../../utils/components/Input';

export default function Columns({ title, id, task, dashboardId, index }){

    const [ activeFormColumn, setActiveFormColumn ] = useState(false)
    const column = useSelector(state => state.column)
    const columnCopy = useSelector(state => state.columnCopy)
    const [ state, setState ] = useState({})
    const { COLUMN, COLUMNCOPY } = api
    const { DISPLAYTASK } = actions
    const dispatch = useDispatch()
    const onHandleInputAddTask = (e) => {
        e.preventDefault()
        
        if (!state.title) {
            return alert('You need a title')
        }
        let newState = {
            id: task.length ? task[task.length - 1].id + 1 : 1,
            title: state.title,
            columnId: column[index]?.id,
            comments: [],
            description: ""
        }
        let taskArray = column[index].tasks
        taskArray.push(newState)

        const data = {
            title: state.title,
            id: columnCopy[index]?.id,
            idDashboard: columnCopy[index]?.dashboardId,
        }
        if (task.length > 1) {
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
            dispatch(api.newTask(data))
        } else {
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
            axios.post(`${process.env.REACT_APP_API_URL}/task/`, data)
                .then(({ data }) => {
                    dispatch({
                        type: COLUMNCOPY,
                        payload: data
                    })
                    column[index].tasks[0].id = data[index].tasks[0].id
                    dispatch({ type: COLUMN, payload: column })
                })

        }
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
        <div className={sContainer.containerColumns} key={id}>
            <TitleColumn title={title} id={id} idDashboard={dashboardId} index={index} />
            <Droppable droppableId={`${String(index)} ${id}`} key={id} >
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className={sContainer.containerOverFlowTask}>
                        <div style={{ height: 5 }}></div>
                        {task?.map((el, index) =>
                            <Draggable draggableId={String(el.id)} index={index} key={el.id} >
                                {(provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={provided.draggableProps.style}
                                        key={el.id}
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
                    <form
                        onSubmit={(e) => onHandleInputAddTask(e)}
                        className={sForm.formAddTask}>
                        <TextArea
                            autoFocus={true}
                            number={500}
                            s={"textareaAddTask"}
                            placeholder={"Enter a title for this card..."}
                            name={"title"}
                            onChangeText={onChangeText}
                            value={state.title}
                        />
                        <div>
                            <button
                                className={sButton.buttonGreen}
                                type="submit">Add New Task</button>
                            <CloseIcon
                                className={sButton.buttonIcon}
                                onClick={() => setActiveFormColumn(!activeFormColumn)}
                            />
                        </div>
                    </form>
                    :
                    <button
                        className={sButton.buttonAddTask}
                        onClick={() => setActiveFormColumn(!activeFormColumn)}>
                        <AddIcon fontSize="small" />
                        Add New Task
                    </button>
                }
            </div>
        </div>
    )
}