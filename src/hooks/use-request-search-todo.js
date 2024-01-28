export const useRequestSearchTodo = () => {
	const requestSearchTodo = (text, todos) => {
		let filteredTodos = todos.filter((todo) => todo.title.includes(text));
		return filteredTodos;
	};

	return requestSearchTodo;
};
