import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Flex,
  Button,
  Text,
  List,
  Heading,
  Icon,
  Tag,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/core";
import TaskItem from "../../components/TaskItem/TaskItem";
import { TasksContext } from "../../contexts/TasksContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { MdCheck, MdSort } from "react-icons/all";
import NewTask from "./NewTask/NewTask";
import TasksFilter from "./TasksFilter/TasksFilter";

const ColumnHeader = ({ quantity, columnId, filter, setFilter }) => {
  const { dispatch } = useContext(TasksContext);

  const setTasksSort = (order) => {
    dispatch({
      type: "SORT_TASKS",
      order,
      columnId,
    });
  };

  return (
    <Flex direction="column" maxW="680px" mx="auto">
      <NewTask />
      <Flex
        mb=".5rem"
        px=".5rem"
        w="100%"
        justify="space-between"
        align="flex-end"
      >
        <Flex align="center">
          <TasksFilter filter={filter} setFilter={setFilter} />
          <Tag variant="subtle">{quantity}</Tag>
        </Flex>

        <Menu>
          <MenuButton as={Button} d="flex" size="sm" align="center" pr=".75rem">
            <Icon as={MdSort} size="1.5rem" mr=".25rem" />
            <Text display="inline-block" fontWeight="500">
              Sort
            </Text>
          </MenuButton>
          <MenuList placement="auto-start" zIndex={2}>
            <MenuItem onClick={() => setTasksSort("SORT_HIGHEST")}>
              Highest priority first
            </MenuItem>
            <MenuItem onClick={() => setTasksSort("SORT_LOWEST")}>
              Lowest priority first
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

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

  console.log(filteredTasks)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {tasksData.columns[columnId].taskIds.length === 0 && (
        <Flex justify="center" align="center" height="40vh" direction="column">
          <Icon as={MdCheck} size="4rem" />
          <Heading size="lg">There are no tasks</Heading>
        </Flex>
      )}

      {tasksData.columns[columnId].taskIds.length >= 1 && (
        <Box h="calc(100vh - 4.5rem)">
          <ColumnHeader
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
