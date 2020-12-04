import React from "react";
import PropTypes from "prop-types";
import TasksFilter from "./components/TasksFilter";
import TasksSort from "./components/TasksSort";
import { Flex, Tag } from "@chakra-ui/core";

const TasksListMenu = ({ quantity, columnId, filter, setFilter }) => {
  return (
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

      <TasksSort columnId={columnId} />
    </Flex>
  );
};

TasksListMenu.propTypes = {};

export default TasksListMenu;
