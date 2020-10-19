import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Box, Flex, Text, Button, Switch, Icon, Heading, Divider, useColorMode } from '@chakra-ui/core';
import { MdArrowBack} from 'react-icons/all';

const Settings = () => {
  const { colorMode } = useColorMode();
  const deleteBtnColor = { light: 'red.600', dark: 'red.400' };
  const dividerColor = { light: 'gray.400', dark: 'gray.600' };


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
        <Divider borderColor={dividerColor[colorMode]}/>
        <Flex align='center' my='.75rem'>
          <Button
            borderColor={deleteBtnColor[colorMode]}
            color={deleteBtnColor[colorMode]}
            variant='outline'
            variantColor='red'
          >Delete all the tasks</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Settings;
