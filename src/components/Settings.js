import React from 'react';
import { Box, Flex, Text, Button, Checkbox, Icon, Heading } from '@chakra-ui/core';
import { MdArrowBack} from 'react-icons/all';

const Settings = () => {
  return (
    <Box mx='.5rem' mb='5rem'>
      <Flex w='100%' justify='space-between' mb='1rem'>
        <Heading size='lg'>Settings</Heading>
        <Button size='sm'>
          <Icon as={MdArrowBack} mr='.25rem'/>
          <Text mb='.05rem'>Go back</Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default Settings;
