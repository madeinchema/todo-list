import React from 'react';
import PropTypes from 'prop-types';
import { MdFlag } from 'react-icons/all';
import {
  Icon,
  Link,
  MenuItem,
  PseudoBox,
  MenuButton,
  Menu,
  MenuList,
} from '@chakra-ui/core';
import newTaskPriorityMenuTexts from '../utils/constants/newTaskTexts';

const NewTaskPriorityMenu = (props) => {
  const { updateNewTaskPriority } = props;

  const styles = {
    priorityColor: `${
      inputPriority === 1
        ? 'red.600'
        : inputPriority === 2
        ? 'yellow.500'
        : inputPriority === 3
        ? 'blue.400'
        : inputPriority === 4 && 'gray.500'
    }`,
  };

  return (
    <Menu>
      <PseudoBox
        style={{ transition: 'all .1s ease-out' }}
        d="flex"
        opacity="0.75"
        _hover={{ opacity: '1' }}
        w="25%"
        h="100%"
      >
        <MenuButton as={Link} aria-label="Search database" d="flex" w="25%">
          <Icon
            alignSelf="center"
            as={MdFlag}
            color={styles.priorityColor}
            size="1.5rem"
            h="100%"
          />
        </MenuButton>
      </PseudoBox>

      <MenuList>
        <MenuItem onClick={() => updateNewTaskPriority(1)}>
          <Icon
            aria-label={newTaskPriorityMenuTexts.priority1}
            as={MdFlag}
            color="red.600"
            size="1.5rem"
            mr=".5rem"
          />
          {newTaskPriorityMenuTexts.priority1}
        </MenuItem>
        <MenuItem onClick={() => updateNewTaskPriority(2)}>
          <Icon
            aria-label={newTaskPriorityMenuTexts.priority2}
            as={MdFlag}
            color="yellow.500"
            size="1.5rem"
            mr=".5rem"
          />
          {newTaskPriorityMenuTexts.priority2}
        </MenuItem>
        <MenuItem onClick={() => updateNewTaskPriority(3)}>
          <Icon
            aria-label={newTaskPriorityMenuTexts.priority3}
            as={MdFlag}
            color="blue.400"
            size="1.5rem"
            mr=".5rem"
          />
          {newTaskPriorityMenuTexts.priority3}
        </MenuItem>
        <MenuItem onClick={() => updateNewTaskPriority(4)}>
          <Icon
            aria-label={newTaskPriorityMenuTexts.priority4}
            as={MdFlag}
            color="gray.500"
            size="1.5rem"
            mr=".5rem"
          />
          {newTaskPriorityMenuTexts.priority4}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

NewTaskPriorityMenu.propTypes = {
  updateNewTaskPriority: PropTypes.func,
};

NewTaskPriorityMenu.defaultProps = {
  updateNewTaskPriority: undefined,
};

export default NewTaskPriorityMenu;
