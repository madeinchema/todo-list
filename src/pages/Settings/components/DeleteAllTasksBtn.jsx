import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/core';
import { TasksContext } from '../../../contexts/TasksContext';

const deleteBtnColor = { light: 'red.600', dark: 'red.400' };

const DeleteAllTasksNotification = () => (
  <Flex
    backgroundColor="red.600"
    m={3}
    py={3}
    px={5}
    justifyContent="space-between"
    alignContent="center"
  >
    <Text mr="1em" pt=".2rem" color="white">
      All the tasks have been deleted
    </Text>
  </Flex>
);

const DeleteAllTasksModal = ({ isOpen, onClose }) => {
  const { tasksData, dispatch } = useContext(TasksContext);
  const toast = useToast();

  // todo: move into a functions file
  const handleDeleteAll = () => {
    dispatch({
      type: 'DELETE_ALL',
    });
    toast({
      // todo: this should probably be a function, close to DeleteAllTasksNotification
      position: 'bottom-left',
      title: 'All the tasks have been deleted',
      duration: 5000,
      isClosable: true,
      render: () => DeleteAllTasksNotification,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete all the tasks</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete all the tasks? This action is
          irreversible.
        </ModalBody>
        <ModalFooter>
          <Button variantColor="blue" mr={3} onClick={onClose}>
            No
          </Button>
          <Button variantColor="red" onClick={handleDeleteAll}>
            Yes, delete all the tasks
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const DeleteAllTasksBtn = (props) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        borderColor={deleteBtnColor[colorMode]}
        color={deleteBtnColor[colorMode]}
        variant="outline"
        variantColor="red"
        onClick={onOpen}
      >
        Delete all the tasks
      </Button>

      <DeleteAllTasksModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

DeleteAllTasksBtn.propTypes = {};

export default DeleteAllTasksBtn;
