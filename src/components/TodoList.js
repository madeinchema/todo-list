import React from 'react';
import {
  Box,
  Flex,
  Checkbox,
  Text,
} from '@chakra-ui/core';
import TodoInput from './TodoInput';

/**
 * To-do component template
 */
function Todo({ todo, handleChange }) {
  return (
    <li key={todo.id}>
      <Checkbox
        isChecked={todo.checked}
        onChange={() => handleChange(todo.id)}
      >
        <Text>
          {todo.title}
        </Text>
      </Checkbox>
    </li>
  );
}

/**
 * Todo: Will only render TodoList
 */
export default class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          id: 229,
          title: 'Practice React without hooks',
          checked: false,
          indent: 1,
          priority: 4,
        },
        {
          id: 1239,
          title: 'Knowledge',
          checked: true,
          indent: 1,
          priority: 4,
        },
      ],
    }

    this.addTodo = this.addTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Adds a new to-do object to the "todos" state
  addTodo(todo) {
    this.setState((prevState) => {
      return ({
        todos: [...prevState.todos, todo],
      })
    });
    setTimeout(() => console.log(this.state.todos), 100)
  }

  // Updates the state of a to-do's checkbox
  handleChange(id) {
    this.setState(prevState => ({
      todos: prevState.todos.map(
        todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    }));
  }

  render() {
    return (
      <Flex flexDir='column'>
        <Box minH='100px' p='24px'>
          <Flex justifyContent='center'>
            <TodoInput addTodo={this.addTodo}/>
          </Flex>
        </Box>

        <Flex align="center" justify="center" h="calc(100vh - 168px)" direction="column">
          <Box className='custom-scroll' h='100%' w='100%' maxW='680px' px='32px' py='24px' bg='rgba(0,0,0,.1)'
               overflow='auto'>
            <Flex id='todoList' flexDir='column'>

              <ul>
                {this.state.todos.map(todo => (
                  <Todo todo={todo} handleChange={this.handleChange} />
                ))}
              </ul>

            </Flex>
          </Box>
        </Flex>

      </Flex>
    );
  }
};
