import React from 'react';
import PropTypes from 'prop-types';
import { Button, useColorMode, useDisclosure } from '@chakra-ui/core';
import DeleteAllTasksModal from './components/DeleteAllTasksModal';

const deleteBtnColor = { light: 'red.600', dark: 'red.400' };

const DeleteAllTasksBtn = (props) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        borderColor={deleteBtnColor[colorMode]}
        color={deleteBtnColor[colorMode]}
        variant="outline"
        variantColor="red"
        onClick={onOpen}
      >
        Delete all the tasks
      </Button>

      <DeleteAllTasksModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

DeleteAllTasksBtn.propTypes = {};

export default DeleteAllTasksBtn;
