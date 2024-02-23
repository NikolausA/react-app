export const deleteFromTodos = (todos, todoId) => todos.filter(({ id }) => id !== todoId);
