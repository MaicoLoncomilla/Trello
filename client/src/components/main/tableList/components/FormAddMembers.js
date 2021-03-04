import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useClickOutside from '../../../../utils/functions/useClickOutside';
import actions from '../../../../redux/actions';
import api from '../../../../redux/action-creator';
import { H3 } from '../../../../utils/components/Titles';
import { Input } from '../../../../utils/components/Input';
import { Button } from '../../../../utils/components/Button';
import { DivCloseIcon } from '../../../../utils/components/Div';

import sSection from '../../../../styles/section.module.css';

export default function FormAddMembers(){
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const dashboard = useSelector(state => state.dashboard)
  const { ACTIVEFORMADDMEMBERS, SPINNER } = actions;
  const [ state, setState ] = useState({})

  const onChangeText = (name, value) => {
    setState({...state, [name]: value })
  }
  const onHandleSendInvitation = () => {
    if(!state.email) return
    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(state.email)) {
      return alert("Invalid Email")
    }
    let newState = {
      email: state.email,
      idUser: user.id,
      uuid: dashboard.uuid
    }
    dispatch(api.addMembers(newState))
    dispatch({ type: SPINNER, payload: true })
    dispatch({ type: ACTIVEFORMADDMEMBERS, payload: false })
  }
  const onHandleCloseForm = () => {
    dispatch({ type: ACTIVEFORMADDMEMBERS, payload: false })
  }
  let domnNode = useClickOutside(() => {
    dispatch({ type: ACTIVEFORMADDMEMBERS, payload: false })
  })
  return (
    <div className={sSection.containerModifyTask}>
      <div className={sSection.containerTask} ref={domnNode}>
        <DivCloseIcon onClick={onHandleCloseForm} />
        <H3 title={"Invite To Board"} s={"titleAddMembers"}/>
        <Input
          placeholder={"Email..."}
          name={"email"}
          onChangeText={onChangeText}
          number={100}
          type={"text"}
          autoFocus={true}
          s={"inputAddMembers"}
        />
        <Button
          label={"Send Invitation"}
          style={{ marginBottom: 20 }}
          s={ !state.email ? "buttonCommentEmpty" : "buttonGreen"}
          onClick={onHandleSendInvitation}
        />
      </div>
    </div>
  )
}