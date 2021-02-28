import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import actions from '../../../../redux/actions';
import UserAvatar from '../../../../utils/components/UserAvatar';

import AddIcon from '@material-ui/icons/Add';

import sContainer from '../../../../styles/container.module.css'

export default function AddMembers(){

  const user = useSelector(state => state.user)
  const { ACTIVEFORMADDMEMBERS } = actions
  const dashboard = useSelector(state => state.dashboard)
  const indexDashboard = user?.dashboards?.findIndex(el => el.uuid === dashboard.uuid)
  const dispatch = useDispatch()

  const onHandleAddMembers = () => {
    dispatch({ type: ACTIVEFORMADDMEMBERS, payload: true })
  }

  return (
    <div className={sContainer.containerFlexTableList}>
      <p>Members:</p>
      {user && user?.dashboards[indexDashboard]?.users.map(el =>
        <UserAvatar size={32} image={el.image?.url} key={el.id} title={`${el.firstName} ${el.lastName}`}/>
      )}
      <div className={sContainer.contaienerAddMembers} onClick={() => onHandleAddMembers()}>
        <AddIcon />
      </div>
    </div>
  )
}