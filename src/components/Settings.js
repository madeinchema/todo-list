import React, {useContext} from 'react';
import { Link as ReactLink } from 'react-router-dom';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/core';
import { MdArrowBack} from 'react-icons/all';
import { TasksContext } from '../contexts/TasksContext';

const Settings = () => {
  const { dispatch } = useContext(TasksContext);
  const { colorMode } = useColorMode();
  const deleteBtnColor = { light: 'red.600', dark: 'red.400' };
  const dividerColor = { light: 'gray.400', dark: 'gray.600' };
  const goBackBtnColor = {
    light: ['gray.200', 'gray.300'],
    dark: ['gray.800', 'gray.700'],
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteAll = () => {
    dispatch({
      type: 'DELETE_ALL',
    });
    onClose();
  }

  const DeleteAllModal = () => (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Delete all the tasks</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          Are you sure you want to delete all the tasks? This action is irreversible.
        </ModalBody>
        <ModalFooter>
          <Button
            variantColor="blue"
            mr={3}
            onClick={onClose}
          >No</Button>
          <Button
            variantColor='red'
            onClick={handleDeleteAll}
          >Yes, delete all the tasks</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <Box
      mx='auto'
      mb='5rem'
      p='2rem 1rem'
      maxW='512px'
      w='100%'
    >
      <Flex w='100%' justify='space-between' align='center' my='1.5rem'>
        <Box flexGrow='1' width='100%'>
          <Button
            size='sm'
            as={ReactLink}
            to='/'
            bg={goBackBtnColor[colorMode][0]}
            _hover={{
              bg: goBackBtnColor[colorMode][1]
            }}
          >
            <Icon as={MdArrowBack} mr='.25rem'/>
            <Text mb='.05rem'>Go back</Text>
          </Button>
        </Box>

        <Box>
          <Heading size='lg' mb='.125rem'>Settings</Heading>
        </Box>

        <Box flexGrow='1' width='100%'/>
      </Flex>

      <Flex direction='column'>
        <Heading size='mg' mb='.75rem'>Notes and Lists</Heading>
        <Flex justify='space-between' align='center' mb='.75rem'>
          <Text>Move completed tasks to the bottom</Text>
          <Switch size="sm" isDisabled={true}/>
        </Flex>
        <Divider borderColor={dividerColor[colorMode]}/>
        <Flex align='center' my='.75rem'>
          <Button
            borderColor={deleteBtnColor[colorMode]}
            color={deleteBtnColor[colorMode]}
            variant='outline'
            variantColor='red'
            onClick={onOpen}
          >Delete all the tasks</Button>
        </Flex>
      </Flex>

      <DeleteAllModal />
    </Box>
  );
};

export default Settings;
