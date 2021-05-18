import { Link as ReactLink } from 'react-router-dom'
import { GoMarkGithub } from 'react-icons/go'
import { MoonIcon, SettingsIcon, SunIcon } from '@chakra-ui/icons'
import { useColorMode } from '@chakra-ui/color-mode'
import { Flex, Heading, Link, Box } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/button'
import Logo from '../Logo'

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const styles = {
    iconSize: '1.25rem',
    bgColor: { light: 'white', dark: 'gray.800' },
    color: { light: 'gray.900', dark: 'gray.100' },
  }

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        py={[2, 4]}
        px={[2, 4]}
        borderBottomWidth="1px"
        bg={styles.bgColor[colorMode]}
        color={styles.color[colorMode]}
        shadow="sm"
      >
        {/* Logo */}
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" fontWeight="700">
            <Link as={ReactLink} to="/" display="flex" alignItems="center">
              <Box boxSize={8}>
                <Logo colorMode={colorMode} />
              </Box>
              Todolist
            </Link>
          </Heading>
        </Flex>

        {/* Icons */}
        <Flex align="center" justify="center">
          <Flex ml={2}>
            <Link
              href="https://github.com/madeinchema/todo-list"
              borderRadius={4}
              p={2}
              isExternal
            >
              <GoMarkGithub size={styles.iconSize} />
            </Link>
          </Flex>

          <Flex ml={2}>
            {colorMode === 'light' ? (
              <IconButton
                onClick={() => toggleColorMode()}
                icon={<MoonIcon />}
                fontSize={styles.iconSize}
                aria-label="Switch to dark mode"
              />
            ) : (
              <IconButton
                onClick={() => toggleColorMode()}
                icon={<SunIcon />}
                fontSize={styles.iconSize}
                aria-label="Switch to light mode"
              />
            )}
          </Flex>

          <Flex ml={2}>
            <IconButton
              icon={<SettingsIcon />}
              fontSize={styles.iconSize}
              aria-label="Switch to light mode"
              as={ReactLink}
              to="/settings"
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
