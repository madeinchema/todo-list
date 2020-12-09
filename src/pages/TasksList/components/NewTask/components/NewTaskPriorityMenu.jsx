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

const NewTaskPriorityMenu = (props) => {
  const { handleInputPriority, inputPriority } = props;

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
        <MenuItem onClick={() => handleInputPriority(1)}>
          <Icon
            aria-label="Priority 1"
            as={MdFlag}
            color="red.600"
            size="1.5rem"
            mr=".5rem"
          />
          Priority 1
        </MenuItem>
        <MenuItem onClick={() => handleInputPriority(2)}>
          <Icon
            aria-label="Priority 2"
            as={MdFlag}
            color="yellow.500"
            size="1.5rem"
            mr=".5rem"
          />
          Priority 2
        </MenuItem>
        <MenuItem onClick={() => handleInputPriority(3)}>
          <Icon
            aria-label="Priority 3"
            as={MdFlag}
            color="blue.400"
            size="1.5rem"
            mr=".5rem"
          />
          Priority 3
        </MenuItem>
        <MenuItem onClick={() => handleInputPriority(4)}>
          <Icon
            aria-label="Priority 4"
            as={MdFlag}
            color="gray.500"
            size="1.5rem"
            mr=".5rem"
          />
          Priority 4
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

NewTaskPriorityMenu.propTypes = {};

export default NewTaskPriorityMenu;
