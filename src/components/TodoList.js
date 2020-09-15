import React from 'react';
import {
  Box,
  Flex,
  Checkbox,
  Text,
} from '@chakra-ui/core';
import TodoInput from './TodoInput';

function Todo(todo) {
  return (
    <li
      key={todo.id}
    >
      <Checkbox>
        <Text>
          {todo.title}
        </Text>
      </Checkbox>
    </li>
  );
}

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    }

    this.addTodo = this.addTodo.bind(this);
  }


  addTodo(todo) {
    this.setState((prevState) => {
      return ({
        todos: [...prevState.todos, todo],
      })
    });
    setTimeout(() => console.log(this.state.todos), 100)
  }

  render() {
    return (
      <Flex flexDir='column'>
        <Box minH='100px' p='24px'>
          <Flex justifyContent='center'>
            <TodoInput addTodo={this.addTodo}/>
          </Flex>
        </Box>

        <Box>
          <ul>
            {this.state.todos.map(todo => Todo(todo))}
          </ul>
        </Box>

      </Flex>
    );
  }
};
