import React, { useState, useContext, useRef, useEffect } from 'react'
import {
  Button,
  Input,
  InputRightElement,
  InputGroup,
  Flex,
} from '@chakra-ui/react'
import { TasksContext } from '../../../../contexts/TasksContext'
import NewTaskPriorityMenu from './components/NewTaskPriorityMenu'

export default function NewTask() {
  const { dispatch } = useContext(TasksContext)
  const [inputTitle, setInputTitle] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState(4)
  const inputTitleRef = useRef()
  const inputBtnRef = useRef()

  useEffect(() => {
    const handleInputFocus = () => {
      setTimeout(() => {
        if (inputTitle) {
          inputBtnRef.current.focus()
        } else {
          inputTitleRef.current.focus()
        }
      }, 1)
    }
    handleInputFocus()
  }, [newTaskPriority])

  const updateNewTaskTitle = event => {
    setInputTitle(event.target.value)
  }

  const submitNewTask = event => {
    event.preventDefault()
    const title = inputTitle.trim().toString() // Remove whitespace from both ends & make sure it's a string
    dispatch({
      type: 'ADD_TASK',
      title,
      priority: newTaskPriority,
      columnId: 'to-do',
    })
    setInputTitle('')
    inputTitleRef.current.focus()
  }

  const updateNewTaskPriority = priority => {
    setNewTaskPriority(priority)
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
