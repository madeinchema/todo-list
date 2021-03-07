import { configureStore } from '@reduxjs/toolkit';
import tasksDataReducer from './tasksData/tasksDataSlice';

export default configureStore({
  reducer: {
    tasksData: tasksDataReducer,
  },
});
