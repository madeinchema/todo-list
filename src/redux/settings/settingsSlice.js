import { createSlice } from '@reduxjs/toolkit'

const defaultData = {
  moveCompletedToBottom: false,
  sort: 'MANUAL',
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
    toggleSettingMoveCompleteToBottom(state) {
      state.moveCompletedToBottom = !state.moveCompletedToBottom
    },
  },
})

export const { setTasksSort, toggleSettingMoveCompleteToBottom } =
  settingsSlice.actions

export default settingsSlice.reducer
