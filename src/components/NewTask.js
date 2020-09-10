import React from 'react';
import {
  Box,
  Button,
  Input,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/core';

export default function NewTask() {

  return (
    <Box
      w='100%'
      maxW='680px'
      as='form'
    >
      <InputGroup size="md" shadow='lg'>

        <Input
          h='3rem'
          pr="7.5rem"
          fontWeight='500'
          type="text"
          placeholder="Task title"
        />

        <InputRightElement w="7.5rem" h='100%' p='0.25rem'>
          <Button
            h='100%'
            w="100%"
            type='submit'
          >
            Add Task
          </Button>

        </InputRightElement>

      </InputGroup>
    </Box>
  );
}
