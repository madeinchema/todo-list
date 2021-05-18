const moveCompletedTasksToBottom = (tasks, tasksIds) => {
  const sortedTasksIds = tasksIds.sort((firstTaskId, secondTaskId) => {
    if (!tasks[firstTaskId].checked && tasks[secondTaskId].checked) return -1
    if (tasks[firstTaskId].checked && tasks[secondTaskId].checked) return 0
    return 1
  })
  return sortedTasksIds
}

const getSortedTasksIds = (tasksIds, tasks, settings) => {
  const sortedTasksIds = tasksIds.sort((firstTaskId, secondTaskId) => {
    if (settings.sort === 'ASC_PRIORITY')
      return tasks[secondTaskId].priority - tasks[firstTaskId].priority
    if (settings.sort === 'DESC_PRIORITY')
      return tasks[firstTaskId].priority - tasks[secondTaskId].priority
    return 0
  })

  if (settings.moveCompletedTasksToBottom)
    return moveCompletedTasksToBottom(tasks, sortedTasksIds)

  return sortedTasksIds
}

const getFilteredTasksIds = (tasksIds, tasks, settings) =>
  tasksIds.filter(taskId => {
    if (settings.filter === 'TO_DO') return tasks[taskId].checked === false
    if (settings.filter === 'CHECKED') return tasks[taskId].checked === true
    return taskId
  })

const getPreparedTasksIds = (tasksIds, tasks, settings) => {
  const sortedTasksIds = getSortedTasksIds(tasksIds, tasks, settings)
  const filteredTasksIds = getFilteredTasksIds(sortedTasksIds, tasks, settings)
  return filteredTasksIds
}

export { getSortedTasksIds, getPreparedTasksIds }
export default getPreparedTasksIds
