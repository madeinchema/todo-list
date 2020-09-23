import React, { useState, createContext, useEffect } from 'react';

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState([]);

  // Set todos state if there are todos saved in localStorage
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('todos')) !== null) {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, [])

  // Update localStorage todos to match the current state
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      { props.children }
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
