import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../redux/action-creator';
import actions from '../../../../redux/actions';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import sContainer from '../../../../styles/container.module.css';
import sButton from '../../../../styles/button.module.css';
import sForm from '../../../../styles/form.module.css';
import sInput from '../../../../styles/input.module.css';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Task from '../task/Task';

export default function Columns({ title, id, task, dashboardId, index }){

    const [ activeInput, setActiveInput ] = useState(false)
    const [ changePToInput, setChangePToInput ] = useState(false)
    const [ activeVertIcon, setActiveVertIcon ] = useState(false)
    const column = useSelector(state => state.column)
    const [ titleColumn, setTitleColumn ] = useState({
        title: title,
        id: id,
        idDashboard: dashboardId
    })
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
        setActiveInput(!activeInput)
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

    const onHandleCloseContainerInputWithIcon = () => {
        setChangePToInput(!changePToInput)
        setTitleColumn({ ...titleColumn, title: title })
    }
    const onHandleActiveVertIcon = () => {
        setActiveVertIcon(!activeVertIcon)
        setChangePToInput(!changePToInput)
    }
    const onHandleDeleteColumn = () => {
        const data = {
            id: column[index].id,
            idDashboard: column[index].dashboardId
        }
        setActiveVertIcon(!activeVertIcon)
        dispatch(api.deleteColumn(data))
    }
    const containerPWithIcon = () => {
        return (
            <>
                <div className={sContainer.containerButtonP} onClick={() => setChangePToInput(!changePToInput)}>
                    <p>{title}</p>
                </div>
                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveVertIcon(!activeVertIcon)}>
                    <MoreVertIcon />
                </div>
                {activeVertIcon &&
                    <div className={sContainer.containerActiveVertIcon}>
                        <button
                            className={sButton.buttonVerticalIcons}
                            onClick={() => onHandleActiveVertIcon()}>Edit Column</button>
                        <button
                            className={sButton.buttonVerticalIcons}
                            onClick={() => onHandleDeleteColumn()}>Delete Column</button>
                    </div>}
            </>
        )
    }
    const containerInputWithIcon = () => {
        const onHandleModifyColumn = () => {
            setChangePToInput(!changePToInput)
            dispatch(api.modifyColumn(titleColumn))
        }
        return (
            <>
                <div className={sContainer.containerButtonP}>
                    <div
                        onClick={() => onHandleCloseContainerInputWithIcon()}
                        className={sButton.buttonClose}>
                        <CloseIcon
                        />
                    </div>
                    <input
                        autoFocus
                        value={titleColumn.title}
                        onChange={(e) => setTitleColumn({ ...titleColumn, title: e.target.value })}
                    />
                </div>
                <div
                    className={sButton.buttonModify}
                    onClick={() => onHandleModifyColumn()}>
                    <CheckIcon />
                </div>
            </>
        )
    }

    return (
        <div className={sContainer.containerColumns}  key={id}>
            <Droppable droppableId={`${String(index)} ${id}`} key={id}>
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div className={sContainer.containerTitleVertIcon}>
                            {changePToInput ? containerInputWithIcon()
                                : containerPWithIcon()}
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

            {activeInput ?
                <form
                    onSubmit={(e) => onHandleInputAddTask(e)}
                    className={sForm.formAddTask}>
                    <textarea
                        autoFocus
                        maxLength={50}
                        className={sInput.textareaAddTask}
                        placeholder="Enter a title for this card..."
                        onChange={(e) => onChangeText("title", e.target.value)}
                    />
                    <div>
                        <button
                            className={sButton.buttonGreen}
                            type="submit">Add New Task</button>
                        <CloseIcon
                            className={sButton.buttonIcon}
                            onClick={() => setActiveInput(!activeInput)}
                        />
                    </div>
                </form>
                :
                <button
                    className={sButton.buttonAddTask}
                    onClick={() => setActiveInput(!activeInput)}>
                    <AddIcon fontSize="small" />
                    Add New Task
                </button>
            }
        </div>

    )
}