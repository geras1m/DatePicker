import { ChangeEvent, FC } from 'react';

interface TodoInputProps {
  value: string;
  inputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  addTodo: () => void;
}

export const TodoInput: FC<TodoInputProps> = ({ value, inputChange, addTodo }) => {
  return (
    <div>
      <input type='text' value={value} onChange={inputChange} />
      <button onClick={addTodo} type='button'>
        add
      </button>
    </div>
  );
};
