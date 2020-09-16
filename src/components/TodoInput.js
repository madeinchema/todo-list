import React from 'react';
import {
  Box,
  Button,
  Input,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/core';


export default class TodoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '' }
  }

  // To-do title controlled component
  handleChange = (event) => {
    this.setState({ title: event.target.value })
  }

  // Adds the new to-do to the TodoList's state
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addTodo(this.todo(this.state.title));
    this.setState({ title: '' });
  }

  // Generates random IDs for the to-dos
  newId = () => {
    // todo pseudocode: while (newId in todoList) {generator}
    return Math.floor(Math.random() * 10000);
  }

  // To-do object template
  todo = (title) => {
    return ({
      id: this.newId(),
      title: title,
      checked: false,
      indent: 1,
      priority: 4,
    })
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
