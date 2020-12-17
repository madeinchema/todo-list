import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { FaClipboardCheck } from 'react-icons/fa';
import { GoMarkGithub } from 'react-icons/go';
import {
  IconButton,
  Link,
  Flex,
  Heading,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SettingsIcon, SunIcon } from '@chakra-ui/icons';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'gray.800' };
  const color = { light: 'gray.900', dark: 'gray.100' };
  const iconSize = '1.25rem';

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        p="1rem 1.5rem"
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        shadow="md"
      >
        {/* Logo */}
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" fontWeight="700">
            <Link as={ReactLink} to="/" display="flex" alignItems="center">
              <FaClipboardCheck mr="12px" />
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
              <GoMarkGithub size={iconSize} />
            </Link>
          </Flex>

          <Flex ml={2}>
            {colorMode === 'light' ? (
              <IconButton
                onClick={() => toggleColorMode()}
                icon={<MoonIcon />}
                fontSize={iconSize}
                aria-label="Switch to dark mode"
              />
            ) : (
              <IconButton
                onClick={() => toggleColorMode()}
                icon={<SunIcon />}
                fontSize={iconSize}
                aria-label="Switch to light mode"
              />
            )}
          </Flex>

          <Flex ml={2}>
            <IconButton
              icon={<SettingsIcon />}
              fontSize={iconSize}
              aria-label="Switch to light mode"
              as={ReactLink}
              to="/settings"
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
