import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/core';
import DeleteAllTasksNotification from './DeleteAllTasksNotification';
import { TasksContext } from '../../../../../contexts/TasksContext';

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

DeleteAllTasksModal.propTypes = {};

export default DeleteAllTasksModal;
