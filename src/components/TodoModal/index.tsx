import { CloseButton, ModalWrapper, Title } from '@components/TodoModal/styled';
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

  const parseDate = date.split('/');
  const month = String(+parseDate[1] + 1);
  parseDate.splice(1, 1, month);
  const ModalTitle = parseDate.join('/');

  return (
    <ModalWrapper>
      <CloseButton type='button' onClick={closeModal}>
        X
      </CloseButton>
      <Title>Date: {ModalTitle}</Title>
      <TodoInput value={inputValue} inputChange={handleInputChange} addTodo={addTodo} />
      <Todos todos={todos} removeTodo={handleRemoveTodo} />
    </ModalWrapper>
  );
};
