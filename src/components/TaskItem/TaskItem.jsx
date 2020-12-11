import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  useColorMode,
  Flex,
  Box,
  Icon,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import useHover from '../../utils/hooks/useHover';
import TaskItemMenu from './TaskItemMenu/TaskItemMenu';
import { TasksContext } from '../../contexts/TasksContext';

const TaskItem = (props) => {
  const { task, index, droppableSnapshot, columnId } = props;
  const { dispatch } = useContext(TasksContext);
  const [prevTitle, setPrevTitle] = useState('');
  const { colorMode } = useColorMode();
  const [hovering, attrs] = useHover();
  const bgColor = { light: 'gray.50', dark: 'gray.800' };

  // Handles tasks' editing and onCancel
  const editTaskTitle = (event) => {
    const { value } = event.target;
    dispatch({ type: 'EDIT_TASK', task, value, columnId });
  };

  // Retrieves the initial title and sets it back
  const cancelEditTitleTask = () =>
    dispatch({ type: 'CANCEL_TASK', task, prevTitle, columnId });

  // Updates the state of a task's checkbox
  const handleTaskCheck = () => {
    dispatch({ type: 'HANDLE_CHECK', task, columnId });
    dispatch({ type: 'MOVE_COMPLETED_TO_BOTTOM' });
  };

  // Styles
  const styles = {
    priorities: `${
      task.priority === 1
        ? 'red.600'
        : task.priority === 2
        ? 'yellow.500'
        : task.priority === 3
        ? 'blue.400'
        : task.priority === 4 && 'gray.500'
    }`,
  };

  // Check if the device has touch capabilities
  const touch = 'ontouchstart' in document.documentElement;

  return (
    <li {...attrs}>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <Box
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
              bg={bgColor[colorMode]}
              shadow="md"
              borderRadius="3px"
              borderLeft="3px solid"
              borderColor={styles.priorities}
            >
              <Box {...provided.dragHandleProps}>
                <Icon name="drag-handle" mr=".5rem" opacity={0.5} />
              </Box>

              <Checkbox
                my=".25rem"
                size="lg"
                isChecked={task.checked}
                onChange={handleTaskCheck}
                d="flex"
              />

              <Editable
                mt=".05rem"
                pl=".75rem"
                w="calc(100% - 4.5rem)"
                opacity={task.checked ? '0.5' : '1'}
                fontSize="1.2em"
                fontWeight="600"
                lineHeight="1.5rem"
                value={task.title}
                onFocus={() => setPrevTitle(task.title)}
                onCancel={cancelEditTitleTask}
              >
                <EditablePreview
                  d="block"
                  whiteSpace="pre-wrap"
                  wordWrap="break-word"
                  overflowWrap="break-word"
                />
                <EditableInput onChange={editTaskTitle} />
              </Editable>

              <Box ml="auto" my="auto" maxW="3rem">
                {(hovering || touch) && (
                  <TaskItemMenu task={task} index={index} columnId={columnId} />
                )}
              </Box>
            </Flex>
          </Box>
        )}
      </Draggable>
    </li>
  );
};

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
};

TaskItem.defaultProps = {
  task: undefined,
  index: undefined,
  droppableSnapshot: undefined,
  columnId: undefined,
};

export default TaskItem;
