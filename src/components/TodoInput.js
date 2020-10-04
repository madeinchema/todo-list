import React, { useState, useContext, useRef } from 'react';
import {
  Box,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  Flex,
} from '@chakra-ui/core';
import { TodoContext } from '../contexts/TodoContext';

export default function TodoInput() {
  const { dispatch } = useContext(TodoContext);
  const [inputTitle, setInputTitle] = useState('');
  const inputTitleRef = useRef();

  // Task title input value handler for controlled component
  const handleTitle = (event) => {
    setInputTitle(event.target.value);
  }

  // Adds the new to-do to the TodoList's state
  const handleSubmit = (event) => {
    event.preventDefault();
    let title = inputTitle.trim().toString(); // Remove whitespace from both ends & make sure it's a string
    dispatch({ type: 'ADD_TODO', title });
    setInputTitle('');
    inputTitleRef.current.focus();
  }

  return (
    <Flex flexDir='column'>
      <Box minH='100px' p='1.75rem 1.5rem'>
        <Flex justifyContent='center'>

          <Box
            w='100%'
            maxW='680px'
            as='form'
          >
            <InputGroup
              size="md"
              shadow='md'
              borderRadius='5px'
            >

              <Input
                h='3rem'
                pr="7.5rem"
                fontSize='1.2em'
                fontWeight='500'
                type="text"
                placeholder="Task title"
                value={inputTitle}
                onChange={handleTitle}
                ref={inputTitleRef}
              />

              <InputRightElement w="7.5rem" h='100%' p='0.25rem'>
                <Button
                  h='100%'
                  w="100%"
                  type='submit'
                  onClick={handleSubmit}
                  isDisabled={!inputTitle}
                >
                  Add Task
                </Button>

              </InputRightElement>

            </InputGroup>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
