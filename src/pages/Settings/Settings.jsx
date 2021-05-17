import { Link as ReactLink } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/all'
import { useColorMode } from '@chakra-ui/color-mode'
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Switch } from '@chakra-ui/switch'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMoveCompletedTasksToBottom } from '../../redux/settings/settingsSlice'

import DeleteAllTasksBtn from './components/DeleteAllTasksBtn/DeleteAllTasksBtn'

const Settings = () => {
  const settings = useSelector(state => state.settings)
  const dispatch = useDispatch()
  const { colorMode } = useColorMode()
  const styles = {
    dividerColor: { light: 'gray.400', dark: 'gray.600' },
    goBackBtnColor: {
      light: ['gray.100', 'gray.200'],
      dark: ['gray.800', 'gray.700'],
    },
  }

  return (
    <Box mx="auto" mb="5rem" p="0 1rem 2rem" maxW="512px" w="100%">
      <Flex w="100%" justify="space-between" align="center" my="1.5rem">
        <Box flexGrow="1" width="100%">
          <Button
            size="sm"
            as={ReactLink}
            to="/"
            bg={styles.goBackBtnColor[colorMode][0]}
            _hover={{
              bg: styles.goBackBtnColor[colorMode][1],
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
            isChecked={settings.moveCompletedTasksToBottom}
            onChange={() => dispatch(toggleMoveCompletedTasksToBottom())}
          />
        </Flex>
        <Divider borderColor={styles.dividerColor[colorMode]} />
        <Flex align="center" my=".75rem">
          <DeleteAllTasksBtn />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Settings
