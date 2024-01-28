export const useRequestUpdateTodo = (refreshProducts) => {
	const requestUpdateTodo = async (id, text) => {
		const res = await fetch(`http://localhost:3004/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id: id,
				title: text,
			}),
		});

		const response = await res.json();
		refreshProducts();
		console.log(response);
	};

	return requestUpdateTodo;
};
