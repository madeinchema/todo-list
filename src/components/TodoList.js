import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, List } from '@chakra-ui/core';
import Todo from './Todo';
import { TodoContext } from '../contexts/TodoContext';
// import Column from './Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


export default function TodoList() {
  const { todosData, dispatch } = useContext(TodoContext);

  return (
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
            {todosData.columnOrder.map((columnId) => {
              const column = todosData.columns[columnId];
              const tasks = column.taskIds.map(taskId => todosData.tasks[taskId]);

              // return <Column key={column.id} column={column} tasks={tasks} />
              return (
                <DragDropContext
                  key={column.id}
                  onDragEnd={() => console.log('drag end')}
                >
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {tasks.map((task, index) => (
                          <Todo key={task.id} todo={task} index={index} />
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </DragDropContext>
              );
            })}

          </List>
        </Flex>
      </Box>
    </Flex>
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
