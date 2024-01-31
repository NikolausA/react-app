export const useRequestSearchTodo = () => {
	const requestSearchTodo = (text, todos) => {
		return todos.filter((item) => item[1].title.includes(text));
	};

	return requestSearchTodo;
};
