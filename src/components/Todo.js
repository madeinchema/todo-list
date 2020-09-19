import React from 'react';
import { Checkbox, Text, Flex, useColorMode, Box } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import Hover from './Hover';
import TodoActions from './TodoActions';

export default function Todo({ todo, handleChange }) {
  const bgColor = { light: 'gray.50', dark: 'gray.800' }
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Hover>
      {(hovering) => (
          <li>
            <Flex
              h='auto'
              py='.5rem'
              px='.75rem'
              align='flex-start'
              mb='.25rem'
              bg={bgColor[colorMode]}
              shadow='md'
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
                mt='.05rem'
                pl='.75rem'
                fontSize='1.2em'
                fontWeight='600'
                lineHeight='1.5rem'
                opacity={todo.checked ? '0.5' : '1'}
              >
                {todo.title}
              </Text>
              <Box ml='auto' my='auto'>
                {hovering && <TodoActions />}
              </Box>
            </Flex>
          </li>
      )}
    </Hover>
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
