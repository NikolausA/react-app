export const useRequestDeletetodo = (refreshProducts) => {
	const requestDeleteTodo = async (id) => {
		try {
			const res = await fetch(`http://localhost:3004/todos/${id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
			});

			const deletedTodo = await res.json();
			console.log(deletedTodo);
			refreshProducts();
		} catch (error) {
			console.log('Error: ', error);
		}
	};

	return requestDeleteTodo;
};
