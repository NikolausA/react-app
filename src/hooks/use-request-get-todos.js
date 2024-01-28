export const useRequestGetTodos = () => {
	const getAllTodos = async (sortParam) => {
		const loadedData = await fetch(`http://localhost:3004/todos${sortParam}`);
		const todos = await loadedData.json();

		return todos;
	};

	return getAllTodos;
};
