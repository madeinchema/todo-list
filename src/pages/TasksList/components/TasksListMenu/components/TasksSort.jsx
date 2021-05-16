import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { MdSort } from 'react-icons/all'
import { useDispatch } from 'react-redux'
import { setTasksSort } from '../../../../../redux/tasksData/tasksDataSlice'

const TasksSort = props => {
  const { columnId } = props
  const dispatch = useDispatch()

  const handleSetTasksSort = order =>
    dispatch(
      setTasksSort({
        order,
        columnId,
      })
    )

  return (
    <Menu placement="auto-start">
      <MenuButton as={Button} d="flex" size="sm" align="center" pr=".75rem">
        <Icon as={MdSort} boxSize="1.5rem" mr=".25rem" />
        <Text display="inline-block" fontWeight="500">
          Sort
        </Text>
      </MenuButton>
      <MenuList zIndex={2}>
        <MenuItem onClick={() => handleSetTasksSort(false)}>Manual</MenuItem>
        <MenuItem onClick={() => handleSetTasksSort('DESC_PRIORITY')}>
          Highest priority first
        </MenuItem>
        <MenuItem onClick={() => handleSetTasksSort('ASC_PRIORITY')}>
          Lowest priority first
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

TasksSort.propTypes = {
  columnId: PropTypes.string,
}

TasksSort.defaultProps = {
  columnId: undefined,
}

export default TasksSort
