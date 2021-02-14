import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import api from '../../../../redux/action-creator';
import actions from '../../../../redux/actions';

import sContainer from '../../../../styles/container.module.css';
import sButton from '../../../../styles/button.module.css';
import sForm from '../../../../styles/form.module.css';
import sInput from '../../../../styles/input.module.css';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Task from '../task/Task';
import TitleColumn from './components/TitleColumn';
import { TextArea } from '../../../../utils/components/Input';

export default function Columns({ title, id, task, dashboardId, index }){

    const [ activeFormColumn, setActiveFormColumn ] = useState(false)
    const column = useSelector(state => state .column)
    const [ state, setState ] = useState({
        title: "",
        id: column[index]?.id,
        idDashboard: column[index]?.dashboardId,
    })

    const { DISPLAYTASK } = actions
    const dispatch = useDispatch()

    const onHandleInputAddTask = (e) => {
        e.preventDefault()
        if(!state.title){
            return alert('You need a title')
        }
        dispatch(api.newTask(state))
        setState({...state, title: ""})
        setActiveFormColumn(!activeFormColumn)
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

    return (
        <div className={sContainer.containerColumns} key={id}>
            <Droppable droppableId={`${String(index)} ${id}`} key={id}>
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div className={sContainer.containerTitleVertIcon}>
                            <TitleColumn title={title} id={id} idDashboard={dashboardId} index={index} />
                        </div>
                        {task?.map((el, index) =>
                            <Draggable draggableId={String(el.id)} index={index} key={el.id}>
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

    )
}