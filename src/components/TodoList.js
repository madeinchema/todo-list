import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, List } from '@chakra-ui/core';
import Todo from './Todo';
import { TodoContext } from '../contexts/TodoContext';
// import Column from './Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


export default function TodoList() {
  const { todosData, setTodosData } = useContext(TodoContext);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    // Check if there is no destination
    if (!destination) {
      return;
    }

    // Check to see if the location of the draggable changed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    /**
     * Reorder the taskIds array for the column
     */
    const column = todosData.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds); // Get taskIds without mutating them

    // Move taskId from its old index, to its new index in the array
    newTaskIds.splice(source.index, 1); // Remove the item from the array
    newTaskIds.splice(destination.index, 0, draggableId); // Insert it in the destination

    // Create our new, updated column
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    }

    // Update the state with the next updated column
    const newState = {
      ...todosData,
      columns: {
        ...todosData.columns,
        [newColumn.id]: newColumn,
      }
    }

    setTodosData(newState) // Update state
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
