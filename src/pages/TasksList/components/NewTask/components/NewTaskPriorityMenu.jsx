import React from 'react'
import PropTypes from 'prop-types'
import { MdFlag } from 'react-icons/all'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import Icon from '@chakra-ui/icon'
import { Link } from '@chakra-ui/layout'
import newTaskPriorityMenuTexts from '../utils/constants/newTaskTexts'

const NewTaskPriorityMenu = props => {
  const { newTaskPriority, updateNewTaskPriority } = props

  const styles = {
    priorityColor: {
      1: 'red.600',
      2: 'yellow.500',
      3: 'blue.400',
      4: 'gray.500',
    },
    menuButton: {
      transition: 'all .1s ease-out',
    },
  }

  return (
    <Menu>
      <MenuButton
        as={Link}
        aria-label="Search database"
        d="flex"
        w="25%"
        mr=".25rem"
        opacity="0.75"
        _hover={{ opacity: '1' }}
        style={styles.menuButton}
      >
        <Icon
          alignSelf="center"
          as={MdFlag}
          color={styles.priorityColor[newTaskPriority]}
          boxSize="1.5rem"
          h="100%"
        />
      </MenuButton>

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
  )
}

NewTaskPriorityMenu.propTypes = {
  newTaskPriority: PropTypes.number,
  updateNewTaskPriority: PropTypes.func,
}

NewTaskPriorityMenu.defaultProps = {
  newTaskPriority: undefined,
  updateNewTaskPriority: undefined,
}

export default NewTaskPriorityMenu
