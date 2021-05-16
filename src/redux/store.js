import { configureStore } from '@reduxjs/toolkit'
import tasksDataReducer from './tasksData/tasksDataSlice'
import settingsReducer from './settings/settingsSlice'

export default configureStore({
  reducer: {
    tasksData: tasksDataReducer,
    settings: settingsReducer,
  },
})
