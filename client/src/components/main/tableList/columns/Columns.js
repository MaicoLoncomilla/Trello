import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../redux/action-creator';
import sContainer from '../../../../styles/container.module.css';
import sButton from '../../../../styles/button.module.css';
import sForm from '../../../../styles/form.module.css';
import sInput from '../../../../styles/input.module.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

export default function Columns({ title, description, id, task }){

    const [ activeInput, setActiveInput ] = useState(false)
    const column = useSelector(state => state.column)
    const user = useSelector(state => state.user)
    const [ state, setState ] = useState({
        title: "",
        id: column[id].id,
        idDashboard: column[id].dashboardId
    })
    const dispatch = useDispatch()

    const onHandleInputAddTask = (e) => {

        e.preventDefault()
        if(!state.title){
            return alert('You need a title')
        }
        dispatch(api.newTask(state))
        setActiveInput(!activeInput)
    }
    const onHandleChangeActiveInput = () => {
        setActiveInput(!activeInput)
    }
    const onChangeText = (name, value) => {
        setState({...state, [name]: value})
    }
    return (
        <div className={sContainer.containerColumns}>
            <div className={sContainer.containerTitleVertIcon}>
                {/* cambiar a boton para cambiar titulo */}
                <p>{title}</p>
                <MoreVertIcon/>
            </div>
            <div className={sContainer.containerTask}>
                {task?.map((el, index) =>
                    <div key={index} className={sContainer.containerTaskBody}>
                        <p>{el.title}</p>
                    </div>
                )}
            </div>
            {activeInput ?
                <form 
                    onSubmit={(e) => onHandleInputAddTask(e)}
                    className={sForm.formAddTask}>
                    <textarea
                        autoFocus={true}
                        maxLength={255}
                        className={sInput.textareaAddTask}
                        placeholder="Enter a title for this card..."
                        onChange={(e) => onChangeText("title", e.target.value)}
                    />
                    <div>
                        <button
                            className={sButton.buttonSubmitAddTask}
                            type="submit">Add Card</button>
                        <CloseIcon
                            className={sButton.buttonIconClose}
                            onClick={() => onHandleChangeActiveInput()}
                        />
                    </div>
                </form>
                :
                <button
                    className={sButton.buttonAddAnotherTask}
                    onClick={() => onHandleChangeActiveInput()}
                >
                    <AddIcon />
                    {task.length > 1 ? ' Add another card' : ' Add a card'}
                </button>
            }

        </div>
    )
}