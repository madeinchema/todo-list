import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, List } from '@chakra-ui/react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { handleDragEnd } from '../../redux/tasksData/tasksDataSlice'
import { getSortedTasksIds } from './utils/functions/getSortedTasks'

import TaskItem from '../../components/TaskItem/TaskItem'
import NewTask from './components/NewTask/NewTask'
import EmptyTasksList from './components/EmptyTasksList'
import TasksListMenu from './components/TasksListMenu/TasksListMenu'

const TasksList = ({ columnId }) => {
  const tasksData = useSelector(state => state.tasksData)
  const { tasks, columns } = tasksData
  const settings = useSelector(state => state.settings)
  const [tasksListFilter, setTasksListFilter] = useState('All')
  const dispatch = useDispatch()

  const column = columns[columnId]
  const tasksQty = Object.keys(tasks).length

  // const sortedTasksIds = [...column.taskIds].sort(
  //   (firstTaskId, secondTaskId) => {
  //     const sortAttribute = settings.sort
  //     if (sortAttribute === 'ASC_PRIORITY')
  //       return tasks[secondTaskId].priority - tasks[firstTaskId].priority
  //     if (sortAttribute === 'DESC_PRIORITY')
  //       return tasks[firstTaskId].priority - tasks[secondTaskId].priority
  //     return 0
  //   }
  // )

  const sortedTasksIds = getSortedTasksIds(
    [...column.taskIds],
    tasks,
    settings.sort
  )

  const onDragEnd = result =>
    dispatch(
      handleDragEnd({
        result,
        columnId,
        settings,
      })
    )

  return (
    <Flex direction="column" maxW="680px" mx="auto">
      <NewTask />
      <DragDropContext onDragEnd={onDragEnd}>
        {columns[columnId].taskIds.length >= 1 ? (
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
                <Droppable droppableId="to-do" key={column.id} tasks={tasks}>
                  {({ innerRef, droppableProps, placeholder }, snapshot) => (
                    <Box
                      ref={innerRef}
                      data-rbd-droppable-context-id={
                        droppableProps['data-rbd-droppable-context-id']
                      }
                      data-rbd-droppable-id={
                        droppableProps['data-rbd-droppable-id']
                      }
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      {sortedTasksIds.map((taskId, index) => {
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
                      {placeholder}
                    </Box>
                  )}
                </Droppable>
              </List>
            </Flex>
          </Box>
        ) : (
          <EmptyTasksList />
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
