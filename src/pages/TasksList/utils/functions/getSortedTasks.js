const getSortedTasks = tasksToSort => {
  const sortedTasks = tasksToSort.sort((a, b) => a.checked > b)
  return sortedTasks
}

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

export { getSortedTasksIds }

export default getSortedTasks
