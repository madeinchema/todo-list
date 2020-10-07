import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, List } from '@chakra-ui/core';
import Task from './Task';
import { TasksContext } from '../contexts/TasksContext';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


export default function TaskList() {
  const { tasksData, dispatch } = useContext(TasksContext);

  // Handle the dropping of tasks
  const onDragEnd = result => {
    dispatch({
      type: 'HANDLE_DRAG_END',
      result,
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        h="calc(100vh - 178px)"
        p='0 .5rem .5rem'
      >
        <Box
          className='custom-scroll'
          h='100%'
          w='100%'
          maxW='680px'
          overflow='auto'
          borderRadius='5px'
          p='.5rem'
        >
          <Flex flexDir='column'>
            <List mb='2rem'>
              {tasksData && tasksData.columnOrder.map((columnId) => {
                const column = tasksData.columns[columnId];
                const tasks = column.taskIds.map(taskId => tasksData.tasks[taskId]);
                return (
                  <Droppable droppableId={column.id} key={column.id} tasks={tasks}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                      >
                        {tasks.map((task, index) => (
                          <Task key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                );
              })}
            </List>
          </Flex>
        </Box>
      </Flex>
    </DragDropContext>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    indent: PropTypes.number,
    priority: PropTypes.number,
  })),
}
