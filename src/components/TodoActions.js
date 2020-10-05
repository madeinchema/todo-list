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
import {MdMoreVert, MdFlag} from 'react-icons/all';

export default function TodoActions({ todo, index }) {
  const { dispatch } = useContext(TodoContext);

  // Removes the clicked to-do
  const removeTodo = () => {
    dispatch({
      type: 'REMOVE_TODO',
      todo,
      index,
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

          <MenuList>
            <MenuItem onClick={removeTodo}>
              <Icon aria-label="Search database" name='delete' size='1rem' mr='.5rem' opacity='.75'/>Delete
            </MenuItem>

            <MenuGroup title="Priority">
              <MenuItem>
                <Icon aria-label="Search database" as={MdFlag} color='red.600' size='1.5rem' mr='.5rem'/>Priority 1
              </MenuItem>
              <MenuItem>
                <Icon aria-label="Search database" as={MdFlag} color='yellow.500' size='1.5rem' mr='.5rem'/>Priority 2
              </MenuItem>
              <MenuItem>
                <Icon aria-label="Search database" as={MdFlag} color='#5A67D8' size='1.5rem' mr='.5rem'/>Priority 3
              </MenuItem>
              <MenuItem>
                <Icon aria-label="Search database" as={MdFlag} color='gray.500' size='1.5rem' mr='.5rem'/>Priority 4
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
