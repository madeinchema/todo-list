import React from 'react';
import PropTypes from 'prop-types';
import { MdFlag } from 'react-icons/all';
import {
  Icon,
  Link,
  MenuItem,
  Box,
  MenuButton,
  Menu,
  MenuList,
} from '@chakra-ui/react';
import newTaskPriorityMenuTexts from '../utils/constants/newTaskTexts';

const NewTaskPriorityMenu = (props) => {
  const { newTaskPriority, updateNewTaskPriority } = props;

  const styles = {
    priorityColor: `${
      newTaskPriority === 1
        ? 'red.600'
        : newTaskPriority === 2
        ? 'yellow.500'
        : newTaskPriority === 3
        ? 'blue.400'
        : newTaskPriority === 4 && 'gray.500'
    }`,
  };

  return (
    <Menu>
      <Box
        style={{ transition: 'all .1s ease-out' }}
        d="flex"
        opacity="0.75"
        _hover={{ opacity: '1' }}
        mr=".5rem"
      >
        <MenuButton as={Link} aria-label="Search database" d="flex" w="25%">
          <Icon
            alignSelf="center"
            as={MdFlag}
            color={styles.priorityColor}
            boxSize="1.5rem"
            h="100%"
          />
        </MenuButton>
      </Box>

      <MenuList>
        <MenuItem onClick={() => updateNewTaskPriority(1)}>
          <Icon
            aria-label={newTaskPriorityMenuTexts.priority1}
            as={MdFlag}
            color="red.600"
            boxSize="1.5rem"
            mr=".5rem"
          />
          {newTaskPriorityMenuTexts.priority1}
        </MenuItem>
        <MenuItem onClick={() => updateNewTaskPriority(2)}>
          <Icon
            aria-label={newTaskPriorityMenuTexts.priority2}
            as={MdFlag}
            color="yellow.500"
            boxSize="1.5rem"
            mr=".5rem"
          />
          {newTaskPriorityMenuTexts.priority2}
        </MenuItem>
        <MenuItem onClick={() => updateNewTaskPriority(3)}>
          <Icon
            aria-label={newTaskPriorityMenuTexts.priority3}
            as={MdFlag}
            color="blue.400"
            boxSize="1.5rem"
            mr=".5rem"
          />
          {newTaskPriorityMenuTexts.priority3}
        </MenuItem>
        <MenuItem onClick={() => updateNewTaskPriority(4)}>
          <Icon
            aria-label={newTaskPriorityMenuTexts.priority4}
            as={MdFlag}
            color="gray.500"
            boxSize="1.5rem"
            mr=".5rem"
          />
          {newTaskPriorityMenuTexts.priority4}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

NewTaskPriorityMenu.propTypes = {
  newTaskPriority: PropTypes.number,
  updateNewTaskPriority: PropTypes.func,
};

NewTaskPriorityMenu.defaultProps = {
  newTaskPriority: undefined,
  updateNewTaskPriority: undefined,
};

export default NewTaskPriorityMenu;
