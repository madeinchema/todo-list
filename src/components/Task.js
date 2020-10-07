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
import useHover from '../hooks/useHover';
import TaskActionsList from './TaskActionsList';
import { TasksContext } from '../contexts/TasksContext';
import { Draggable } from 'react-beautiful-dnd';


export default function Task({ task, index }) {
  const { dispatch } = useContext(TasksContext);
  const [prevTitle, setPrevTitle] = useState('');
  const [hovering, attrs] = useHover();
  const bgColor = { light: 'gray.50', dark: 'gray.800' };
  const { colorMode } = useColorMode();

  // Handles tasks' editing and onCancel
  const editTask = (event) => {
    const { value } = event.target;
    dispatch({
      type: 'EDIT_TASK',
      task,
      value,
    })
  };

  // Retrieves the initial title and sets it back
  const cancelTask = () => {
    dispatch({
      type: 'CANCEL_TASK',
      task,
      prevTitle,
    })
  };

  // Updates the state of a task's checkbox
  const handleCheck = () => {
    dispatch({
      type: 'HANDLE_CHECK',
      task,
    })
  };

  const styles = {
    color: `${task.priority === 1 ? 'red.600'
      : task.priority === 2 ? 'yellow.500'
        : task.priority === 3 ? 'blue.400'
          : task.priority === 4 && 'gray.500' }`,
  }

  const touch = 'ontouchstart' in document.documentElement;

  return (
    <li {...attrs}>
      <Draggable
        draggableId={task.id}
        index={index}
      >
        {(provided) => (
          <Box
            {...provided.draggableProps}
            ref={provided.innerRef}
            mb='.5rem'
          >

            <Flex
              h='auto'
              py='.5rem'
              px='.75rem'
              align='flex-start'
              bg={bgColor[colorMode]}
              shadow='md'
              borderRadius='3px'
              borderLeft='3px solid'
              borderColor={styles.color}
            >

              <Box {...provided.dragHandleProps}>
                <Icon name='drag-handle' mr={'.75rem'} opacity={.5}/>
              </Box>

              <Checkbox
                my='.25rem'
                size='lg'
                isChecked={task.checked}
                onChange={handleCheck}
                d='flex'
              >
              </Checkbox>

              <Editable
                mt='.05rem'
                pl='.75rem'
                fontSize='1.2em'
                fontWeight='600'
                lineHeight='1.5rem'
                opacity={task.checked ? '0.5' : '1'}
                value={task.title}
                onFocus={() => setPrevTitle(task.title)}
                onCancel={cancelTask}
                w='calc(100% - 3rem)'
              >
                <EditablePreview />
                <EditableInput
                  onChange={editTask}
                />
              </Editable>

              <Box ml='auto' my='auto' maxW='3rem'>
                {(hovering || touch) && <TaskActionsList task={task} index={index}/>}
              </Box>
            </Flex>

          </Box>
        )}
      </Draggable>
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.exact({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    indent: PropTypes.number,
    priority: PropTypes.number,
  }),
}
