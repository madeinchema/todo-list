import React from "react";
import { FaClipboardCheck } from 'react-icons/fa';
import {
  Text,
  Icon,
  Link,
  Flex,
  useColorMode,
} from '@chakra-ui/core';

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.900" }
  const color = { light: "gray.900", dark: "gray.100" }

  return (
    <React.Fragment>
      <Flex
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        w='100%'
        h='68px'
        justify='space-between'
        align='center'
        px='24px'
      >

        {/* Logo */}
        <Text fontSize='2xl' fontWeight='700' >
          <Link href='#' display='flex' alignItems='center'>
            <FaClipboardCheck style={{marginRight: '4px'}}/>Todolist
          </Link>
        </Text>

        {/* Menu */}
        <Flex align='center'>
          <Link>
            <Text
              textAlign='center'
              fontWeight='500'
              mr='24px'
              mb='1px'
            >Settings</Text>
          </Link>

          <Link d='flex'>
          {
            colorMode === 'light'
            ? <Icon onClick={() => toggleColorMode()} name="moon" size="20px"/>
            : <Icon onClick={() => toggleColorMode()} name="sun" size="20px"/>
          }
          </Link>

        </Flex>

      </Flex>
    </React.Fragment>
  );
}

export default Navbar;

