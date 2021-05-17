import PropTypes from 'prop-types'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { Button } from '@chakra-ui/button'
import { Heading } from '@chakra-ui/layout'

const TasksFilter = props => {
  const { tasksListFilter, setTasksListFilter } = props
  const setTasksFilter = newFilter => setTasksListFilter(newFilter)

  const filterAttributes = {
    ALL: 'All',
    TO_DO: 'To do',
    COMPLETED: 'Completed',
  }

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
        <Heading size="md">{filterAttributes[tasksListFilter]}</Heading>
      </MenuButton>
      <MenuList>
        {Object.keys(filterAttributes).map(filterAttribute => (
          <MenuItem
            key={filterAttribute}
            onClick={() => setTasksFilter(filterAttribute)}
            fontWeight={tasksListFilter === filterAttribute ? 700 : 500}
          >
            {filterAttributes[filterAttribute]}
          </MenuItem>
        ))}
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
