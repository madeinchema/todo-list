import React, { useContext } from 'react';
import { Link, PseudoBox, Icon } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import { TodoContext } from '../context/TodoContext';

export default function TodoActions({ todo }) {
  const { setTodos } = useContext(TodoContext);

  // Removes the clicked to-do
  const removeTodo = (id) => {
    setTodos(prevState => prevState.filter(todo => todo.id !== id));
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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    indent: PropTypes.number.isRequired,
    priority: PropTypes.number.isRequired,
  }),
  setTodos: PropTypes.func.isRequired,
}
