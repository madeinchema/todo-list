import React, { useReducer, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
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
    'to-do': {
      id: 'to-do',
      title: 'To do',
      taskIds: [
        // 'task-1', 'task-2', 'task-3', 'task-4'
      ],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['to-do'],
  settings: {
    moveCompletedToBottom: false,
  },
};

const setInitialLocalStorage = () => {
  const hasLocalStorageItems =
    localStorage.getItem('tasks-v1') !== null &&
    localStorage.getItem('tasks-v1') !== 'undefined';
  const getLocalStorageTasks = () =>
    JSON.parse(localStorage.getItem('tasks-v1'));
  return hasLocalStorageItems ? getLocalStorageTasks() : initialData;
};

const TasksContextProvider = ({ children }) => {
  const [tasksData, dispatch] = useReducer(
    TaskReducer,
    initialData,
    setInitialLocalStorage
  );

  useEffect(() => {
    const updateLocalStorageWithCurrentState = () => {
      localStorage.setItem('tasks-v1', JSON.stringify(tasksData));
    };
    updateLocalStorageWithCurrentState();
  }, [tasksData]);

  return (
    <TasksContext.Provider value={{ tasksData, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

TasksContextProvider.propTypes = {
  children: PropTypes.node,
};

TasksContextProvider.defaultProps = {
  children: undefined,
};

export { TasksContextProvider, TasksContext };
