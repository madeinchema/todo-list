import React, { useContext, useRef } from 'react';
import {
  Flex,
  Text,
  Button,
  Box,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { TasksContext } from '../../../contexts/TasksContext';
import { MdMoreVert, MdFlag, BiDuplicate } from 'react-icons/all';
import { DeleteIcon } from '@chakra-ui/icons';

export default function TaskItemMenu({ task, index, columnId }) {
  const { dispatch } = useContext(TasksContext);
  const toast = useToast();
  const toastRef = useRef();

  // Removes the task
  const deleteTask = () => {
    dispatch({
      type: 'REMOVE_TASK',
      task,
      index,
      columnId,
    });
    toast({
      position: 'bottom-left',
      title: 'Task deleted',
      duration: 5000,
      isClosable: true,
      render: ({ onClose }) => (
        <Flex
          ref={toastRef}
          backgroundColor="red.600"
          m={3}
          py={3}
          px={5}
          justifyContent="space-between"
          alignContent="center"
        >
          <Text mr="1em" pt=".2rem" color="white">
            Task removed
          </Text>
          <Button
            onClick={() => undoDeleteTask(onClose)}
            backgroundColor={'rgba(255, 255, 255, .15)'}
            color="white"
            variant="ghost"
            size="sm"
            _hover={{ bg: 'rgba(255, 255, 255, .25)' }}
            _active={{ bg: 'rgba(255, 255, 255, .5)' }}
          >
            Undo
          </Button>
        </Flex>
      ),
    });
    dispatch({ type: 'MOVE_COMPLETED_TO_BOTTOM' });
  };

  // Adds back the deleted task
  const undoDeleteTask = (callback) => {
    dispatch({
      type: 'UNDO_DELETE_TASK',
      task,
      index,
      columnId,
    });
    callback();
    dispatch({ type: 'MOVE_COMPLETED_TO_BOTTOM' });
  };

  // Duplicates the task
  const duplicateTask = () => {
    dispatch({
      type: 'DUPLICATE_TASK',
      task: task,
      index,
      columnId,
    });
    dispatch({ type: 'MOVE_COMPLETED_TO_BOTTOM' });
  };

  const changePriority = (priority) => {
    dispatch({
      type: 'CHANGE_PRIORITY',
      task: task,
      index,
      priority,
      columnId,
    });
  };

  return (
    <Flex>
      <Menu placement="auto-end">
        <Box
          style={{ transition: 'all .1s ease-out' }}
          d="flex"
          opacity="0.5"
          _hover={{ opacity: '1' }}
        >
          <MenuButton aria-label={'Open task menu'}>
            <Icon
              aria-label="Search database"
              as={MdMoreVert}
              boxSize="1.5rem"
            />
          </MenuButton>
        </Box>

        <MenuList zIndex={2}>
          <MenuItem onClick={deleteTask}>
            <Icon
              aria-label="Remove Task"
              as={DeleteIcon}
              boxSize="1rem"
              mr=".6rem"
              opacity=".75"
              ml=".25rem"
            />
            Delete
          </MenuItem>
          <MenuItem onClick={duplicateTask}>
            <Icon
              aria-label="Duplicate Task"
              as={BiDuplicate}
              boxSize="1.25rem"
              mr=".5rem"
              ml=".1rem"
              opacity=".75"
            />
            Duplicate
          </MenuItem>
          <MenuDivider />
          <MenuGroup title="Priority">
            <MenuItem onClick={() => changePriority(1)}>
              <Icon
                aria-label="Priority 1"
                as={MdFlag}
                color="red.600"
                boxSize="1.4rem"
                mr=".5rem"
              />
              Priority 1
            </MenuItem>
            <MenuItem onClick={() => changePriority(2)}>
              <Icon
                aria-label="Priority 2"
                as={MdFlag}
                color="yellow.500"
                boxSize="1.4rem"
                mr=".5rem"
              />
              Priority 2
            </MenuItem>
            <MenuItem onClick={() => changePriority(3)}>
              <Icon
                aria-label="Priority 3"
                as={MdFlag}
                color="blue.400"
                boxSize="1.4rem"
                mr=".5rem"
              />
              Priority 3
            </MenuItem>
            <MenuItem onClick={() => changePriority(4)}>
              <Icon
                aria-label="Priority 4"
                as={MdFlag}
                color="gray.500"
                boxSize="1.4rem"
                mr=".5rem"
              />
              Priority 4
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
}

TaskItemMenu.propTypes = {
  task: PropTypes.exact({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    indent: PropTypes.number,
    priority: PropTypes.number,
  }),
};
