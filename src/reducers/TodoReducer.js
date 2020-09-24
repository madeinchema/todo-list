import { nanoid } from 'nanoid'

export const TodoReducer = (state, action) => {
  switch (action.type) {
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
      return state.map(todo => todo.id === action.todo.id
        ? { ...todo, checked: !todo.checked }
        : todo,
      );
    default:
      return state;
  }
};
