export const useRequestAddNewTodo = (text, todos) => {
	const requstAddNewTodo = async () => {
		const newTodo = await fetch('http://localhost:3004/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				userId: 1,
				id: String(Date.now()),
				title: text,
				completed: false,
			}),
		});
		const addedTodo = await newTodo.json();
		const newTodos = [...todos, addedTodo];

		return newTodos;
	};

	return requstAddNewTodo;
};
