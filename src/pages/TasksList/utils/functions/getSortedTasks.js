const getSortedTasks = tasksToSort => {
  const sortedTasks = tasksToSort.sort((a, b) => a.checked > b)
  return sortedTasks
}

const getSortedTasksIds = (tasksIds, tasks, sortAttribute) => {
  return tasksIds.sort((firstTaskId, secondTaskId) => {
    if (sortAttribute === 'ASC_PRIORITY')
      return tasks[secondTaskId].priority - tasks[firstTaskId].priority
    if (sortAttribute === 'DESC_PRIORITY')
      return tasks[firstTaskId].priority - tasks[secondTaskId].priority
    return 0
  })
}

export { getSortedTasksIds }

export default getSortedTasks
