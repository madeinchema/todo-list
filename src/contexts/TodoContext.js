import React, { useReducer, useState, createContext, useEffect } from 'react';
// import { TodoReducer } from '../reducers/TodoReducer';
// import initialData from '../initial-data';

const TodoContext = createContext();

const initialData = {
  tasks: {},
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: [],
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1']
};

const TodoContextProvider = (props) => {
  const [todosData, setTodosData] = useState(initialData);

  // Initialize app checking and update todosData if it's set in localStorage
  useEffect(() => {
    if (localStorage.getItem('todos-v1') !== null) {
      setTodosData(JSON.parse(localStorage.getItem('todos-v1')));
    }
  }, [])

  // Update localStorage todos to match the current state
  useEffect(() => {
    localStorage.setItem('todos-v1', JSON.stringify(todosData));
  }, [todosData])

  return (
    <TodoContext.Provider value={{ todosData, setTodosData }}>
      { props.children }
    </TodoContext.Provider>
  );
};

export { TodoContextProvider, TodoContext };
