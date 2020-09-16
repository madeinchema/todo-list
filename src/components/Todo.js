import React from 'react';
import { Checkbox, Text } from '@chakra-ui/core';

export default function Todo({ todo, handleChange }) {
  return (
    <li>
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
