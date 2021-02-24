import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '../../../../../../redux/action-creator';
import { TextArea } from '../../../../../../utils/components/Input';

import NotesIcon from '@material-ui/icons/Notes';

import sContainer from '../../../../../../styles/container.module.css';

export default function DivDescription({ task, index, indexTask }) {
    
    const column = useSelector(state => state.column)
    const { COLUMN } = api
    const [ activeInput, setActiveInput ] = useState(false);
    const [ dispatchInput, setDispatchInput ] = useState(false);
    const dispatch = useDispatch()
    const [ state, setState ] = useState({
        title: task.title,
        description: task.description,
        uuid: task.uuid,
    })

    const onChangeText = (name, value) => {
        setState({...state, [name]: value })
    }

    let inputRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if(inputRef.current.contains(e.target)){
                setActiveInput(true)
                setDispatchInput(true)
            }
            if(!inputRef.current.contains(e.target)) {
                setActiveInput(false)
                if(dispatchInput) {
                    if(state.description !== task.description){
                        column[index].tasks[indexTask].description = state.description
                        dispatch({ type: COLUMN, payload: column })
                        dispatch(api.modifyTask(state))
                        setDispatchInput(false)
                    }
                }
            }
        } 
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    });

    return (
        <div className={sContainer.containerDescripcion}>
            <div className={sContainer.containerDescripcionIconH3}>
                <NotesIcon/>
                <h3>Description</h3>
            </div>
            <div ref={inputRef} style={{marginLeft: 40}}>
                <TextArea
                    placeholder={"Add a more detailed description..."}
                    number={5000}
                    value={state.description}
                    autoFocus={true}
                    status={activeInput ? false : true}
                    name={"description"}
                    onChangeText={onChangeText}
                    s={"textAreaModifyDescription"}
                />
            </div>
        </div>
    )
}