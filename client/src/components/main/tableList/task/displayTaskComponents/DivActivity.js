import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import useClickOutside from '../../../../../utils/functions/useClickOutside';
import api from '../../../../../redux/action-creator';
import { TextArea } from '../../../../../utils/components/Input';
import { Comments } from './components';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { Avatar } from '@material-ui/core';

import sContainer from '../../../../../styles/container.module.css';
import sButton from '../../../../../styles/button.module.css';


export default function DivActivity({ task, index, indexTask }){

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const image = user.image && `${process.env.REACT_APP_API_URL}${user.image.url}`

    const { COLUMN } = api;
    const column = useSelector(state => state.column);

    const [ activeTextArea, setActiveTextArea ] = useState(false);
    const [ state, setState ] = useState({});

    const onChangeText = (name, value) => {
        setState({...state, [name]: value })
    } 
    let domnNode = useClickOutside(() => {
        setActiveTextArea(false)
    })

    const onHandleNewComment = () => {
        if(!state.comment) return;
        let newComment = {
            comment: state.comment,
            taskUuid: task.uuid,
            uuid: uuidv4()
        }

        column[index].tasks[indexTask].comments.push(newComment)
        dispatch({ type: COLUMN, payload: column })
        
        dispatch(api.createComment(newComment))
        setState({...state, comment: ""})
        setActiveTextArea(false)
    }
    return (
        <div className={sContainer.containerFlex}>
            <div className={sContainer.containerDescripcionIconH3}>
                <FormatListBulletedIcon/>
                <h3>Activity</h3>
            </div>
            <div className={sContainer.containerAddActivity}>
                <Avatar style={{ width: 32, height: 32 }} src={image}/>
                <div 
                className={ activeTextArea ? sContainer.containerNewCommentActive : sContainer.containerTextAreaNewComment} 
                onClick={() => setActiveTextArea(true)} 
                ref={domnNode}>
                    <TextArea
                        placeholder={"Write a comment..."}
                        s={"textAreaNewComment"}
                        name={'comment'}
                        onChangeText={onChangeText}
                        type={"text"}
                        status={activeTextArea ? false : true}
                        autoFocus={true}
                        number={500}
                        value={state.comment}
                    />
                    {activeTextArea &&
                        <div className={sContainer.containerNewComment}>
                            <button
                                onClick={() => onHandleNewComment()}
                                className={ state.comment ? sButton.buttonGreen : sButton.buttonCommentEmpty}
                                >
                                Save
                        </button>
                        </div>
                    }
                </div>
            </div>
            {task?.comments?.map((el, indexComment) => 
            <Comments el={el} key={indexComment} index={index} indexTask={indexTask}/>)}
        </div>
    )
}