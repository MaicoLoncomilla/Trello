import React from 'react';

import { ButtonComment } from '../../../../../utils/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../../redux/action-creator';
import { url } from '../../../../../utils/url';

import sContainer from '../../../../../styles/container.module.css';
import sButton from '../../../../../styles/button.module.css';

import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';

export default function DivImage({ index, indexTask, task }){

  const column = useSelector(state => state.column)
  const { COLUMN } = api
  const dispatch = useDispatch()
  let image = column[index]?.tasks[indexTask]?.imageTask?.url && `${url}${column[index]?.tasks[indexTask]?.imageTask?.url}`
  let fileName = column[index]?.tasks[indexTask]?.imageTask?.fileName
  const onHandleRemoveCover = () => {
    column[index].tasks[indexTask].imageTask = {}
    dispatch({ type: COLUMN, payload: Object.values(column) })
    dispatch(api.removeCoverImage(task.uuid))
  }

  return (
    <div className={sContainer.containerDivImage}>
      <img src={image} alt={fileName} />
      <div className={sContainer.containerButtonAbsolute}>
        <ButtonComment
          s={"buttonDisplayTaskAddToCard"}
          icon={<PaymentOutlinedIcon className={sButton.icon} />}
          label={"Remove Cover"}
          onClick={onHandleRemoveCover}
        />
      </div>
    </div>
  )
}