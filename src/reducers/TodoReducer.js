import { nanoid } from 'nanoid'

export const TodoReducer = (state, action) => {
  console.log(action.todo.id);
  switch (action.type) {
    case 'HANDLE_DRAG':
      return action.newState;
    case 'ADD_TODO':
      return [...state, {
        id: nanoid(8),
        title: action.title,
        checked: false,
        indent: 1,
        priority: 4,
      }];
    case 'REMOVE_TODO':
      // Todo: Don't hardcode 'column-1'
      const column = state.columns['column-1'];
      // Remove selected task from the taskIds
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(action.todo.index, 1);
      // Create object where the selected task is removed
      let obj = {};
      Object.entries(state.tasks).forEach(entry => {
        const [key, value] = entry;
        if (key !== action.todo.id) {
          obj = { ...obj, [key]:value }
        }
      })
      // Update state without the selected taskId and task.
      return {
        ...state,
        columns: {
          'column-1': {
            ...state.columns['column-1'],
            taskIds: newTaskIds,
          }
        },
        tasks: obj,
      }
    case 'EDIT_TODO':
      return state.map(
        todo => todo.id === action.todo.id
          ? { ...todo, title: action.todo.title }
          : todo,
      );
    case 'HANDLE_CHECKBOX':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.todo.id]: {
            ...action.todo.todo,
            checked: !state.tasks[action.todo.id].checked
          },
        }
      }
    default:
      return state;
  }
};
