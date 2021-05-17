import PropTypes from 'prop-types'
import { Flex } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'

import TasksSort from './components/TasksSort'
import TasksFilter from './components/TasksFilter'

const TasksListMenu = props => {
  const { quantity, columnId, tasksListFilter, setTasksListFilter } = props
  return (
    <Flex
      mb=".5rem"
      px=".5rem"
      w="100%"
      justify="space-between"
      align="flex-end"
    >
      <Flex align="center">
        <TasksFilter
          tasksListFilter={tasksListFilter}
          setTasksListFilter={setTasksListFilter}
        />
        <Tag variant="subtle" size="lg" fontWeight="700">
          {quantity}
        </Tag>
      </Flex>

      <TasksSort columnId={columnId} />
    </Flex>
  )
}

TasksListMenu.propTypes = {
  quantity: PropTypes.number,
  columnId: PropTypes.string,
  tasksListFilter: PropTypes.string,
  setTasksListFilter: PropTypes.func,
}

TasksListMenu.defaultProps = {
  quantity: undefined,
  columnId: undefined,
  tasksListFilter: undefined,
  setTasksListFilter: undefined,
}

export default TasksListMenu
