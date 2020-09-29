import React, { useReducer, useState, createContext, useEffect } from 'react';
// import { TodoReducer } from '../reducers/TodoReducer';
import initialData from '../initial-data';

const TodoContext = createContext();

const TodoContextProvider = (props) => {
  // const [todosData, dispatch] = useReducer(TodoReducer, {}, () => {
  const [todosData, setTodosData] = useState({ ...initialData
    // // Set todos state if there are todos saved in localStorage
    // const localData = localStorage.getItem('todos');
    // return localData !== null ? JSON.parse(localData) : { ...initialData };
    // return { ...initialData };
  });

  // Update localStorage todos to match the current state
  useEffect(() => {
    console.log('useEffect in TodoContext. todosData:', todosData)
    // localStorage.setItem('todos', JSON.stringify(todosData));
  }, [todosData])

  return (
    <TodoContext.Provider value={{ todosData, setTodosData }}>
      { props.children }
    </TodoContext.Provider>
  );
};

export { TodoContextProvider, TodoContext };
