import { createSlice, nanoid } from '@reduxjs/toolkit'

import initialTasksData from '../../utils/constants/initialTasksData'

const INITIAL_DATA_MODE = 'empty'

const persistedState = localStorage.getItem('tasks-v1')
  ? { ...JSON.parse(localStorage.getItem('tasks-v1')), settings: undefined }
  : initialTasksData[INITIAL_DATA_MODE]

export const tasksDataSlice = createSlice({
  name: 'tasksData',
  initialState: persistedState,
  reducers: {
    handleDragEnd(state, { payload }) {
      const { destination, source, draggableId } = payload.result
      const isManualSort = payload.settings.sort === 'MANUAL'
      const isMoveCompletedTasksToBottom =
        payload.settings.moveCompletedTasksToBottom
      const destinationExists = !!destination
      const isSameDestination =
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      const tasksQty = Object.keys(state.tasks).length
      const checkedTasksQty = state.columns[payload.columnId].taskIds.filter(
        taskId => state.tasks[taskId].checked
      ).length
      const isConflictWithMoveToBottomSetting =
        isMoveCompletedTasksToBottom &&
        tasksQty - checkedTasksQty >= destination.index

      if (
        !isManualSort ||
        !destinationExists ||
        isSameDestination ||
        isConflictWithMoveToBottomSetting
      )
        return state

      // Reorder; remove & add item from old to new index
      state.columns[source.droppableId].taskIds.splice(source.index, 1)
      state.columns[source.droppableId].taskIds.splice(
        destination.index,
        0,
        draggableId
      )
      return state
    },
    addTask: {
      reducer(state, { payload }) {
        state.tasks[payload.id] = { ...payload, columnId: undefined }
        state.columns[payload.columnId].taskIds.push(payload.id)
      },
      prepare: payload => ({
        payload: {
          ...payload,
          id: nanoid(5),
          checked: false,
        },
      }),
    },
    removeTask(state, { payload: { taskId, index, columnId } }) {
      state.columns[columnId].taskIds = state.columns[columnId].taskIds.filter(
        id => taskId !== id
      )
      delete state.tasks[taskId]
    },
    undoDeleteTask(state, { payload: { task, index } }) {
      state.tasks[task.id] = task
      state.columns[task.columnId].taskIds.splice(index, 0, task.id)
    },
    duplicateTask: {
      reducer(state, { payload: { taskId, index, columnId, newTaskId } }) {
        state.tasks[newTaskId] = { ...state.tasks[taskId], id: newTaskId }
        state.columns[columnId].taskIds.splice(index, 0, newTaskId)
      },
      prepare: payload => ({
        payload: {
          ...payload,
          newTaskId: nanoid(5),
        },
      }),
    },
    editTaskTitle(state, { payload: { taskId, value } }) {
      state.tasks[taskId].title = value
    },
    changeTaskPriority(state, { payload: { taskId, priority } }) {
      state.tasks[taskId].priority = priority
    },
    cancelEditTitleTask(state, { payload: { taskId, prevTitle } }) {
      state.tasks[taskId].title = prevTitle
    },
    toggleCheckTask(state, { payload: { taskId } }) {
      state.tasks[taskId].checked = !state.tasks[taskId].checked
    },
    deleteAllTasks: () => initialTasksData[INITIAL_DATA_MODE],
  },
})

export const {
  handleDragEnd,
  addTask,
  removeTask,
  undoDeleteTask,
  duplicateTask,
  editTaskTitle,
  changeTaskPriority,
  cancelEditTitleTask,
  toggleCheckTask,
  deleteAllTasks,
} = tasksDataSlice.actions

export default tasksDataSlice.reducer
