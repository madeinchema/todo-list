const getFilteredTasks = (tasksToFilter, filter) => {
  const isFilterAll = filter === 'All'
  const isFilterToDo = filter === 'To do'
  const isFilterCompleted = filter === 'Completed'

  return tasksToFilter.filter(task => {
    if (isFilterToDo) {
      return !task.checked
    }
    if (isFilterCompleted) {
      return task.checked
    }
    if (isFilterAll) {
      return task
    }
    return task
  })
}

export default getFilteredTasks
