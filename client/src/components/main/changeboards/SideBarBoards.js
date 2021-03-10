import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useClickOutside from '../../../utils/functions/useClickOutside';
import api from '../../../redux/action-creator';
import actions from '../../../redux/actions';
import { DivCloseIconAbsolute } from '../../../utils/components/Div';
import { H3 } from '../../../utils/components/Titles';

import sContainer from '../../../styles/container.module.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { ButtonComment } from '../../../utils/components/Button';

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
    const data = { uuid: el.uuid, idUser: user.id }
    if (user.dashboards.length > 1) {
        let position = user.dashboards.findIndex(el2 => el2.uuid === el.uuid)
        dispatch(api.deleteDashboard(data))

        user.dashboards.splice(position, 1)
        dispatch({ type: USER, payload: user })

        dispatch({ type: DASHBOARD, payload: user.dashboards[position === 0 ? position ++ : 0] })
        dispatch(api.getColumn(user.dashboards[position === 0 ? position : 0].uuid))

        setSideBar(false)
        return 
    } else {
        return alert("No puedes eliminar el ultimo proyecto")
    }
}

  return (
    <div ref={domnNode} className={sContainer.sideBarBoards}>
      <DivCloseIconAbsolute onClick={onHandleClose} />
      <H3 title={"Boards"} s={"titleBoards"} style={{ textAlign: "center" }} />
      <hr/>
      <div className={sContainer.containerBoards}>
        {user.dashboards?.map(el => {
          let some = el.uuid === dashboard.uuid
          return <div
            key={el.uuid}
            className={some ? sContainer.containerMapBoardsUuid : sContainer.containerMapBoards}>
            <ButtonComment label={el.title} onClick={onHandleSelectProject} el={el} s={"buttonBoards"}/>
            <HighlightOffIcon className={sContainer.iconDeleteBoard} onClick={() => onHandleDelete(el)}/>
          </div>
        })}
      </div>
    </div>
  )
}