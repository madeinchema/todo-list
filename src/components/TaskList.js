import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  Button,
  Text,
  List,
  Heading,
  Collapse,
  Icon,
  Tag,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/core';
import Task from './Task';
import { TasksContext } from '../contexts/TasksContext';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { MdCheck, MdSort } from 'react-icons/all';

const ColumnHeader = ({ title, quantity, children, columnId }) => {
  const { dispatch } = useContext(TasksContext);
  const [show, setShow] = useState(true);

  const handleToggle = () => setShow(!show);

  const handleSort = (order) => {
    dispatch({
      type: 'SORT_TASKS',
      order,
      columnId
    })
  }

  return (
    <>
      <Flex
        mb='.5rem'
        px='.5rem'
        w='100%'
        justify='space-between'
        align='flex-end'
      >
        <Flex align='center'>
          <Button
            d='flex'
            pl='.25rem'
            pr='.5rem'
            mr='.5rem'
            size='sm'
            alignContent='center'
            onClick={handleToggle}
          >
            <Icon name={show ? 'chevron-down' : 'chevron-right'} size='1.5rem' mt='.125rem' mr='.15rem'/>
            <Heading size='lg' mr='.25rem'>{title}</Heading>

          </Button>
          <Tag variant='subtle'>{quantity}</Tag>
        </Flex>

        <Menu>
          <MenuButton
            as={Button}
            d='flex'
            size='sm'
            align='center'
            pr='.75rem'
          >
            <Icon as={MdSort} size='1.5rem' mr='.25rem'/>
            <Text display='inline-block' fontWeight='500'>Sort</Text>
          </MenuButton>
          <MenuList placement='auto-start' zIndex={2}>
            <MenuOptionGroup defaultValue='' onChange={(order) => handleSort(order)} title='By priority' type='radio'>
              <MenuItemOption value='SORT_HIGHEST'>Highest priority first</MenuItemOption>
              <MenuItemOption value='SORT_LOWEST'>Lowest priority first</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>

      </Flex>
      <Collapse isOpen={show}>
        {children}
      </Collapse>

    </>
  )
}

export default function TaskList({ columnId }) {
  const { tasksData, dispatch } = useContext(TasksContext);
  const tasksLength = tasksData.columns[columnId].taskIds.length;

  const column = tasksData.columns[columnId];
  const tasks = column.taskIds.map(taskId => tasksData.tasks[taskId]);

  // Handle the dropping of tasks
  const onDragEnd = result => {
    dispatch({
      type: 'HANDLE_DRAG_END',
      result,
      columnId
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>

      {tasksData.columns[columnId].taskIds.length === 0 && (
        <Flex justify='center' align='center' height='40vh' direction='column'>
          <Icon as={MdCheck} size='4rem'/>
          <Heading size='lg'>There are no tasks</Heading>
        </Flex>
      )}

      {tasksData.columns[columnId].taskIds.length >= 1 && (
        <ColumnHeader title={'To do'} quantity={tasksLength} columnId={columnId}>
          <Flex
            flexDir='column'
            className='custom-scroll'
            overflow='auto'
            borderRadius='5px'
            px='.5rem'
            h="calc(100vh - 13.25rem)"
          >
            <List mb='2rem'>
              {tasksData && (
                <Droppable droppableId={column.id} key={column.id} tasks={tasks}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      {tasks.map((task, index) => (
                        <Task key={task.id} task={task} index={index} droppableSnapshot={snapshot} columnId={column.id}/>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              )}
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
