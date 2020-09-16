import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import Todo from './Todo';

export default function TodoList({ todos, handleChange }) {
  return (
    <Flex align="center" justify="center" h="calc(100vh - 168px)" direction="column">
      <Box className='custom-scroll' h='100%' w='100%' maxW='680px' px='32px' py='24px' bg='rgba(0,0,0,.1)'
           overflow='auto'>
        <Flex id='todoList' flexDir='column'>

          <ul>
            {todos.map(todo => (
              <Todo todo={todo} handleChange={handleChange} />
            ))}
          </ul>

        </Flex>
      </Box>
    </Flex>
  );
};
