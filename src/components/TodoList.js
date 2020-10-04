import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, List } from '@chakra-ui/core';
import Todo from './Todo';
import { TodoContext } from '../contexts/TodoContext';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


export default function TodoList() {
  const { todosData, dispatch } = useContext(TodoContext);

  // Handle the (drag and) drop of to-do's
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
          <Flex
            id='todoList'
            flexDir='column'
          >
            <List mb='2rem'>
              {todosData && todosData.columnOrder.map((columnId) => {
                const column = todosData.columns[columnId];
                const tasks = column.taskIds.map(taskId => todosData.tasks[taskId]);
                return (
                  <Droppable droppableId={column.id} key={column.id} tasks={tasks}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                      >
                        {tasks.map((task, index) => (
                          <Todo key={task.id} todo={task} index={index} />
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

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    indent: PropTypes.number,
    priority: PropTypes.number,
  })),
}
