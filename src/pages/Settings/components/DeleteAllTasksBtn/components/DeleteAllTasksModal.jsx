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
} from '@chakra-ui/react';
import { TasksContext } from '../../../../../contexts/TasksContext';

const DeleteAllTasksModal = ({ isOpen, onClose }) => {
  const { dispatch } = useContext(TasksContext);
  const toast = useToast();

  const showDeleteAllTasksNotification = () =>
    toast({
      position: 'bottom-left',
      title: 'All the tasks have been deleted',
      duration: 5000,
      isClosable: true,
      status: 'success',
    });

  const deleteAllTasks = () => {
    dispatch({
      type: 'DELETE_ALL',
    });
    showDeleteAllTasksNotification();
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
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="red" onClick={deleteAllTasks}>
            Yes, delete all the tasks
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

DeleteAllTasksModal.propTypes = {
  isOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteAllTasksModal;
