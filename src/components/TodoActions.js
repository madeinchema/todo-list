import React, { useContext } from 'react';
import {
  Flex,
  PseudoBox,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
} from '@chakra-ui/core';
import PropTypes from 'prop-types';
import { TodoContext } from '../contexts/TodoContext';
import {MdMoreVert, MdFlag, BiDuplicate} from 'react-icons/all';

export default function TodoActions({ todo, index }) {
  const { dispatch } = useContext(TodoContext);

  // Removes the to-do
  const removeTodo = () => {
    dispatch({
      type: 'REMOVE_TODO',
      todo,
      index,
    })
  }

  // Duplicates the to-do
  const duplicateTodo = () => {
    dispatch({
      type: 'DUPLICATE_TODO',
      todo,
      index,
    })
  }

  const changePriority = (priority) => {
    dispatch({
      type: 'CHANGE_PRIORITY',
      todo,
      index,
      priority,
    })
  }

  return (
    <Flex>
        <Menu>

          <PseudoBox
            style={{ transition: 'all .1s ease-out' }}
            d='flex'
            opacity='0.5'
            _hover={{ opacity: "1" }}
          >
            <MenuButton aria-label={'Open todo menu'}>
              <Icon aria-label="Search database" as={MdMoreVert} size='1.5rem' />
            </MenuButton>
          </PseudoBox>

          <MenuList placement='auto'>
            <MenuItem onClick={removeTodo}>
              <Icon
                aria-label="Remove Todo"
                name='delete'
                size='1rem'
                mr='.6rem'
                opacity='.75'
                ml='.25rem'
              />Delete
            </MenuItem>
            <MenuItem onClick={duplicateTodo}>
              <Icon
                aria-label="Duplicate Todo"
                as={BiDuplicate}
                size='1.25rem'
                mr='.5rem'
                ml='.1rem'
                opacity='.75'
              />Duplicate
            </MenuItem>

            <MenuGroup title="Priority">
              <MenuItem onClick={() => changePriority(1)}>
                <Icon aria-label="Priority 1" as={MdFlag} color='red.600' size='1.4rem' mr='.5rem'/>Priority 1
              </MenuItem>
              <MenuItem onClick={() => changePriority(2)}>
                <Icon aria-label="Priority 2" as={MdFlag} color='yellow.500' size='1.4rem' mr='.5rem'/>Priority 2
              </MenuItem>
              <MenuItem onClick={() => changePriority(3)}>
                <Icon aria-label="Priority 3" as={MdFlag} color='blue.400' size='1.4rem' mr='.5rem'/>Priority 3
              </MenuItem>
              <MenuItem onClick={() => changePriority(4)}>
                <Icon aria-label="Priority 4" as={MdFlag} color='gray.500' size='1.4rem' mr='.5rem'/>Priority 4
              </MenuItem>
            </MenuGroup>
          </MenuList>

        </Menu>
    </Flex>
  );
}

TodoActions.propTypes = {
  todo: PropTypes.exact({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    indent: PropTypes.number,
    priority: PropTypes.number,
  }),
}
