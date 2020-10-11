import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text, List, Heading, Icon } from '@chakra-ui/core';
import Task from './Task';
import { TasksContext } from '../contexts/TasksContext';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { MdCheck, MdSort } from 'react-icons/all';

const ColumnHeader = ({ title }) => (
  <Flex
    mb='.5rem'
    w='100%'
    justify='space-between'
    align='flex-end'
  >
    <Flex align='center'>
      <Icon name='chevron-right' size='1.5rem' mt='.25rem'/>
      <Heading size='lg'>{title}</Heading>
    </Flex>
    <Flex align='center' pr='.75rem'>
      <Icon as={MdSort} size='1.5rem' mr='.25rem'/>
      <Text display='inline-block' fontWeight='500'>Sort</Text>
    </Flex>
  </Flex>
)

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
        w='100%'
        h="calc(100vh - 178px)"
      >
        <ColumnHeader title={'To do'}/>
        <Box
          className='custom-scroll'
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
