const todosKey = 'todos';

export const getDaysWithTodosForMonth = (month: number) => {
  const todosJSON = localStorage.getItem(todosKey);
  if (!todosJSON) return [];

  const todosParsed = JSON.parse(todosJSON);

  const dates = Object.keys(todosParsed).filter((date) => {
    const monthTodo = Number(date.split('/')[1]);
    return monthTodo === month && todosParsed[date].length !== 0;
  });

  return dates.map((date) => Number(date.split('/')[0]));
};

export const getTodosFromLocalStorage = (date: string) => {
  if (date === '') return [];
  const todosJSON = localStorage.getItem(todosKey);

  if (!todosJSON) return [];

  const todosForCurrentDay = JSON.parse(todosJSON)[date];

  if (!todosForCurrentDay) return [];
  return todosForCurrentDay;
};

export const addTodoToLocalStorage = (date: string, todo: string) => {
  const todosJSON = localStorage.getItem(todosKey);

  const todosParsed = JSON.parse(todosJSON);

  if (!todosJSON) {
    const todos = {
      [date]: [todo],
    };
    localStorage.setItem(todosKey, JSON.stringify(todos));
  } else if (!todosParsed[date]) {
    const todosWithNewDate = {
      ...todosParsed,
      [date]: [todo],
    };
    localStorage.setItem(todosKey, JSON.stringify(todosWithNewDate));
  } else {
    todosParsed[date].push(todo);
    localStorage.setItem(todosKey, JSON.stringify(todosParsed));
  }
};

export const removeTodoFromLocalStorage = (date: string, todo: string[]) => {
  const todosJSON = localStorage.getItem(todosKey);

  const todosParsed = JSON.parse(todosJSON);

  todosParsed[date] = todo;
  localStorage.setItem(todosKey, JSON.stringify(todosParsed));
};

// console.log('todos after - ', todos);
// const todos = {
//   '23/3/2024': ['wdawd', 'wdawa'],
//   '24/12/2024': ['wdawd'],
// }
