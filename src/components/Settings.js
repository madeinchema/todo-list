import React from 'react';
import { Box, Flex, Text, Link, Button, Switch, Icon, Heading } from '@chakra-ui/core';
import { MdArrowBack} from 'react-icons/all';

const Settings = () => {
  return (
    <Box maxW='384px' w='100%' mx='auto' mb='5rem' p='1rem'>
      <Flex w='100%' justify='space-between' align='center' mb='1.5rem'>

        <Box flexGrow='1' width='100%'>
          <Button size='sm' as={Link} href='/'>
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
          <Switch size="sm" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Settings;
