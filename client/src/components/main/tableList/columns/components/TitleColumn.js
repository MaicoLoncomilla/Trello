import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '../../../../../redux/action-creator';
import { TextArea } from '../../../../../utils/components/Input';
import useClickOutside from '../../../../../utils/functions/useClickOutside';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import sContainer from '../../../../../styles/container.module.css'
import sButton from '../../../../../styles/button.module.css'

export default function TitleColumn({ title, uuid, dashboardUuid, index }) {
    const [ activeInput, setActiveInput ] = useState(false);
    const [ dispatchInput, setDispatchInput ] = useState(false)
    const [ activeVertIcon, setActiveVertIcon ] = useState(false)
    const { COLUMN } = api
    const column = useSelector(state => state.column)
    const dispatch = useDispatch()
    const [ titleColumn, setTitleColumn ] = useState({
        title: title,
        uuid: uuid,
        dashboardUuid: dashboardUuid
    })
    const onChangeTextColumn = (name, value) => {
        setTitleColumn({ ...titleColumn, [name]: value })
    }
    const onHandleDeleteColumn = () => {
        const data = {
            uuid: uuid,
            dashboardUuid: dashboardUuid
        }
        dispatch({ type: COLUMN, payload: Object.values(column.filter(el => el.uuid !== uuid)) })
        setActiveVertIcon(!activeVertIcon)
        dispatch(api.deleteColumn(data))
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
                if(!titleColumn.title) return alert('Column Need a title')
                if(dispatchInput && title !== titleColumn.title) {
                    column[index].title = titleColumn.title
                    dispatch({ type: COLUMN, payload: Object.values(column)})
                    
                    dispatch(api.modifyColumn(titleColumn))
                    setDispatchInput(false)
                }

            }
        } 
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    });
    let domnNode = useClickOutside(() => {
        setActiveVertIcon(false)
    })

    return (
        < >
            <div className={sContainer.containerTitleVertIcon} ref={domnNode} key={uuid}>
                <div className={sContainer.containerTextarea} ref={inputRef}>
                    <TextArea
                        s={"textAreaAddColumn"}
                        placeholder={"Enter list title..."}
                        number={255}
                        value={titleColumn.title}
                        onChangeText={onChangeTextColumn}
                        type={"text"}
                        name={"title"}
                        autoFocus={true}
                        status={activeInput ? false : true}
                    />
                </div>
                <div
                    
                    style={{ cursor: "pointer", marginTop: 10 }}
                    onClick={() => setActiveVertIcon(!activeVertIcon)}>
                    <MoreVertIcon />
                </div>
                {activeVertIcon &&
                    <div className={sContainer.containerActiveVertIcon}>
                        <button
                            className={sButton.buttonVerticalIcons}
                            onClick={() => onHandleDeleteColumn()}>Delete Column
                        </button>
                    </div>}
            </div>

        </>
    )
}