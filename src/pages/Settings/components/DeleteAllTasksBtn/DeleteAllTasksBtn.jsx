import React from 'react'
import { Button, useColorMode, useDisclosure } from '@chakra-ui/react'
import DeleteAllTasksModal from './components/DeleteAllTasksModal'

const deleteBtnColor = { light: 'red.600', dark: 'red.400' }

const DeleteAllTasksBtn = () => {
  const { colorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        borderColor={deleteBtnColor[colorMode]}
        color={deleteBtnColor[colorMode]}
        variant="outline"
        colorScheme="red"
        onClick={onOpen}
      >
        Delete all the tasks
      </Button>

      <DeleteAllTasksModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default DeleteAllTasksBtn
