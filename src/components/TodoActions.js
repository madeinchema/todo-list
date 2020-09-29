import React, { useContext } from 'react';
import { Link, PseudoBox, Icon } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import { TodoContext } from '../contexts/TodoContext';

export default function TodoActions({ todo, index }) {
  const { todosData, setTodosData } = useContext(TodoContext);


  // Removes the clicked to-do
  const removeTodo = (id) => {
    let taskIdToRemove = '';
    const newTaskIds = todosData.columns['column-1'].taskIds.filter(taskId => {
      if (taskId === id) {
        taskIdToRemove = taskId;
        return false;
      }
      return true;
    });

    let newTasksObj = {
      ...todosData.tasks,
    }
    delete newTasksObj[taskIdToRemove];

    const newState = {
      ...todosData,
      columns: {
        'column-1': {
          ...todosData.columns['column-1'],
          taskIds: newTaskIds,
        }
      },
      tasks: newTasksObj,
    }

    setTodosData(newState);
  }

  return (
    <Link
      onClick={() => removeTodo(todo.id)}
    >
      <PseudoBox
        style={{ transition: 'all .1s ease-out' }}
        d='flex'
        opacity='0.35'
        _hover={{ opacity: "1" }}
      >
        <Icon
          alignSelf='center'
          aria-label="Remove to-do"
          name="delete"
          size='1rem'
        />
      </PseudoBox>
    </Link>
  );
}

TodoActions.propTypes = {
  todo: PropTypes.exact({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    indent: PropTypes.number,
    priority: PropTypes.number,
  }),
}
