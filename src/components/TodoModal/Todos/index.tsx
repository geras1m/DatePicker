import { TodoButton, TodosItem, TodosList, TodoText } from '@components/TodoModal/Todos/styled';
import { FC } from 'react';

interface TodoItemProps {
  todos: string[] | [];
  removeTodo: (removeId: number) => void;
}

export const Todos: FC<TodoItemProps> = ({ todos, removeTodo }) => {
  return (
    <TodosList>
      {todos.map((todo, index) => {
        return (
          <TodosItem key={index}>
            <TodoText>{todo}</TodoText>
            <TodoButton type='button' onClick={() => removeTodo(index)}>
              X
            </TodoButton>
          </TodosItem>
        );
      })}
    </TodosList>
  );
};
