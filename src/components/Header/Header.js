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

const MenuIcons = ({ children }) => <Flex ml={2}>{children}</Flex>;

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'gray.800' };
  const color = { light: 'gray.900', dark: 'gray.100' };
  const iconSize = '1.25rem';

  return (
    <React.Fragment>
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
              <FaClipboardCheck mr={'12px'} />
              Todolist
            </Link>
          </Heading>
        </Flex>

        {/* Icons */}
        <Flex align="center" justify="center">
          <MenuIcons>
            <Link
              href="https://github.com/madeinchema/todo-list"
              borderRadius={4}
              p={2}
              isExternal
            >
              <GoMarkGithub size={iconSize} />
            </Link>
          </MenuIcons>

          <MenuIcons>
            {colorMode === 'light' ? (
              <IconButton
                onClick={() => toggleColorMode()}
                icon="moon"
                fontSize={iconSize}
                aria-label="Switch to dark mode"
              />
            ) : (
              <IconButton
                onClick={() => toggleColorMode()}
                icon="sun"
                fontSize={iconSize}
                aria-label="Switch to light mode"
              />
            )}
          </MenuIcons>

          <MenuIcons>
            <IconButton
              icon="settings"
              fontSize={iconSize}
              aria-label="Switch to light mode"
              as={ReactLink}
              to="/settings"
            />
          </MenuIcons>
        </Flex>
      </Flex>
    </React.Fragment>
  );
}
