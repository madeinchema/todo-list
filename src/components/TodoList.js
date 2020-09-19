import React from 'react';
import { Box, Flex, List } from '@chakra-ui/core';
import Todo from './Todo';
import PropTypes from 'prop-types';

export default function TodoList({ todos, handleChange }) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="calc(100vh - 178px)"
      p='0 .5rem .5rem'
    >
      <Box
        className='custom-scroll'
        h='100%'
        w='100%'
        maxW='680px'
        overflow='auto'
        borderRadius='5px'
        p='.5rem'
      >
        <Flex
          id='todoList'
          flexDir='column'
        >
          <List mb='2rem'>
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
