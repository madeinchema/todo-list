import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, List, Heading, Icon, Tag } from '@chakra-ui/core';
import TaskItem from '../../components/TaskItem/TaskItem';
import { TasksContext } from '../../contexts/TasksContext';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import NewTask from './components/NewTask/NewTask';
import EmptyTasksList from './components/EmptyTasksList';
import TasksListMenu from './components/TasksListMenu/TasksListMenu';

export default function TasksList({ columnId }) {
  const { tasksData, dispatch } = useContext(TasksContext);
  const [filter, setFilter] = useState('All');
  const [tasksToShow, setTasksToShow] = useState(undefined);

  const column = tasksData.columns[columnId];
  const tasks = column.taskIds.map((taskId) => tasksData.tasks[taskId]);

  useEffect(() => {
    let filteredTasks;
    const isFilterAll = filter === 'All';
    const isFilterToDo = filter === 'To do';
    const isFilterCompleted = filter === 'Completed';

    if (isFilterAll) {
      filteredTasks = [...tasks].filter((task) => task);
    } else if (isFilterToDo) {
      filteredTasks = [...tasks].filter((task) => !task.checked);
    } else if (isFilterCompleted) {
      filteredTasks = [...tasks].filter((task) => task.checked);
    }

    filteredTasks && setTasksToShow(filteredTasks);
  }, [filter, tasksData]);

  useEffect(() => {
    // todo: handle settings in other function/file
    if (tasksToShow && tasksData['settings'].moveCompletedToBottom) {
      tasksToShow.sort((a, b) => a.checked > b);
    }
  }, [setTasksToShow]);

  const onDragEnd = (result) => {
    dispatch({
      type: 'HANDLE_DRAG_END',
      result,
      columnId,
    });
    dispatch({ type: 'MOVE_COMPLETED_TO_BOTTOM' });
  };

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
              filter={filter}
              setFilter={setFilter}
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
                {tasksToShow && (
                  <Droppable
                    droppableId={column.id}
                    key={column.id}
                    tasks={tasks}
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
  );
}

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
      indent: PropTypes.number,
      priority: PropTypes.number,
    })
  ),
};
