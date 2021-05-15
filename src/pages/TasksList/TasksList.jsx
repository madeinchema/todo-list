import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, List } from '@chakra-ui/react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import TaskItem from '../../components/TaskItem/TaskItem'
import { TasksContext } from '../../contexts/TasksContext'
import NewTask from './components/NewTask/NewTask'
import EmptyTasksList from './components/EmptyTasksList'
import TasksListMenu from './components/TasksListMenu/TasksListMenu'
import getFilteredTasks from './utils/functions/getFilteredTasks'
import getSortedTasks from './utils/functions/getSortedTasks'

const TasksList = props => {
  const { columnId } = props
  const { tasksData, dispatch } = useContext(TasksContext)
  const [tasksListFilter, setTasksListFilter] = useState('All')
  const [tasksToShow, setTasksToShow] = useState(undefined)
  const [loading, setLoading] = useState(undefined)

  const column = tasksData.columns[columnId]

  useEffect(() => {
    const tasks = column.taskIds.map(taskId => tasksData.tasks[taskId])
    // todo: redo this implementation
    const handleTasksToShow = async () => {
      setLoading(true)
      const filteredTasks = await getFilteredTasks([...tasks], tasksListFilter)
      const sortedTasks = await getSortedTasks(filteredTasks)
      setTasksToShow(sortedTasks)
      setLoading(false)
    }
    handleTasksToShow()
  }, [column.taskIds, tasksListFilter, tasksData])

  const onDragEnd = result => {
    dispatch({
      type: 'HANDLE_DRAG_END',
      result,
      columnId,
    })
    dispatch({ type: 'MOVE_COMPLETED_TO_BOTTOM' })
  }

  return (
    <Flex direction="column" maxW="680px" mx="auto">
      <NewTask />
      <DragDropContext onDragEnd={onDragEnd}>
        {tasksData.columns[columnId].taskIds.length === 0 && <EmptyTasksList />}

        {tasksData.columns[columnId].taskIds.length >= 1 && (
          <Box h="calc(100vh - 4.5rem)">
            <TasksListMenu
              quantity={tasksToShow && tasksToShow.length}
              columnId={columnId}
              tasksListFilter={tasksListFilter}
              setTasksListFilter={setTasksListFilter}
            />
            <Flex
              flexDir="column"
              className="custom-scroll"
              overflow="auto"
              borderRadius="5px"
              px=".5rem"
              h="calc(100vh - 13.25rem)"
            >
              <List mb="2rem">
                {!loading && tasksToShow && (
                  <Droppable
                    droppableId={column.id}
                    key={column.id}
                    tasks={tasksToShow}
                  >
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                      >
                        {tasksToShow.map((task, index) => (
                          <TaskItem
                            key={task.id}
                            task={task}
                            index={index}
                            droppableSnapshot={snapshot}
                            columnId={column.id}
                          />
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                )}
              </List>
            </Flex>
          </Box>
        )}
      </DragDropContext>
    </Flex>
  )
}

TasksList.propTypes = {
  columnId: PropTypes.string,
}

TasksList.defaultProps = {
  columnId: undefined,
}

export default TasksList
