import React, { useState, useContext, useRef } from 'react';
import {
  Button,
  Input,
  InputRightElement,
  InputGroup,
  Flex,
} from '@chakra-ui/core';
import { TasksContext } from '../../../../contexts/TasksContext';
import NewTaskPriorityMenu from './components/NewTaskPriorityMenu';

export default function NewTask() {
  const { dispatch } = useContext(TasksContext);
  const [inputTitle, setInputTitle] = useState('');
  const [inputPriority, setInputPriority] = useState(4);
  const inputTitleRef = useRef();

  // Task title input value handler for controlled component
  const handleTitle = (event) => {
    setInputTitle(event.target.value);
  };

  // Adds the new task to the TaskList's state
  const handleSubmit = (event) => {
    event.preventDefault();
    let title = inputTitle.trim().toString(); // Remove whitespace from both ends & make sure it's a string
    dispatch({
      type: 'ADD_TASK',
      title,
      priority: inputPriority,
      columnId: 'to-do',
    });
    setInputTitle('');
    inputTitleRef.current.focus();
  };

  const handleInputPriority = (priority) => {
    setInputPriority(priority);
    inputTitleRef.current.focus();
  };

  return (
    <Flex
      flexDir="column"
      minH="100px"
      p="1rem"
      justify="center"
      w="100%"
      as="form"
    >
      <InputGroup size="md" shadow="md" borderRadius="5px">
        <Input
          h="3rem"
          pr="8rem"
          fontSize="1.2em"
          fontWeight="500"
          type="text"
          placeholder="Task title"
          value={inputTitle}
          onChange={handleTitle}
          ref={inputTitleRef}
        />

        <InputRightElement w="8rem" h="100%" p="0.25rem">
          <NewTaskPriorityMenu
            handleInputPriority={handleInputPriority}
            inputPriority={inputPriority}
          />

          <Button
            h="100%"
            w="75%"
            type="submit"
            onClick={handleSubmit}
            isDisabled={!inputTitle}
          >
            Add Task
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}
