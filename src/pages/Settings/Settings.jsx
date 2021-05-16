import React from 'react'
import { Link as ReactLink } from 'react-router-dom'
import {
  Box,
  Flex,
  Text,
  Button,
  Switch,
  Icon,
  Heading,
  Divider,
  useColorMode,
} from '@chakra-ui/react'
import { MdArrowBack } from 'react-icons/all'
import { useDispatch, useSelector } from 'react-redux'
import DeleteAllTasksBtn from './components/DeleteAllTasksBtn/DeleteAllTasksBtn'
import { toggleMoveCompletedTasksToBottom } from '../../redux/settings/settingsSlice'

const Settings = () => {
  const settings = useSelector(state => state.settings)
  const dispatch = useDispatch()
  const { colorMode } = useColorMode()
  const dividerColor = { light: 'gray.400', dark: 'gray.600' }
  const goBackBtnColor = {
    light: ['gray.200', 'gray.300'],
    dark: ['gray.800', 'gray.700'],
  }

  return (
    <Box mx="auto" mb="5rem" p="0 1rem 2rem" maxW="512px" w="100%">
      <Flex w="100%" justify="space-between" align="center" my="1.5rem">
        <Box flexGrow="1" width="100%">
          <Button
            size="sm"
            as={ReactLink}
            to="/"
            bg={goBackBtnColor[colorMode][0]}
            _hover={{
              bg: goBackBtnColor[colorMode][1],
            }}
          >
            <Icon as={MdArrowBack} mr=".25rem" />
            <Text mb=".05rem">Go back</Text>
          </Button>
        </Box>

        <Box>
          <Heading size="lg" mb=".125rem">
            Settings
          </Heading>
        </Box>

        <Box flexGrow="1" width="100%" />
      </Flex>

      <Flex direction="column">
        <Heading size="mg" mb=".75rem">
          Notes and Lists
        </Heading>
        <Flex justify="space-between" align="center" mb=".75rem">
          <Text>Move completed tasks to the bottom</Text>
          <Switch
            size="sm"
            isChecked={settings.moveCompletedToBottom}
            onChange={() => dispatch(toggleMoveCompletedTasksToBottom())}
          />
        </Flex>
        <Divider borderColor={dividerColor[colorMode]} />
        <Flex align="center" my=".75rem">
          <DeleteAllTasksBtn />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Settings
