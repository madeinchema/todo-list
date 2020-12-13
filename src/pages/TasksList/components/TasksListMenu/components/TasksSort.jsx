import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { MdSort } from 'react-icons/all';
import { TasksContext } from '../../../../../contexts/TasksContext';

const TasksSort = (props) => {
  const { columnId } = props;
  const { dispatch } = useContext(TasksContext);

  const setTasksSort = (order) => {
    dispatch({
      type: 'SORT_TASKS',
      order,
      columnId,
    });
  };

  return (
    <Menu>
      <MenuButton as={Button} d="flex" size="sm" align="center" pr=".75rem">
        <Icon as={MdSort} size="1.5rem" mr=".25rem" />
        <Text display="inline-block" fontWeight="500">
          Sort
        </Text>
      </MenuButton>
      <MenuList placement="auto-start" zIndex={2}>
        <MenuItem onClick={() => setTasksSort('SORT_HIGHEST')}>
          Highest priority first
        </MenuItem>
        <MenuItem onClick={() => setTasksSort('SORT_LOWEST')}>
          Lowest priority first
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

TasksSort.propTypes = {
  columnId: PropTypes.string,
};

TasksSort.defaultProps = {
  columnId: undefined,
};

export default TasksSort;
