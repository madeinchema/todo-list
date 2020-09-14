import React from 'react';
import {
  Box,
  Button,
  Input,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/core';

const generateId = () => {
  // todo pseudocode: while (newId in todoList) {generator}
  return Math.floor(Math.random() * 10000);
}

function Todo(title) {
  return {
    id: generateId(),
    title: title,
    checked: false,
    indent: 1,
    priority: 4,
  }
}

export default class TodoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      title: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addTodo(Todo(this.state.title));
  }

  render() {
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
            value={this.state.title}
            onChange={this.handleChange}
          />

          <InputRightElement w="7.5rem" h='100%' p='0.25rem'>
            <Button
              h='100%'
              w="100%"
              type='submit'
              onClick={this.handleSubmit}
            >
              Add Task
            </Button>

          </InputRightElement>

        </InputGroup>
      </Box>
    );
  }
};
