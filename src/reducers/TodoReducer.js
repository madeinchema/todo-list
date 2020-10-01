import { nanoid } from 'nanoid'

export const TodoReducer = (state, action) => {
  // Todo: Don't hardcode 'column-1'
  const currentColumn = 'column-1';
  const column = state.columns[currentColumn];
  const newTaskIds = Array.from(column.taskIds);

  switch (action.type) {


    case 'HANDLE_DRAG': // TODO
      // console.log('action newState', action.newState)
      // return action.newState;
      return;

    // Adds the new to-do to the TodoList's state
    case 'ADD_TODO':
      const newTodo = {
        id: nanoid(5),
        title: action.title,
        checked: false,
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
