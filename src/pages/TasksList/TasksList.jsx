import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, List } from '@chakra-ui/react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import TaskItem from '../../components/TaskItem/TaskItem'
import NewTask from './components/NewTask/NewTask'
import EmptyTasksList from './components/EmptyTasksList'
import TasksListMenu from './components/TasksListMenu/TasksListMenu'
import { handleDragEnd } from '../../redux/tasksData/tasksDataSlice'

const TasksList = props => {
  const { columnId } = props
  const tasksData = useSelector(state => state.tasksData)
  const [tasksListFilter, setTasksListFilter] = useState('All')
  const dispatch = useDispatch()

  const column = tasksData.columns[columnId]
  const tasksQty = Object.keys(tasksData.tasks).length

  const sortedTasksIds = [...tasksData.columns[columnId].taskIds].sort(
    (firstTaskId, secondTaskId) => {
      const sortAttribute = tasksData.settings.sort
      if (sortAttribute === 'ASC_PRIORITY') {
        return (
          tasksData.tasks[secondTaskId].priority -
          tasksData.tasks[firstTaskId].priority
        )
      }
      if (sortAttribute === 'DESC_PRIORITY') {
        return (
          tasksData.tasks[firstTaskId].priority -
          tasksData.tasks[secondTaskId].priority
        )
      }
      return 0
    }
  )

  const onDragEnd = result => {
    dispatch(
      handleDragEnd({
        result,
        columnId,
      })
    )
  }

  return (
    <Flex direction="column" maxW="680px" mx="auto">
      <NewTask />
      <DragDropContext onDragEnd={onDragEnd}>
        {tasksData.columns[columnId].taskIds.length === 0 && <EmptyTasksList />}

        {tasksData.columns[columnId].taskIds.length >= 1 && (
          <Box h="calc(100vh - 4.5rem)">
            <TasksListMenu
              quantity={tasksQty}
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
                {tasksData && (
                  <Droppable
                    droppableId="to-do"
                    key={column.id}
                    tasks={tasksData.tasks}
                  >
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                      >
                        {sortedTasksIds.map((taskId, index) => {
                          const { tasks } = tasksData
                          const task = tasks[taskId]
                          return (
                            <TaskItem
                              key={taskId}
                              task={task}
                              index={index}
                              droppableSnapshot={snapshot}
                              columnId={column.id}
                            />
                          )
                        })}
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
