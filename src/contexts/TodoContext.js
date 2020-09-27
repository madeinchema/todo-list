import React, { useReducer, createContext, useEffect } from 'react';
import { TodoReducer } from '../reducers/TodoReducer';
import initialData from '../initial-data';

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todosData, dispatch] = useReducer(TodoReducer, [], () => {
    // Set todos state if there are todos saved in localStorage
    const localData = localStorage.getItem('todos');
    return localData ? JSON.parse(localData) : initialData;
  });

  // Update localStorage todos to match the current state
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todosData));
  }, [todosData])

  return (
    <TodoContext.Provider value={{ todosData, dispatch }}>
      { props.children }
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
