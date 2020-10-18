import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Box, Flex, Text, Button, Switch, Icon, Heading } from '@chakra-ui/core';
import { MdArrowBack} from 'react-icons/all';

const Settings = () => {
  return (
    <Box
      mx='auto'
      mb='5rem'
      p='2rem 1rem'
      maxW='512px'
      w='100%'
      h="calc(100vh - 72px)"
    >
      <Flex w='100%' justify='space-between' align='center' mb='1.5rem'>

        <Box flexGrow='1' width='100%'>
          <Button size='sm' as={ReactLink} to='/'>
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
      </Flex>
    </Box>
  );
};

export default Settings;
