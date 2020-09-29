import React, { useState, useContext } from 'react';
import { nanoid } from 'nanoid'
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
  const { setTodosData } = useContext(TodoContext);
  const [inputTitle, setInputTitle] = useState('');

  // Task title input value handler for controlled component
  const handleTitle = (event) => {
    setInputTitle(event.target.value);
  }

  // Adds the new to-do to the TodoList's state
  const handleSubmit = (event) => {
    event.preventDefault();
    let title = inputTitle;

    // Remove whitespace from both ends and make sure it's a string
    title = title.trim().toString();

    addTodo(newTodo(title));
  }

  // TODO Adds a new to-do object to the "todos" state
  const addTodo = (todo) => {
    const column = 'column-1';


    setTodosData((prevState) => {
      return {
        ...prevState,
        tasks: {
          ...prevState.tasks,
          [todo.id]: todo,
        },
        columns: {
          [column]: {
            ...prevState.columns[column],
            taskIds: [
              ...prevState.columns[column].taskIds, todo.id,
            ]
          }
        }
      }
    });
    setInputTitle('')
  }

  // To-do object template
  const newTodo = (title) => {
    const id = nanoid(5)
    return ({
      id,
      title: title,
      checked: false,
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
                value={inputTitle}
                onChange={handleTitle}
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
