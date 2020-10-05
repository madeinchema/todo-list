import React, { useReducer, createContext, useEffect } from 'react';
import { TodoReducer } from '../reducers/TodoReducer';

const TodoContext = createContext();

const initialData = {
  tasks: {
    // 'task-1': { id: 'task-1', title: 'Take out the garbage', checked: true, priority: 4 },
    // 'task-2': { id: 'task-2', title: 'Watch my favorite show', checked: false, priority: 3 },
    // 'task-3': { id: 'task-3', title: 'Charge my phone', checked: false, priority: 2 },
    // 'task-4': { id: 'task-4', title: 'Cook dinner', checked: false, priority: 1 },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: [
        // 'task-1', 'task-2', 'task-3', 'task-4'
      ],
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1']
};

const TodoContextProvider = (props) => {
  // Initialize state, check localStorage or use dummy data
  const [todosData, dispatch] = useReducer(TodoReducer, initialData, () => {
    if (
      localStorage.getItem('todos-v1') === 'null' ||
      localStorage.getItem('todos-v1') === 'undefined'
    ) {
      return initialData
    } else if (localStorage.getItem('todos-v1') !== null) {
      return JSON.parse(localStorage.getItem('todos-v1'));
    }
    return initialData
  });

  // Update localStorage todos to match the current state
  useEffect(() => {
    localStorage.setItem('todos-v1', JSON.stringify(todosData));
  }, [todosData])

  return (
    <TodoContext.Provider value={{ todosData, dispatch }}>
      { props.children }
    </TodoContext.Provider>
  );
};

export { TodoContextProvider, TodoContext };
