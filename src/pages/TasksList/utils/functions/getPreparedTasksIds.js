const moveCompletedTasksToBottom = (tasks, tasksIds) =>
  tasksIds.sort(
    (firstTaskId, secondTaskId) =>
      tasks[firstTaskId].checked - tasks[secondTaskId].checked
  )

const getSortedTasksIds = (tasksIds, tasks, settings) => {
  const sortedTasks = tasksIds.sort((firstTaskId, secondTaskId) => {
    if (settings.sort === 'ASC_PRIORITY')
      return tasks[secondTaskId].priority - tasks[firstTaskId].priority
    if (settings.sort === 'DESC_PRIORITY')
      return tasks[firstTaskId].priority - tasks[secondTaskId].priority
    return 0
  })

  if (settings.moveCompletedTasksToBottom)
    return moveCompletedTasksToBottom(tasks, sortedTasks)

  return sortedTasks
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
