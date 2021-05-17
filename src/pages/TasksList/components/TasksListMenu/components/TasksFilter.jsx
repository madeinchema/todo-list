import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { Button } from '@chakra-ui/button'
import { Heading } from '@chakra-ui/layout'
import { useDispatch, useSelector } from 'react-redux'
import { setTasksFilter } from '../../../../../redux/settings/settingsSlice'

const TasksFilter = props => {
  const tasksListFilter = useSelector(state => state.settings.filter)
  const dispatch = useDispatch()

  const handleSetTasksFilter = filterAttribute =>
    dispatch(setTasksFilter({ filter: filterAttribute }))

  const filterAttributes = {
    ALL: 'All',
    TO_DO: 'To do',
    CHECKED: 'Checked',
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
            onClick={() => handleSetTasksFilter(filterAttribute)}
            fontWeight={tasksListFilter === filterAttribute ? 700 : 500}
          >
            {filterAttributes[filterAttribute]}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default TasksFilter
