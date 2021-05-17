import Icon from '@chakra-ui/icon'
import { Flex, Heading } from '@chakra-ui/layout'
import { MdCheck } from 'react-icons/md'

const EmptyTasksList = () => {
  return (
    <Flex justify="center" align="center" height="40vh" direction="column">
      <Icon as={MdCheck} boxSize="4rem" />
      <Heading size="lg">There are no tasks</Heading>
    </Flex>
  )
}

export default EmptyTasksList
