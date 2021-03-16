import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import useClickOutside from '../../../utils/functions/useClickOutside';
import { DivCloseIconAbsolute } from '../../../utils/components/Div';
import { ButtonComment } from '../../../utils/components/Button';
import { ToastTimer } from '../../../utils/alerts/Alert';
import { H3 } from '../../../utils/components/Titles';
import api from '../../../redux/action-creator';
import actions from '../../../redux/actions';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import sContainer from '../../../styles/container.module.css';

export default function SideBarBoards({ sideBar, setSideBar }) {

  const user = useSelector(state => state.user)
  const dashboard = useSelector(state => state.dashboard)
  const { DASHBOARD, USER } = api;
  const { SPINNER } = actions;
  const dispatch = useDispatch();

  let domnNode = useClickOutside(() => {
    setSideBar(!sideBar)
  })
  const onHandleClose = () => {
    setSideBar(false)
  }

  const onHandleSelectProject = (el) => {
    dispatch({ type: DASHBOARD, payload: el })
    dispatch({ type: SPINNER, payload: true })
    dispatch(api.getColumn(el.uuid))
    setSideBar(false)
  }

  const onHandleDelete = (el) => {

    if (user.dashboards.length > 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const data = { uuid: el.uuid, idUser: user.id }
          let position = user.dashboards.findIndex(board => board.uuid === el.uuid)
          dispatch(api.deleteDashboard(data))
          user.dashboards.splice(position, 1)
          dispatch({ type: USER, payload: user })
          dispatch({ type: DASHBOARD, payload: user.dashboards[position === 0 ? position++ : 0] })
          dispatch(api.getColumn(user.dashboards[position === 0 ? position : 0].uuid))
          ToastTimer.fire(
            'Deleted!',
            'Your board has been deleted.',
            'success'
          )
        }
      })
    } else {
      ToastTimer.fire(
        'Deny!',
        "you can't delete de last board",
        "warning"
      )
    }
  }

  return (
    <div ref={domnNode} className={sContainer.sideBarBoards}>
      <DivCloseIconAbsolute onClick={onHandleClose} />
      <H3 title={"Boards"} s={"titleBoards"} style={{ textAlign: "center" }} />
      <hr />
      <div className={sContainer.containerBoards}>
        {user.dashboards?.map(el => {
          let some = el.uuid === dashboard.uuid
          return <div
            key={el.uuid}
            className={some ? sContainer.containerMapBoardsUuid : sContainer.containerMapBoards}>
            <ButtonComment
              label={el.title}
              onClick={onHandleSelectProject}
              el={el}
              s={"buttonBoards"} />
            <HighlightOffIcon
              className={sContainer.iconDeleteBoard}
              onClick={() => onHandleDelete(el)}
            />
          </div>
        })}
      </div>
    </div>
  )
}