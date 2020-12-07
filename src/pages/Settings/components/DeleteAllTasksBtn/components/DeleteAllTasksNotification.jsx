import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text } from '@chakra-ui/core';

const DeleteAllTasksNotification = () => (
  <Flex
    backgroundColor="red.600"
    m={3}
    py={3}
    px={5}
    justifyContent="space-between"
    alignContent="center"
  >
    <Text mr="1em" pt=".2rem" color="white">
      All the tasks have been deleted
    </Text>
  </Flex>
);

DeleteAllTasksNotification.propTypes = {};

export default DeleteAllTasksNotification;
