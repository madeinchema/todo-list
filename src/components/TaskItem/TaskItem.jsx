import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import { DragHandleIcon, Icon } from '@chakra-ui/icons'
import { useColorMode } from '@chakra-ui/color-mode'
import { Box, Flex } from '@chakra-ui/layout'
import { Checkbox } from '@chakra-ui/checkbox'
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/editable'
import { useDispatch } from 'react-redux'
import {
  cancelEditTitleTask,
  toggleCheckTask,
  editTaskTitle,
} from '../../redux/tasksData/tasksDataSlice'
import useHover from '../../hooks/useHover'

import TaskItemMenu from './TaskItemMenu/TaskItemMenu'

const TaskItem = props => {
  const { task, index, droppableSnapshot, columnId } = props
  const [taskTitle, setTaskTitle] = useState('')
  const { colorMode } = useColorMode()
  const [hovering, attrs] = useHover()
  const dispatch = useDispatch()

  useEffect(() => {
    setTaskTitle(task.title)
  }, [task.title])

  // Handles tasks' editing and onCancel
  const handleEditTaskTitle = value =>
    dispatch(editTaskTitle({ task, value, columnId }))

  const handleCancelEditTitleTask = () =>
    dispatch(
      cancelEditTitleTask({
        type: 'CANCEL_TASK',
        task,
        prevTitle: taskTitle,
        columnId,
      })
    )

  const handleToggleCheckTask = () => {
    dispatch(toggleCheckTask({ task, columnId }))
  }

  // Styles
  const styles = {
    priorities: {
      1: 'red.600',
      2: 'yellow.500',
      3: 'blue.400',
      4: 'gray.500',
    },
  }

  // Check if the device has touch capabilities
  const touch = 'ontouchstart' in document.documentElement

  return (
    <li
      onMouseLeave={() => attrs.onMouseLeave()}
      onMouseOver={() => attrs.onMouseOver()}
      onFocus={() => attrs.onMouseOver()}
    >
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <Box
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.draggableProps}
            ref={provided.innerRef}
            mb=".5rem"
            opacity={
              !snapshot.isDragging && droppableSnapshot.isDraggingOver
                ? 0.75
                : 1
            }
          >
            <Flex
              h="auto"
              p=".5rem"
              align="flex-start"
              bg={colorMode === 'light' ? 'white' : 'gray.800'}
              shadow="md"
              borderRadius="3px"
              borderLeft="3px solid"
              borderColor={styles.priorities[task.priority]}
            >
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Box {...provided.dragHandleProps}>
                <Icon as={DragHandleIcon} mr=".5rem" opacity={0.5} />
              </Box>

              <Checkbox
                mt=".3rem"
                mb=".25rem"
                size="lg"
                isChecked={task.checked}
                onChange={handleToggleCheckTask}
                d="flex"
              />

              <Editable
                pl=".75rem"
                w="calc(100% - 4.5rem)"
                opacity={task.checked ? '0.5' : '1'}
                fontSize="1.2em"
                fontWeight="600"
                lineHeight="1.5rem"
                value={taskTitle}
                onFocus={() => setTaskTitle(task.title)}
                onCancel={handleCancelEditTitleTask}
                onChange={setTaskTitle}
                onSubmit={handleEditTaskTitle}
              >
                <EditablePreview
                  d="block"
                  whiteSpace="pre-wrap"
                  wordWrap="break-word"
                  overflowWrap="break-word"
                />
                <EditableInput />
              </Editable>

              <Box
                ml="auto"
                my="auto"
                maxW="3rem"
                opacity={hovering || touch ? 1 : 0}
              >
                <TaskItemMenu task={task} index={index} columnId={columnId} />
              </Box>
            </Flex>
          </Box>
        )}
      </Draggable>
    </li>
  )
}

TaskItem.propTypes = {
  task: PropTypes.exact({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    indent: PropTypes.number,
    priority: PropTypes.number,
  }),
  index: PropTypes.number,
  droppableSnapshot: PropTypes.shape({
    draggingFromThisWith: PropTypes.string,
    draggingOverWith: PropTypes.string,
    isDraggingOver: PropTypes.bool,
    isUsingPlaceholder: PropTypes.bool,
  }),
  columnId: PropTypes.string,
}

TaskItem.defaultProps = {
  task: undefined,
  index: undefined,
  droppableSnapshot: undefined,
  columnId: undefined,
}

export default TaskItem
