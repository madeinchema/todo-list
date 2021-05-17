import React from 'react'
import PropTypes from 'prop-types'
import { MdSort } from 'react-icons/all'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Text } from '@chakra-ui/layout'
import { useDispatch, useSelector } from 'react-redux'
import { setTasksSort } from '../../../../../redux/settings/settingsSlice'

const TasksSort = props => {
  const { columnId } = props
  const dispatch = useDispatch()
  const sort = useSelector(state => state.settings.sort)

  const sortAttributes = {
    MANUAL: 'Manual',
    DESC_PRIORITY: 'Highest priority first',
    ASC_PRIORITY: 'Lowest priority first',
  }

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
        {Object.keys(sortAttributes).map(sortAttribute => (
          <MenuItem
            key={sortAttribute}
            onClick={() => handleSetTasksSort(sortAttribute)}
            fontWeight={sort === sortAttribute ? '700' : null}
          >
            {sortAttributes[sortAttribute]}
          </MenuItem>
        ))}
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
