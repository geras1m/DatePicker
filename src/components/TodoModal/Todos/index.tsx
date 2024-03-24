import { FC } from 'react';

interface TodoItemProps {
  todos: string[] | [];
  removeTodo: (removeId: number) => void;
}

export const Todos: FC<TodoItemProps> = ({ todos, removeTodo }) => {
  return (
    <ul>
      {todos.map((todo, index) => {
        return (
          <li key={todo}>
            <span>{todo}</span>
            <button type='button' onClick={() => removeTodo(index)}>
              close
            </button>
          </li>
        );
      })}
    </ul>
  );
};
