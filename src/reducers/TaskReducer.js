import { nanoid } from 'nanoid'

export const TaskReducer = (state, action) => {
  const currentColumn = 'column-1';  // Task: Don't hardcode 'column-1'
  const column = state.columns[currentColumn];
  const newTaskIds = Array.from(column.taskIds);
  let updatedTaskIds;
  let prevTask;

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
      const column = state.columns[source.droppableId]; // Get the column source
      newTaskIds.splice(source.index, 1); // Remove the item from the array
      newTaskIds.splice(destination.index, 0, draggableId); // Insert it in the destination

      // Create our new, updated column
      const newColumn = { ...column, taskIds: newTaskIds }

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

    default:
      return state;
  }
};
