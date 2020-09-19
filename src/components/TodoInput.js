import React from 'react';
import {
  Box,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  Flex,
} from '@chakra-ui/core';
import PropTypes from 'prop-types';

export default function TodoInput({ title, addTodo, handleTitle }) {
  // Adds the new to-do to the TodoList's state
  const handleSubmit = (event) => {
    event.preventDefault();
    let inputTitle = title;

    // Remove whitespace from both ends and make sure it's a string
    inputTitle = inputTitle.trim().toString();

    addTodo(todo(inputTitle));
  }

  // Generates random IDs for the to-dos
  const newId = () => {
    // todo pseudocode: while (newId is already in todoList) { keep generating }
    return Math.floor(Math.random() * 10000);
  }

  // To-do object template
  const todo = (title) => {
    return ({
      id: newId(),
      title: title,
      checked: false,
      indent: 1,
      priority: 4,
    })
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
                value={title}
                onChange={handleTitle}
              />

              <InputRightElement w="7.5rem" h='100%' p='0.25rem'>
                <Button
                  h='100%'
                  w="100%"
                  type='submit'
                  onClick={handleSubmit}
                  isDisabled={!title}
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

TodoInput.propTypes = {
  title: PropTypes.string.isRequired,
  addTodo: PropTypes.func.isRequired,
  handleTitle: PropTypes.func.isRequired,
}
