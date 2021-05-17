import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, List } from '@chakra-ui/layout'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { handleDragEnd } from '../../redux/tasksData/tasksDataSlice'
import { getPreparedTasksIds } from './utils/functions/getPreparedTasksIds'

import TaskItem from '../../components/TaskItem/TaskItem'
import NewTask from './components/NewTask/NewTask'
import EmptyTasksList from './components/EmptyTasksList'
import TasksListMenu from './components/TasksListMenu/TasksListMenu'
import useLocalStorage from '../../hooks/useLocalStorage'

const TasksList = ({ columnId }) => {
  const tasksData = useSelector(state => state.tasksData)
  const { tasks, columns } = tasksData
  const settings = useSelector(state => state.settings)
  const dispatch = useDispatch()
  const [, setLocalStorage] = useLocalStorage('tasks-v1')

  const column = columns[columnId]
  const tasksQty = Object.keys(tasks).length

  const preparedTasksIds = getPreparedTasksIds(
    [...column.taskIds],
    tasks,
    settings
  )

  const localStorageState = useMemo(
    () => ({ ...tasksData, settings }),
    [settings, tasksData]
  )

  useEffect(() => {
    setLocalStorage(localStorageState)
  }, [localStorageState, setLocalStorage])

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
            <TasksListMenu quantity={tasksQty} columnId={columnId} />
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
                      {preparedTasksIds.map((taskId, index) => {
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
