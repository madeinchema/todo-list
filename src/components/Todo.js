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
import TodoActions from './TodoActions';
import { TodoContext } from '../contexts/TodoContext';
import { Draggable } from 'react-beautiful-dnd';


export default function Todo({ todo, index }) {
  const { dispatch } = useContext(TodoContext);
  const [prevTitle, setPrevTitle] = useState('');
  const [hovering, attrs] = useHover();
  const bgColor = { light: 'gray.50', dark: 'gray.800' };
  const { colorMode } = useColorMode();

  // Handles to-dos editing and onCancel
  const editTodo = (event) => {
    const { value } = event.target;
    dispatch({
      type: 'EDIT_TODO',
      todo,
      value,
    })
  };

  // Retrieves the initial title and sets it back
  const cancelTodo = () => {
    dispatch({
      type: 'CANCEL_TODO',
      todo,
      prevTitle,
    })
  };

  // Updates the state of a to-do's checkbox
  const handleCheck = () => {
    dispatch({
      type: 'HANDLE_CHECK',
      todo,
    })
  };

  const styles = {
    color: `${todo.priority === 1 ? '#C53030'
      : todo.priority === 2 ? '#D69E2E'
        : todo.priority === 3 ? '#5A67D8'
          : todo.priority === 4 && '#718096' }`,
  }

  return (
    <li {...attrs}>
      <Draggable
        draggableId={todo.id}
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
              borderLeft={`3px solid ${styles.color}`}
            >

              <Box {...provided.dragHandleProps}>
                <Icon name='drag-handle' mr={'.75rem'} opacity={.5}/>
              </Box>

              <Checkbox
                my='.25rem'
                size='lg'
                isChecked={todo.checked}
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
                opacity={todo.checked ? '0.5' : '1'}
                value={todo.title}
                onFocus={() => setPrevTitle(todo.title)}
                onCancel={cancelTodo}
                w='calc(100% - 3rem)'
              >
                <EditablePreview />
                <EditableInput
                  onChange={editTodo}
                />
              </Editable>

              <Box ml='auto' my='auto' maxW='3rem'>
                {hovering && <TodoActions todo={todo} index={index}/>}
              </Box>
            </Flex>

          </Box>
        )}
      </Draggable>
    </li>
  );
}

Todo.propTypes = {
  todo: PropTypes.exact({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    indent: PropTypes.number,
    priority: PropTypes.number,
  }),
}
