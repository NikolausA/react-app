export const filterTodos = (text, todos) =>
	todos.filter(({ title }) => title.includes(text));
