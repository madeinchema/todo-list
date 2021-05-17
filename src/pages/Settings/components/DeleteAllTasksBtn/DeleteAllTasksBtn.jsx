import { Button } from '@chakra-ui/button'
import { useColorMode } from '@chakra-ui/color-mode'
import { useDisclosure } from '@chakra-ui/hooks'

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
