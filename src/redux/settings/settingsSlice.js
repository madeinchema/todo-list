import { createSlice } from '@reduxjs/toolkit'

const defaultData = {
  moveCompletedTasksToBottom: false,
  sort: 'MANUAL',
  filter: 'ALL',
}

const persistedState = localStorage.getItem('tasks-v1')
  ? JSON.parse(localStorage.getItem('tasks-v1')).settings
  : defaultData

// const persistedStore = loadState();
export const settingsSlice = createSlice({
  name: 'settings',
  initialState: persistedState,
  reducers: {
    setTasksSort: (state, { payload: { order } }) => {
      state.sort = order
    },
    setTasksFilter(state, { payload: { filter } }) {
      state.filter = filter
    },
    toggleMoveCompletedTasksToBottom(state) {
      state.moveCompletedTasksToBottom = !state.moveCompletedTasksToBottom
    },
  },
})

export const {
  setTasksSort,
  setTasksFilter,
  toggleMoveCompletedTasksToBottom,
} = settingsSlice.actions

export default settingsSlice.reducer
