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
import Hover from './Hover';
import TodoActions from './TodoActions';
import { TodoContext } from '../contexts/TodoContext';
import { Draggable } from 'react-beautiful-dnd';


export default function Todo({ todo, index }) {
  const { todosData, setTodosData } = useContext(TodoContext);
  const [lastTitle, setLastTitle] = useState('');
  const bgColor = { light: 'gray.50', dark: 'gray.800' };
  const { colorMode } = useColorMode();

  // Handles to-dos editing and onCancel
  const editTodo = (event, id, lastTitle) => {

  }

  // Updates the state of a to-do's checkbox
  const handleChange = (id) => {
    const newState = {
      ...todosData,
      tasks: {
        ...todosData.tasks,
        [id]: {
          ...todosData.tasks[id],
          checked: !todosData.tasks[id].checked
        }
      }
    }

    setTodosData(newState);
  }

  return (
    <Hover>
      {(hovering) => (
        <li>
          <Draggable
            draggableId={todo.id}
            index={index}
          >
            {(provided) => (
              <Box
                {...provided.draggableProps}
                ref={provided.innerRef}
              >

                <Flex
                  h='auto'
                  py='.5rem'
                  px='.75rem'
                  align='flex-start'
                  mb='.25rem'
                  bg={bgColor[colorMode]}
                  shadow='md'
                  borderRadius='3px'
                >

                  <Box {...provided.dragHandleProps}>
                    <Icon name='drag-handle' mr={'.75rem'} opacity={.5}/>
                  </Box>

                  <Checkbox
                    my='.25rem'
                    size='lg'
                    isChecked={todo.checked}
                    onChange={() => handleChange(todo.id)}
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
                    onFocus={() => setLastTitle(todo.title)}
                    onCancel={(event) => editTodo(event, todo.id, lastTitle)}
                    w='calc(100% - 3rem)'
                  >
                    <EditablePreview />
                    <EditableInput
                      onChange={(event) => editTodo(event, todo.id)}
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
      )}
    </Hover>
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
