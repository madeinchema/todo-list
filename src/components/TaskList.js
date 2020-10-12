import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text, List, Heading, Link, Collapse, Icon, Badge } from '@chakra-ui/core';
import Task from './Task';
import { TasksContext } from '../contexts/TasksContext';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { MdCheck, MdSort } from 'react-icons/all';

const ColumnHeader = ({ title, quantity, children }) => {
  const [show, setShow] = useState(true);

  const handleToggle = () => setShow(!show);

  return (
    <>
      <Flex
        mb='.5rem'
        w='100%'
        justify='space-between'
        align='flex-end'
      >
        <Flex align='center' as={Link} onClick={handleToggle}>
          <Icon name='chevron-right' size='1.5rem' mt='.25rem'/>
          <Heading size='lg' mr='.5rem'>{title}</Heading>
          <Badge mt='.2rem' fontSize='.8rem'>{quantity}</Badge>
        </Flex>
        <Flex align='center' pr='.75rem'>
          <Icon as={MdSort} size='1.5rem' mr='.25rem'/>
          <Text display='inline-block' fontWeight='500'>Sort</Text>
        </Flex>
      </Flex>
      <Collapse isOpen={show}>
        {children}
      </Collapse>

    </>
  )
}

export default function TaskList() {
  const { tasksData, dispatch } = useContext(TasksContext);
  const tasksLength = tasksData.columns['column-1'].taskIds.length;

  // Handle the dropping of tasks
  const onDragEnd = result => {
    dispatch({
      type: 'HANDLE_DRAG_END',
      result,
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>

      {tasksData.columns['column-1'].taskIds.length === 0 && (
        <Flex justify='center' align='center' height='40vh' direction='column'>
          <Icon as={MdCheck} size='4rem'/>
          <Heading size='lg'>There are no tasks</Heading>
        </Flex>
      )}

      {tasksData.columns['column-1'].taskIds.length >= 1 && (
        <ColumnHeader title={'To do'} quantity={tasksLength}>
          <Flex
            flexDir='column'
            className='custom-scroll'
            overflow='auto'
            borderRadius='5px'
            px='.5rem'
            h="calc(100vh - 13.125rem)"
          >
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
                )
              })}
            </List>
          </Flex>
        </ColumnHeader>
      )}

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
