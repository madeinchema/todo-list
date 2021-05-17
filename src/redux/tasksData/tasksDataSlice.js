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
      const destinationExists = !!destination
      const isSameDestination =
        destination.droppableId === source.droppableId &&
        destination.index === source.index

      if (!isManualSort || !destinationExists || isSameDestination) return state

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
        state.tasks[payload.id] = payload
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
    removeTask(state, { payload }) {
      state.columns[payload.columnId].taskIds.splice(payload.index, 1)
      delete state.tasks[payload.taskId]
    },
    undoDeleteTask(state, { payload }) {
      state.columns[payload.columnId].taskIds.splice(
        payload.index,
        0,
        payload.task.id
      )
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
    editTaskTitle(state, { payload }) {
      state.tasks[payload.task.id].title = payload.value
    },
    changeTaskPriority(state, { payload }) {
      state.tasks[payload.task.id].priority = payload.priority
    },
    cancelEditTitleTask(state, { payload }) {
      state.tasks[payload.task.id].title = payload.prevTitle
    },
    toggleCheckTask(state, { payload }) {
      state.tasks[payload.task.id].checked =
        !state.tasks[payload.task.id].checked
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
