import React, { useState, useRef } from 'react'
import {
  Button,
  Input,
  InputRightElement,
  InputGroup,
  Flex,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import NewTaskPriorityMenu from './components/NewTaskPriorityMenu'
import { addTask } from '../../../../redux/tasksData/tasksDataSlice'

export default function NewTask() {
  const [inputTitle, setInputTitle] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState(4)
  const inputTitleRef = useRef()
  const inputBtnRef = useRef()
  const dispatch = useDispatch()

  const updateNewTaskTitle = event => {
    setInputTitle(event.target.value)
  }

  const submitNewTask = event => {
    event.preventDefault()
    const title = inputTitle.trim().toString()

    dispatch(
      addTask({
        title,
        priority: newTaskPriority,
        columnId: 'to-do',
      })
    )
    setInputTitle('')
    inputTitleRef.current.focus()
  }

  const updateNewTaskPriority = priority => {
    setNewTaskPriority(priority)
    inputBtnRef.current.focus()
  }

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
          onChange={updateNewTaskTitle}
          ref={inputTitleRef}
        />

        <InputRightElement w="8rem" h="100%" p="0.25rem">
          <NewTaskPriorityMenu
            updateNewTaskPriority={updateNewTaskPriority}
            newTaskPriority={newTaskPriority}
          />

          <Button
            h="100%"
            w="75%"
            type="submit"
            onClick={submitNewTask}
            isDisabled={!inputTitle}
            ref={inputBtnRef}
          >
            Add Task
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  )
}
