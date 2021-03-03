import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '../../../../../redux/action-creator';
import actions from '../../../../../redux/actions';
import { Button } from '../../../../../utils/components/Button';
import { H3 } from '../../../../../utils/components/Titles';

// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import sButton from '../../../../../styles/button.module.css';

export default function Actions({ task, index, indexTask }){

  const { COLUMN } = api;
  const { DISPLAYTASK } = actions;
  const column = useSelector(state => state.column)
  const dispatch = useDispatch()
  const onHandleDelete = () => {
    column[index].tasks.splice(indexTask, 1)
    dispatch({ type: COLUMN, payload: Object.values(column)})

    dispatch({ type: DISPLAYTASK, payload: false })
    dispatch(api.deleteTask(task))
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <H3
        s={"titleAddToCard"}
        title={"ACTIONS"}
      />
      <div>
        {/* <Button
          s={"buttonDisplayTaskAddToCard"}
          icon={<ArrowForwardIcon className={sButton.icon} />}
          label={"Move"}
        />
        <Button
          s={"buttonDisplayTaskAddToCard"}
          icon={<FileCopyOutlinedIcon className={sButton.icon} />}
          label={"Copy"}
        /> */}
        <Button
          s={"buttonDisplayTaskAddToCard"}
          icon={<DeleteOutlineOutlinedIcon className={sButton.icon} />}
          onClick={onHandleDelete}
          label={"Delete"}
        />
      </div>
    </div>
  )
}
