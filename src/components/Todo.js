import React from "react";
import {
  Box,
  Flex,
  Button,
} from "@chakra-ui/core";
import NewTask from './NewTask';

const Todo = () => {
  return (
    <Flex flexDir='column'>
      <Box minH='100px' p='24px'>
        <Flex justifyContent='center'>
          <NewTask/>
        </Flex>
      </Box>

      <Box >
        <Button>Todo</Button>
      </Box>
    </Flex>
  )
}

export default Todo;
