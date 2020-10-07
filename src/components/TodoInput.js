import React, { useState, useContext, useRef } from 'react';
import {
  Box,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  Flex,
  Icon,
  MenuItem,
  PseudoBox,
  MenuButton,
  Menu,
  MenuList,
} from '@chakra-ui/core';
import { TodoContext } from '../contexts/TodoContext';
import { MdFlag } from 'react-icons/all';
import Link from '@chakra-ui/core/dist/Link';

export default function TodoInput() {
  const { dispatch } = useContext(TodoContext);
  const [inputTitle, setInputTitle] = useState('');
  const [inputPriority, setInputPriority] = useState(4);
  const inputTitleRef = useRef();

  // Task title input value handler for controlled component
  const handleTitle = (event) => {
    setInputTitle(event.target.value);
  }

  // Adds the new to-do to the TodoList's state
  const handleSubmit = (event) => {
    event.preventDefault();
    let title = inputTitle.trim().toString(); // Remove whitespace from both ends & make sure it's a string
    dispatch({ type: 'ADD_TODO', title, priority: inputPriority });
    setInputTitle('');
    inputTitleRef.current.focus();
  }

  const handleInputPriority = (priority) => {
    setInputPriority(priority);
    inputTitleRef.current.focus();
  }

  const styles = {
    color: `${inputPriority === 1 ? 'red.600'
      : inputPriority === 2 ? 'yellow.500'
        : inputPriority === 3 ? 'blue.400'
          : inputPriority === 4 && 'gray.500' }`,
  }

  return (
    <Flex flexDir='column'>
      <Box minH='100px' p='1.75rem 1.5rem'>
        <Flex justifyContent='center'>

          <Box
            w='100%'
            maxW='680px'
            as='form'
          >
            <InputGroup
              size="md"
              shadow='md'
              borderRadius='5px'
            >

              <Input
                h='3rem'
                pr="8rem"
                fontSize='1.2em'
                fontWeight='500'
                type="text"
                placeholder="Task title"
                value={inputTitle}
                onChange={handleTitle}
                ref={inputTitleRef}
              />

              <InputRightElement w="8rem" h='100%' p='0.25rem'>
                <Menu>
                  <PseudoBox
                    style={{ transition: 'all .1s ease-out' }}
                    d='flex'
                    opacity='0.75'
                    _hover={{ opacity: "1" }}
                    w='25%'
                    h='100%'
                  >
                    <MenuButton
                      as={Link}
                      aria-label="Search database"
                      d='flex'
                      w='25%'
                    >
                      <Icon
                        alignSelf='center'
                        as={MdFlag}
                        color={styles.color}
                        size='1.5rem'
                        h='100%'
                      />
                    </MenuButton>
                  </PseudoBox>

                  <MenuList>
                      <MenuItem onClick={() => handleInputPriority(1)}>
                        <Icon aria-label="Priority 1" as={MdFlag} color='red.600' size='1.5rem' mr='.5rem'/>Priority 1
                      </MenuItem>
                      <MenuItem onClick={() => handleInputPriority(2)}>
                        <Icon aria-label="Priority 2" as={MdFlag} color='yellow.500' size='1.5rem' mr='.5rem'/>Priority 2
                      </MenuItem>
                      <MenuItem onClick={() => handleInputPriority(3)}>
                        <Icon aria-label="Priority 3" as={MdFlag} color='blue.400' size='1.5rem' mr='.5rem'/>Priority 3
                      </MenuItem>
                      <MenuItem onClick={() => handleInputPriority(4)}>
                        <Icon aria-label="Priority 4" as={MdFlag} color='gray.500' size='1.5rem' mr='.5rem'/>Priority 4
                      </MenuItem>
                  </MenuList>
                </Menu>

                <Button
                  h='100%'
                  w="75%"
                  type='submit'
                  onClick={handleSubmit}
                  isDisabled={!inputTitle}
                >
                  Add Task
                </Button>
              </InputRightElement>

            </InputGroup>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
