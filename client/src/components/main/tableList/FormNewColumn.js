import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import useClickOutside from '../../../utils/functions/useClickOutside';
import FormAddColumn from './formAddColumn/FormAddColumn';
import { Button } from '../../../utils/components/Button';
import { ToastTimer } from '../../../utils/alerts/Alert';
import api from '../../../redux/action-creator';

import AddIcon from '@material-ui/icons/Add';

export default function FormNewColumn() {
  const { COLUMN } = api;
  const [activeInput, setActiveInput] = useState(false)
  const column = useSelector(state => state.column)
  const user = useSelector(state => state.user)
  const dashboard = useSelector(state => state.dashboard)    
  const [state, setState] = useState({
    title: ""
  })
  const dispatch = useDispatch()
  const onChangeText = (name, value) => {
    setState({ ...state, [name]: value })
  }
  const onHandleSubmit = (e) => {
    e.preventDefault()
    if (!state.title) {
      setActiveInput(false)
      setState({ title: ""})
      return ToastTimer.fire('Deny!',
      "The list should have a title",
      "info")
    }
    const newColumn = {
      title: state.title,
      uuid: uuidv4(),
      dashboardUuid: dashboard ? dashboard.uuid : user.dashboards[0].uuid,
      tasks: [],
      columnPriority: column.length
    }
    dispatch({
      type: COLUMN,
      payload: Object.values({
        ...column,
        [newColumn.id]: newColumn
      })
    })

    dispatch(api.newColumn(newColumn))
    setState({})
    onHandleInputAddTask()
  }
  const onHandleInputAddTask = () => {
    setActiveInput(!activeInput)
  }

  let domnNode = useClickOutside(() => {
    setActiveInput(false)
    setState({ title: ""})
  })
  return (
    <div ref={domnNode} style={{height: "max-content"}}>
      {activeInput ?
        <FormAddColumn
          onSubmit={onHandleSubmit}
          onChangeText={onChangeText}
          state={state}
          addTask={onHandleInputAddTask}
        />
        :
        <Button
          style={{ marginRight: 20 }}
          s={"buttonBlueColumn"}
          onClick={onHandleInputAddTask}
          icon={<AddIcon fontSize="small" />}
          label={"Add another List"}
        />
      }
    </div>
  )
}