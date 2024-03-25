import { AddButton, InputTodo, InputWrapper } from '@components/TodoModal/TodoInput/styled';
import { ChangeEvent, FC } from 'react';

interface TodoInputProps {
  value: string;
  inputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  addTodo: () => void;
}

export const TodoInput: FC<TodoInputProps> = ({ value, inputChange, addTodo }) => {
  return (
    <InputWrapper>
      <InputTodo type='text' value={value} onChange={inputChange} placeholder='Your task' />
      <AddButton onClick={addTodo} type='button'>
        Add
      </AddButton>
    </InputWrapper>
  );
};
