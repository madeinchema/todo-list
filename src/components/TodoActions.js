import React from 'react';
import { Link, PseudoBox, Icon } from '@chakra-ui/core';
import PropTypes from 'prop-types';

export default function TodoActions({ todo, setTodos }) {
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
