import { nanoid } from 'nanoid'

export const TaskReducer = (state, action) => {
  let currentColumn;
  let column;
  let newTaskIds;
  let updatedTaskIds;
  let prevTask;
  if (action.columnId) {
    currentColumn = action.columnId && action.columnId;
    column = state.columns[currentColumn];
    newTaskIds = Array.from(column.taskIds);
  }

  switch (action.type) {

    // Handle the drag and drop of tasks
    case 'HANDLE_DRAG_END':
      const { destination, source, draggableId } = action.result;

      // Check if there is no destination
      if (!destination) return state;

      // Check to see if the location of the draggable changed
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) return state;

      /**
       * Reorder the taskIds, moving the target from old to new index in the array.
       */
      const columnSource = state.columns[source.droppableId]; // Get the column source
      newTaskIds.splice(source.index, 1); // Remove the item from the array
      newTaskIds.splice(destination.index, 0, draggableId); // Insert it in the destination

      // Create our new, updated column
      const newColumn = { ...columnSource, taskIds: newTaskIds }

      // Update the state with the next updated column
      return {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        }
      }

    // Adds the new task to the TaskList's state
    case 'ADD_TASK':
      const newTask = {
        id: nanoid(5),
        title: action.title,
        checked: false,
        priority: action.priority,
      };
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [newTask.id]: newTask,
        },
        columns: {
          [currentColumn]: {
            ...state.columns[currentColumn],
            taskIds: [...state.columns[currentColumn].taskIds, newTask.id],
          },
        },
      };

    // Removes the clicked task
    case 'REMOVE_TASK':
      // Remove current task from the taskIds
      newTaskIds.splice(action.index, 1);

      // Create object where the selected task is removed
      let newTasks = {};
      Object.entries(state.tasks).forEach(entry => {
        const [key, value] = entry;
        if (key !== action.task.id) {
          newTasks = { ...newTasks, [key]: value }
        }
      });

      // Update state without the selected taskId and task.
      return {
        ...state,
        columns: {
          [currentColumn]: {
            ...state.columns[currentColumn],
            taskIds: newTaskIds,
          },
        },
        tasks: newTasks,
      };

    // Adds back the deleted task
    case 'UNDO_DELETE_TASK':
      prevTask = { ...action.task }

      updatedTaskIds = [...state.columns[currentColumn].taskIds]
      updatedTaskIds.splice(action.index, 0, prevTask.id)

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [prevTask.id]: prevTask,
        },
        columns: {
          [currentColumn]: {
            ...state.columns[currentColumn],
            taskIds: updatedTaskIds,
          },
        },
      };

    // Adds the new task to the TaskList's state
    case 'DUPLICATE_TASK':
      prevTask = { ...action.task };
      prevTask.id = nanoid(5);

      updatedTaskIds = [...state.columns[currentColumn].taskIds]
      updatedTaskIds.splice(action.index, 0, prevTask.id)

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [prevTask.id]: prevTask,
        },
        columns: {
          [currentColumn]: {
            ...state.columns[currentColumn],
            taskIds: updatedTaskIds,
          },
        },
      };

    // Handles task editing and onCancel
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: {
            ...state.tasks[action.task.id],
            title: action.value,
          },
        },
      };

    // Handles task editing and onCancel
    case 'CHANGE_PRIORITY':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: {
            ...state.tasks[action.task.id],
            priority: action.priority,
          },
        },
      };

    // Retrieves the initial title and sets it back
    case 'CANCEL_TASK':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: {
            ...state.tasks[action.task.id],
            title: action.prevTitle,
          },
        },
      };

    // Updates the state of a task's checkbox
    case 'HANDLE_CHECK':
      // Return newState where current task's "checked" property is toggled
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: {
            ...state.tasks[action.task.id],
            checked: !state.tasks[action.task.id].checked,
          },
        },
      };

    // Sort the tasks from a column
    case 'SORT_TASKS':
      const sortedTasksList = newTaskIds.map(taskId => {
        return state.tasks[taskId];
      }).sort((a, b) => {
        if (action.order === 'SORT_HIGHEST') {
          return a.priority < b.priority ? -1 : (a.priority > b.priority ? 1 : 0);
        } else if (action.order === 'SORT_LOWEST') {
          return a.priority > b.priority ? -1 : (a.priority < b.priority ? 1 : 0);
        }
      }).map(task => task.id);

      return {
        ...state,
        columns: {
          [currentColumn]: {
            ...state.columns[currentColumn],
            taskIds: sortedTasksList,
          }
        }
      };

    // Deletes all the tasks
    case 'DELETE_ALL':
      // Remove all the tasks from taskIds & tasks obj.
      const newColumns = { ...state.columns };
      for (column in newColumns) {
        newColumns[column].taskIds = [];
      }

      return {
        ...state,
        columns: {
          ...newColumns,
        },
        tasks: {},
      };

    // Manages settings
    case 'HANDLE_SETTINGS':
      return {
        ...state,
        settings: {
          [action.setting]: !state.settings[action.setting],
        },
      };

    // Manages 'moveCompletedToBottom' persistent settings
    case 'MOVE_COMPLETED_TO_BOTTOM':
      const sortedTasks = Array.from(state.columns['to-do'].taskIds);

      // TODO: Fix the sort so it doesn't affect the non-checked ones
      if (state.settings.moveCompletedToBottom) {
        sortedTasks.sort(task => state.tasks[task].checked - !state.tasks[task].checked);
      }

      return {
        ...state,
        columns: {
          'to-do': {
            ...state.columns['to-do'],
            taskIds: sortedTasks,
          }
        }
      }

    default:
      return state;
  }
};
