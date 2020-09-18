import React from 'react';
import { Checkbox, Text, Flex, useColorMode } from '@chakra-ui/core';
import PropTypes from 'prop-types';

export default function Todo({ todo, handleChange }) {
  const bgColor = { light: 'gray.50', dark: 'gray.700' }
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <li>
      <Flex
        h='auto'
        py='.5rem'
        px='.75rem'
        align='flex-start'
        mb='.25rem'
        bg={bgColor[colorMode]}
        shadow='sm'
        borderRadius='3px'
      >
        <Checkbox
          my='.25rem'
          size='lg'
          isChecked={todo.checked}
          onChange={() => handleChange(todo.id)}
          d='flex'

        >
        </Checkbox>
        <Text
          mb='.25rem'
          pl='.75rem'
          fontSize='1.2em'
          fontWeight='600'
          lineHeight='1.5rem'
          opacity={todo.checked ? '0.5' : '1'}
        >
          {todo.title}
        </Text>
      </Flex>
    </li>
  );
}

Todo.propTypes = {
  todo: PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    indent: PropTypes.number.isRequired,
    priority: PropTypes.number.isRequired,
  }),
  handleChange: PropTypes.func.isRequired,
}
