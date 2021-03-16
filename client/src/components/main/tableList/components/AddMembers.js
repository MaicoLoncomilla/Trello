import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import UserAvatar from '../../../../utils/components/UserAvatar';
import { ToastTimer } from '../../../../utils/alerts/Alert';
import api from '../../../../redux/action-creator';
import actions from '../../../../redux/actions';
import AddIcon from '@material-ui/icons/Add';

import sContainer from '../../../../styles/container.module.css'

export default function AddMembers() {

  const user = useSelector(state => state.user)
  const { SPINNER } = actions
  const dashboard = useSelector(state => state.dashboard)
  const indexDashboard = user?.dashboards?.findIndex(el => el.uuid === dashboard.uuid)
  const dispatch = useDispatch()
  const onHandleAddMembers = async () => {
    const { value: email } = await Swal.fire({
      title: 'Invite To Board',
      input: 'email',
      inputPlaceholder: 'Email....',
      confirmButtonText: "Send Invitation"
    })
    if(email){
      let state = {
        email: email,
        idUser: user.id,
        uuid: dashboard.uuid
      }
      dispatch({ type: SPINNER, payload: true })
      dispatch(api.addMembers(state))
      ToastTimer.fire({
        icon: 'success',
        title: 'Invitation sent'
      })
    }
  }
  return (
    <div className={sContainer.containerFlexTableList}>
      <p>Members:</p>
      {user && user?.dashboards[indexDashboard]?.users?.map(el =>
        <UserAvatar size={32} image={el.image?.url} key={el.id} title={`${el.firstName} ${el.lastName}`} />
      )}
      <div className={sContainer.contaienerAddMembers} onClick={() => onHandleAddMembers()}>
        <AddIcon />
      </div>

    </div>
  )
}