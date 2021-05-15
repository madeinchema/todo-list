const getSortedTasks = tasksToSort => {
  const sortedTasks = tasksToSort.sort((a, b) => a.checked > b)
  return sortedTasks
}

export default getSortedTasks
