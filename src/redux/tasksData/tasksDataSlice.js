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
}

const persistedState = localStorage.getItem('tasks-v1')
  ? { ...JSON.parse(localStorage.getItem('tasks-v1')), settings: undefined }
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
      const { destination, source, draggableId } = payload.result
      const isManualSort = payload.settings.sort === 'MANUAL'
      const destinationExists = !!destination
      const isSameDestination =
        destination.droppableId === source.droppableId &&
        destination.index === source.index

      if (!isManualSort || !destinationExists || isSameDestination) return state

      // Reorder the taskIds, remove & add item from old to new index
      state.columns[source.droppableId].taskIds.splice(source.index, 1)
      state.columns[source.droppableId].taskIds.splice(
        destination.index,
        0,
        draggableId
      )
      return state
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
    removeTask(state, { payload }) {
      const column = state.columns[payload.columnId]
      const newTaskIds = Array.from(column.taskIds)

      // Remove current task from the taskIds
      newTaskIds.splice(payload.index, 1)

      // Create object where the selected task is removed
      let newTasks = {}
      Object.entries(state.tasks).forEach(entry => {
        const [key, value] = entry
        if (key !== payload.task.id) {
          newTasks = { ...newTasks, [key]: value }
        }
      })

      // Update state without the selected taskId and task.
      return {
        ...state,
        columns: {
          [payload.columnId]: {
            ...state.columns[payload.columnId],
            taskIds: newTaskIds,
          },
        },
        tasks: newTasks,
      }
    },
    undoDeleteTask(state, { payload }) {
      const prevTask = { ...payload.task }

      const updatedTaskIds = [...state.columns[payload.columnId].taskIds]
      updatedTaskIds.splice(payload.index, 0, prevTask.id)

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [prevTask.id]: prevTask,
        },
        columns: {
          [payload.columnId]: {
            ...state.columns[payload.columnId],
            taskIds: updatedTaskIds,
          },
        },
      }
    },
    duplicateTask(state, { payload: { task, index, columnId } }) {
      const prevTask = { ...task }
      prevTask.id = nanoid(5)

      const updatedTaskIds = [...state.columns[columnId].taskIds]
      updatedTaskIds.splice(index, 0, prevTask.id)

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [prevTask.id]: prevTask,
        },
        columns: {
          [columnId]: {
            ...state.columns[columnId],
            taskIds: updatedTaskIds,
          },
        },
      }
    },
    editTaskTitle: (state, { payload }) => ({
      ...state,
      tasks: {
        ...state.tasks,
        [payload.task.id]: {
          ...state.tasks[payload.task.id],
          title: payload.value,
        },
      },
    }),
    changeTaskPriority: (state, { payload }) => ({
      ...state,
      tasks: {
        ...state.tasks,
        [payload.task.id]: {
          ...state.tasks[payload.task.id],
          priority: payload.priority,
        },
      },
    }),
    cancelEditTitleTask: (state, { payload }) => ({
      ...state,
      tasks: {
        ...state.tasks,
        [payload.task.id]: {
          ...state.tasks[payload.task.id],
          title: payload.prevTitle,
        },
      },
    }),
    toggleCheckTask: (state, { payload }) => ({
      ...state,
      tasks: {
        ...state.tasks,
        [payload.task.id]: {
          ...state.tasks[payload.task.id],
          checked: !state.tasks[payload.task.id].checked,
        },
      },
    }),
    deleteAllTasks: state => ({
      ...state,
      columns: {
        ...defaultData.columns,
      },
      tasks: {},
    }),
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
