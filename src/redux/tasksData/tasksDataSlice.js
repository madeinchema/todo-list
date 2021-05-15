import { createSlice, nanoid } from '@reduxjs/toolkit'

const defaultData = {
  tasks: {
    // 'task-1': { id: 'task-1', title: 'Take out the garbage', checked: true, priority: 1 },
    // 'task-2': { id: 'task-2', title: 'Watch my favorite show', checked: false, priority: 2 },
    // 'task-3': { id: 'task-3', title: 'Charge my phone', checked: false, priority: 3 },
    // 'task-4': { id: 'task-4', title: 'Cook dinner', checked: false, priority: 4 },
  },
  columns: {
    'to-do': {
      id: 'to-do',
      title: 'To do',
      taskIds: [
        // 'task-1', 'task-2', 'task-3', 'task-4'
      ],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['to-do'],
  settings: {
    moveCompletedToBottom: false,
  },
}

const persistedState = localStorage.getItem('tasks-v1')
  ? JSON.parse(localStorage.getItem('tasks-v1'))
  : defaultData

// export const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem('state', serializedState);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem('state');
//     if (!serializedState) return defaultData;
//     return JSON.parse(serializedState);
//   } catch (err) {
//     saveState(defaultData);
//     return undefined;
//   }
// };

// const persistedStore = loadState();
export const tasksDataSlice = createSlice({
  name: 'tasksData',
  initialState: persistedState,
  reducers: {
    handleDragEnd(state, { payload }) {
      const column = state.columns[payload.columnId]
      const newTaskIds = Array.from(column.taskIds)
      const { destination, source, draggableId } = payload.result

      // Check if there is no destination
      if (!destination) return state

      // Check to see if the location of the draggable changed
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return state

      /**
       * Reorder the taskIds, moving the target from old to new index in the array.
       */
      const columnSource = state.columns[source.droppableId] // Get the column source
      newTaskIds.splice(source.index, 1) // Remove the item from the array
      newTaskIds.splice(destination.index, 0, draggableId) // Insert it in the destination

      // Create our new, updated column
      const newColumn = { ...columnSource, taskIds: newTaskIds }

      // Update the state with the next updated column
      return {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      }
    },
    addTask(state, { payload }) {
      const newTask = {
        id: nanoid(5),
        title: payload.title,
        checked: false,
        priority: payload.priority,
      }
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [newTask.id]: newTask,
        },
        columns: {
          [payload.columnId]: {
            ...state.columns[payload.columnId],
            taskIds: [...state.columns[payload.columnId].taskIds, newTask.id],
          },
        },
      }
    },
    moveCompletedToBottom() {},
  },
})

export const { handleDragEnd, moveCompletedToBottom, addTask } =
  tasksDataSlice.actions

export default tasksDataSlice.reducer
