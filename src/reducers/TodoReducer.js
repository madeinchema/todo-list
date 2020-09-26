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
      return state.filter(todo => todo.id !== action.todo.id);
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
