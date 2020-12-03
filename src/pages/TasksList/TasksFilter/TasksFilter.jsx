import React from 'react'
import PropTypes from 'prop-types'
import { Button, Heading, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/core'

const TasksFilter = ({filter, setFilter}) => {
  const setTasksFilter = (newFilter) => setFilter(newFilter);

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
              <Heading size="md">{filter}</Heading>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setTasksFilter("All")}>All</MenuItem>
              <MenuItem onClick={() => setTasksFilter("To do")}>To do</MenuItem>
              <MenuItem onClick={() => setTasksFilter("Completed")}>
                Completed
              </MenuItem>
            </MenuList>
          </Menu>
  )
}

TasksFilter.propTypes = {

}

export default TasksFilter
