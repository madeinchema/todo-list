import React from 'react';
import { Link, PseudoBox, Icon } from '@chakra-ui/core';
import PropTypes from 'prop-types';

export default function TodoActions({ removeTodo }) {
  return (
    <Link
      onClick={removeTodo}
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
  removeTodo: PropTypes.func.isRequired,
}
