import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

const TasksFilter = props => {
  const { tasksListFilter, setTasksListFilter } = props
  const setTasksFilter = newFilter => setTasksListFilter(newFilter)

  return (
    <Menu>
      <MenuButton
        d="flex"
        as={Button}
        px=".5rem"
        mr=".5rem"
        size="sm"
        alignContent="center"
      >
        <Heading size="md">{tasksListFilter}</Heading>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => setTasksFilter('All')}>All</MenuItem>
        <MenuItem onClick={() => setTasksFilter('To do')}>To do</MenuItem>
        <MenuItem onClick={() => setTasksFilter('Completed')}>
          Completed
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

TasksFilter.propTypes = {
  tasksListFilter: PropTypes.string,
  setTasksListFilter: PropTypes.func,
}

TasksFilter.defaultProps = {
  tasksListFilter: undefined,
  setTasksListFilter: undefined,
}

export default TasksFilter
