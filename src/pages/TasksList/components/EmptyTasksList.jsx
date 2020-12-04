import React from "react";
import { Flex, Heading, Icon } from "@chakra-ui/core";
import { MdCheck } from "react-icons/md";

const EmptyTasksList = (props) => {
  return (
    <Flex justify="center" align="center" height="40vh" direction="column">
      <Icon as={MdCheck} size="4rem" />
      <Heading size="lg">There are no tasks</Heading>
    </Flex>
  );
};

export default EmptyTasksList;
