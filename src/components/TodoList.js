import React from 'react';
import { Box, Flex, List, useColorMode } from '@chakra-ui/core';
import Todo from './Todo';
import PropTypes from 'prop-types';

export default function TodoList({ todos, handleChange }) {
  // const bgColor = { light: 'gray.100', dark: 'gray.800' }
  const borderColor = { light: 'gray.200', dark: 'gray.700' }
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="calc(100vh - 172px)"
      p='0 1.5rem 1.5rem 1.5rem'
    >
      <Box
        className='custom-scroll'
        h='100%'
        w='100%'
        maxW='680px'
        // p='24px'
        // bg={bgColor[colorMode]}
        // shadow='md'
        overflow='auto'
        borderRadius='5px'
        p='.5rem'
        // borderWidth='1px'
        // borderColor={borderColor[colorMode]}
      >
        <Flex
          id='todoList'
          flexDir='column'

        >

          <List mb='2rem'         >
            {todos.map(todo => (
              <Todo  key={todo.id} todo={todo} handleChange={handleChange} />
            ))}
          </List>

        </Flex>
      </Box>
    </Flex>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    indent: PropTypes.number.isRequired,
    priority: PropTypes.number.isRequired,
  })),
  handleChange: PropTypes.func.isRequired,
}
