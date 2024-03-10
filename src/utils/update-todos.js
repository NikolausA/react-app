export const updateTodos = (todos, newTodoData) =>
	todos.map((todo) => (todo.id === newTodoData.id ? newTodoData : todo));
