import PropTypes from 'prop-types'
import { useToast } from '@chakra-ui/toast'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Button } from '@chakra-ui/button'
import { useDispatch } from 'react-redux'
import { deleteAllTasks } from '../../../../../redux/tasksData/tasksDataSlice'

const DeleteAllTasksModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()

  const toast = useToast()

  const showDeleteAllTasksNotification = () =>
    toast({
      position: 'bottom-left',
      title: 'All the tasks have been deleted',
      duration: 5000,
      isClosable: true,
      status: 'success',
    })

  const handleDeleteAllTasks = () => {
    dispatch(deleteAllTasks())
    showDeleteAllTasksNotification()
    onClose()
  }

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
          <Button colorScheme="red" onClick={handleDeleteAllTasks}>
            Yes, delete all the tasks
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

DeleteAllTasksModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default DeleteAllTasksModal
