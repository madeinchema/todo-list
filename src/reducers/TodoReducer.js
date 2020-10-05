import { nanoid } from 'nanoid'

export const TodoReducer = (state, action) => {
  const currentColumn = 'column-1';  // Todo: Don't hardcode 'column-1'
  const column = state.columns[currentColumn];
  const newTaskIds = Array.from(column.taskIds);

  switch (action.type) {

    // Handle the drag and drop of to-do's
    case 'HANDLE_DRAG_END':
      console.log(action.result)
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

    // Adds the new to-do to the TodoList's state
    case 'ADD_TODO':
      const newTodo = {
        id: nanoid(5),
        title: action.title,
        checked: false,
        priority: 4,
      };
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [newTodo.id]: newTodo,
        },
        columns: {
          [currentColumn]: {
            ...state.columns[currentColumn],
            taskIds: [...state.columns[currentColumn].taskIds, newTodo.id],
          },
        },
      };

    // Removes the clicked to-do
    case 'REMOVE_TODO':
      // Remove current to-do from the taskIds
      newTaskIds.splice(action.index, 1);

      // Create object where the selected task is removed
      let newTasks = {};
      Object.entries(state.tasks).forEach(entry => {
        const [key, value] = entry;
        if (key !== action.todo.id) {
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

    // Handles to-dos editing and onCancel
    case 'EDIT_TODO':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.todo.id]: {
            ...state.tasks[action.todo.id],
            title: action.value,
          },
        },
      };

    // Retrieves the initial title and sets it back
    case 'CANCEL_TODO':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.todo.id]: {
            ...state.tasks[action.todo.id],
            title: action.prevTitle,
          },
        },
      };

    // Updates the state of a to-do's checkbox
    case 'HANDLE_CHECK':
      // Return newState where current to-do's "checked" property is toggled
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.todo.id]: {
            ...state.tasks[action.todo.id],
            checked: !state.tasks[action.todo.id].checked,
          },
        },
      };

    default:
      return state;
  }
};
