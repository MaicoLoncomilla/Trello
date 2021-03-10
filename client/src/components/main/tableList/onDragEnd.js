const onDragEnd = (column, result, COLUMN, api, dispatch) => {
  const { destination, source, type } = result;
  if (!destination) return;
  if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return
  }

  if (type === 'column') {
      const newColumnOrder = column
      const [removed] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, removed)

      for (let i = 0; i < newColumnOrder.length; i++) {
          newColumnOrder[i].columnPriority = i + 1
      }
      dispatch({ type: COLUMN, payload: Object.values(newColumnOrder) })
      dispatch(api.reorderColumnPriority(newColumnOrder))
      return
  }
  if (source.droppableId !== destination.droppableId) {
      const indexSource = column.findIndex(el => el.uuid === source.droppableId)   
      const indexDestination = column.findIndex(el => el.uuid === destination.droppableId)   

      const sourceColumn = column[indexSource]
      const destinationColumn = column[indexDestination]

      const sourceTasks = [...sourceColumn.tasks]
      const destinationTasks = [...destinationColumn.tasks]

      const [removed] = sourceTasks.splice(source.index, 1);
      removed.columnUuid = column[indexDestination].uuid

      destinationTasks.splice(destination.index, 0, removed)

      if (column[indexSource].taskPriority !== destinationTasks[0].taskPriority) {
          destinationTasks.map((el, index) =>
              el.taskPriority = index + 1
          )
      }

      dispatch({
          type: COLUMN, payload: Object.values({
              ...column,
              [indexSource]: {
                  ...sourceColumn,
                  tasks: sourceTasks
              },
              [indexDestination]: {
                  ...destinationColumn,
                  tasks: destinationTasks
              }
          })
      })
      dispatch(api.reorderTaskInColumn(removed))

  } else {
      const indexColumn = column.findIndex(el => el.uuid === source.droppableId)
      const newColumn = column[indexColumn];
      const copiedTasks = [...newColumn.tasks]
      const [removed] = copiedTasks.splice(source.index, 1)
      copiedTasks.splice(destination.index, 0, removed)

      if (column[indexColumn].taskPriority !== copiedTasks[0].taskPriority) {
          copiedTasks.map((el, index) =>
              el.taskPriority = index + 1
          )
      }
      const data = {
          tasks: copiedTasks,
          dashboardUuid: column[0].dashboardUuid
      }
      dispatch({
          type: COLUMN, payload: Object.values({
              ...column,
              [indexColumn]: {
                  ...newColumn,
                  tasks: copiedTasks
              }
          })
      })
      dispatch(api.reorderTask(data))
  }
}

export default onDragEnd