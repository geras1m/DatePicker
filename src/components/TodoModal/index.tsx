import { TodoInput } from '@components/TodoModal/TodoInput';
import { Todos } from '@components/TodoModal/Todos';
import {
  addTodoToLocalStorage,
  getTodosFromLocalStorage,
  removeTodoFromLocalStorage,
} from '@utils/calendar/localStorage';
import { ChangeEvent, FC, useMemo, useState } from 'react';

interface TodoModalProps {
  date: string;
  closeModal: () => void;
}

export const TodoModal: FC<TodoModalProps> = ({ date, closeModal }) => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<string[] | []>(getTodosFromLocalStorage(date)); // []

  useMemo(() => {
    setTodos(getTodosFromLocalStorage(date));
  }, [date]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addTodo = () => {
    if (inputValue.length !== 0) {
      addTodoToLocalStorage(date, inputValue);
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveTodo = (removeIndex: number) => {
    const todosWithoutRemoveItem = todos.filter((_, index) => index !== removeIndex);
    setTodos(todosWithoutRemoveItem);
    removeTodoFromLocalStorage(date, todosWithoutRemoveItem);
  };

  return (
    <div>
      <button type='button' onClick={closeModal}>
        close
      </button>
      <TodoInput value={inputValue} inputChange={handleInputChange} addTodo={addTodo} />
      <Todos todos={todos} removeTodo={handleRemoveTodo} />
    </div>
  );
};
