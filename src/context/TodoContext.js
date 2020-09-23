import React, { useState, createContext } from 'react';

const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState([]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      { props.children }
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
