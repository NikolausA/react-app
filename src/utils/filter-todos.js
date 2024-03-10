export const filterTodos = (todos, text) =>
	todos.filter(({ title }) => title.includes(text));
