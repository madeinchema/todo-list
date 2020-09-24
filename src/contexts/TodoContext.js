import React, { useReducer, createContext, useEffect } from 'react';
import { TodoReducer } from '../reducers/TodoReducer';

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todos, dispatch] = useReducer(TodoReducer, [], () => {
    // Set todos state if there are todos saved in localStorage
    const localData = localStorage.getItem('todos');
    return localData && JSON.parse(localData);
  });

  // Update localStorage todos to match the current state
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      { props.children }
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
