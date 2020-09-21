import React, { useState } from 'react';
import {
  useColorMode,
  Flex,
  Box,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/core';
import PropTypes from 'prop-types';
import Hover from './Hover';
import TodoActions from './TodoActions';


export default function Todo({
  todo,
  editTodo,
  removeTodo,
  handleChange,
}) {
  const [lastTitle, setLastTitle] = useState('');
  const bgColor = { light: 'gray.50', dark: 'gray.800' };
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Hover>
      {(hovering) => (
          <li>
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
                {hovering && <TodoActions removeTodo={removeTodo} />}
              </Box>
            </Flex>
          </li>
      )}
    </Hover>
  );
}

Todo.propTypes = {
  todo: PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    indent: PropTypes.number.isRequired,
    priority: PropTypes.number.isRequired,
  }),
  editTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}
