import React, { useReducer, createContext, useEffect } from 'react';
import { TaskReducer } from '../reducers/TaskReducer';

const TasksContext = createContext();

const initialData = {
  tasks: {
    // 'task-1': { id: 'task-1', title: 'Take out the garbage', checked: true, priority: 1 },
    // 'task-2': { id: 'task-2', title: 'Watch my favorite show', checked: false, priority: 2 },
    // 'task-3': { id: 'task-3', title: 'Charge my phone', checked: false, priority: 3 },
    // 'task-4': { id: 'task-4', title: 'Cook dinner', checked: false, priority: 4 },
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

const TasksContextProvider = (props) => {
  // Initialize state, check localStorage or use dummy data
  const [tasksData, dispatch] = useReducer(TaskReducer, initialData, () => {
    if (
      localStorage.getItem('tasks-v1') === 'null' ||
      localStorage.getItem('tasks-v1') === 'undefined'
    ) {
      return initialData
    } else if (localStorage.getItem('tasks-v1') !== null) {
      return JSON.parse(localStorage.getItem('tasks-v1'));
    }
    return initialData
  });

  // Update localStorage to match the current state
  useEffect(() => {
    localStorage.setItem('tasks-v1', JSON.stringify(tasksData));
  }, [tasksData])

  return (
    <TasksContext.Provider value={{ tasksData: tasksData, dispatch }}>
      { props.children }
    </TasksContext.Provider>
  );
};

export { TasksContextProvider, TasksContext };