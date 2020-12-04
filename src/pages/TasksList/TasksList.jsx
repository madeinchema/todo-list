import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Flex, List, Heading, Icon, Tag } from "@chakra-ui/core";
import TaskItem from "../../components/TaskItem/TaskItem";
import { TasksContext } from "../../contexts/TasksContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { MdCheck } from "react-icons/all";
import NewTask from "./components/NewTask/NewTask";
import EmptyTasksList from "./components/EmptyTasksList";
import TasksListMenu from "./components/TasksListMenu/TasksListMenu";

export default function TasksList({ columnId }) {
  const { tasksData, dispatch } = useContext(TasksContext);
  const [filter, setFilter] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState(undefined);

  const column = tasksData.columns[columnId];
  const tasks = column.taskIds.map((taskId) => tasksData.tasks[taskId]);

  // Todo: This is terrible code and I will change everything

  useEffect(() => {
    let theFilteredTasks;

    if (filter === "All") {
      theFilteredTasks = [...tasks].filter((task) => task);
    }
    if (filter === "To do") {
      theFilteredTasks = [...tasks].filter((task) => !task.checked);
    }
    if (filter === "Completed") {
      theFilteredTasks = [...tasks].filter((task) => task.checked);
    }

    // Handle moveCompletedToBottom
    if (tasksData["settings"].moveCompletedToBottom) {
      theFilteredTasks.sort((a, b) => a.checked > b);
    }

    setFilteredTasks(theFilteredTasks);
  }, [filter, tasksData]);

  // Handle the dropping of tasks
  const onDragEnd = (result) => {
    dispatch({
      type: "HANDLE_DRAG_END",
      result,
      columnId,
    });
    dispatch({ type: "MOVE_COMPLETED_TO_BOTTOM" });
  };

  console.log(filteredTasks);

  return (
    <Flex direction="column" maxW="680px" mx="auto">
      <NewTask />
      <DragDropContext onDragEnd={onDragEnd}>
        
        {tasksData.columns[columnId].taskIds.length === 0 && (
          <EmptyTasksList />
        )}

        {tasksData.columns[columnId].taskIds.length >= 1 && (
          <Box h="calc(100vh - 4.5rem)">
            <TasksListMenu
              quantity={filteredTasks && filteredTasks.length}
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
                {filteredTasks && (
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
                        {filteredTasks.map((task, index) => (
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
