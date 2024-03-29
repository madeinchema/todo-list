import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { MdMoreVert, MdFlag, BiDuplicate } from 'react-icons/all'
import { DeleteIcon, Icon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/toast'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/menu'
import { useDispatch } from 'react-redux'
import {
  removeTask,
  duplicateTask,
  undoDeleteTask,
  changeTaskPriority,
} from '../../../redux/tasksData/tasksDataSlice'

export default function TaskItemMenu({ task, index, columnId }) {
  const toast = useToast()
  const toastRef = useRef()
  const dispatch = useDispatch()

  const handleRemoveTask = () => {
    dispatch(
      removeTask({
        taskId: task.id,
        index,
        columnId,
      })
    )
    toast({
      position: 'bottom-left',
      title: 'Task deleted',
      duration: 5000,
      isClosable: true,
      render: ({ onClose }) => (
        <Flex
          ref={toastRef}
          backgroundColor="red.600"
          m={3}
          py={3}
          px={5}
          justifyContent="space-between"
          alignContent="center"
          borderRadius={7}
        >
          <Text mr="1em" pt=".2rem" color="white">
            Task removed
          </Text>
          <Button
            onClick={() => handleUndoDeleteTask(onClose)}
            backgroundColor="rgba(255, 255, 255, .15)"
            color="white"
            variant="ghost"
            size="sm"
            _hover={{ bg: 'rgba(255, 255, 255, .25)' }}
            _active={{ bg: 'rgba(255, 255, 255, .5)' }}
          >
            Undo
          </Button>
        </Flex>
      ),
    })
  }

  // Adds back the deleted task
  const handleUndoDeleteTask = callback => {
    dispatch(
      undoDeleteTask({
        task,
        index,
        columnId,
      })
    )
    callback()
  }

  // Duplicates the task
  const handleDuplicateTask = () =>
    dispatch(
      duplicateTask({
        taskId: task.id,
        index,
        columnId,
      })
    )

  const handleChangeTaskPriority = priority =>
    dispatch(
      changeTaskPriority({
        taskId: task.id,
        index,
        priority,
        columnId,
      })
    )

  return (
    <Flex>
      <Menu placement="auto-end">
        <Box
          style={{ transition: 'all .1s ease-out' }}
          d="flex"
          opacity="0.5"
          _hover={{ opacity: '1' }}
        >
          <MenuButton aria-label="Open task menu">
            <Icon
              aria-label="Search database"
              as={MdMoreVert}
              boxSize="1.5rem"
            />
          </MenuButton>
        </Box>

        <MenuList zIndex={2}>
          <MenuItem onClick={handleRemoveTask}>
            <Icon
              aria-label="Remove Task"
              as={DeleteIcon}
              boxSize="1rem"
              mr=".6rem"
              opacity=".75"
              ml=".25rem"
            />
            Delete
          </MenuItem>
          <MenuItem onClick={handleDuplicateTask}>
            <Icon
              aria-label="Duplicate Task"
              as={BiDuplicate}
              boxSize="1.25rem"
              mr=".5rem"
              ml=".1rem"
              opacity=".75"
            />
            Duplicate
          </MenuItem>
          <MenuDivider />
          <MenuGroup title="Priority">
            <MenuItem onClick={() => handleChangeTaskPriority(1)}>
              <Icon
                aria-label="Priority 1"
                as={MdFlag}
                color="red.600"
                boxSize="1.4rem"
                mr=".5rem"
              />
              Priority 1
            </MenuItem>
            <MenuItem onClick={() => handleChangeTaskPriority(2)}>
              <Icon
                aria-label="Priority 2"
                as={MdFlag}
                color="yellow.500"
                boxSize="1.4rem"
                mr=".5rem"
              />
              Priority 2
            </MenuItem>
            <MenuItem onClick={() => handleChangeTaskPriority(3)}>
              <Icon
                aria-label="Priority 3"
                as={MdFlag}
                color="blue.400"
                boxSize="1.4rem"
                mr=".5rem"
              />
              Priority 3
            </MenuItem>
            <MenuItem onClick={() => handleChangeTaskPriority(4)}>
              <Icon
                aria-label="Priority 4"
                as={MdFlag}
                color="gray.500"
                boxSize="1.4rem"
                mr=".5rem"
              />
              Priority 4
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  )
}

TaskItemMenu.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    priority: PropTypes.number,
  }),
  columnId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}
