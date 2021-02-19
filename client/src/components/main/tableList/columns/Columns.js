import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

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

export default function Columns({ title, task, dashboardId, index, uuid }){

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
            columnId: uuid,
            comments: [],
            description: "",
            dashboardId: dashboardId, 
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
            <TitleColumn title={title} uuid={uuid} dashboardId={dashboardId} index={index} />
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