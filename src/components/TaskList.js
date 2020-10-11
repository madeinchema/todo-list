import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, List, Heading, Icon } from '@chakra-ui/core';
import Task from './Task';
import { TasksContext } from '../contexts/TasksContext';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {MdCheck} from 'react-icons/all';


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
        justify="flex-start"
        maxW='680px'
        h="calc(100vh - 178px)"
        mx='auto'
      >
        <Box
          className='custom-scroll'
          w='100%'
          overflow='auto'
          borderRadius='5px'
          px='.5rem'
        >
          <Flex flexDir='column'>

            {tasksData.columns['column-1'].taskIds.length === 0 && (
              <Flex justify='center' align='center' height='40vh' direction='column'>
                <Icon as={MdCheck} size='4rem' />
                <Heading size='lg'>There are no tasks</Heading>
              </Flex>
            )}

            {tasksData.columns['column-1'].taskIds.length >= 1 && (
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
                            <Task key={task.id} task={task} index={index} droppableSnapshot={snapshot}/>
                          ))}
                          {provided.placeholder}
                        </Box>
                      )}
                    </Droppable>
                  );
                })}
              </List>
            )}
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
