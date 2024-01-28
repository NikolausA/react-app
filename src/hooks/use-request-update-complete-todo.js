export const useRequestUpdateCompleteTodo = (refreshProducts) => {
	const requestUpdateCompleteTodo = async (id, completed) => {
		const res = await fetch(`http://localhost:3004/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ completed: !completed }),
		});
		const response = await res.json();
		refreshProducts();
		console.log(response);
	};

	return requestUpdateCompleteTodo;
};
