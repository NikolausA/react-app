import { HTTP_METHOD } from '../constants';

export const fetchData = (method, { id, ...payload } = {}) => {
	let url = 'http://localhost:3004/todos';
	let options = {
		method,
		headers: { 'Content-Type': 'application/json' },
	};

	if (method === HTTP_METHOD.GET) {
		const { isAlphabetSorting } = payload;
		const sortingParams = isAlphabetSorting ? '_sort=title' : '_sort=id';
		url += `?${sortingParams}`;
	} else {
		if (method !== HTTP_METHOD.POST) {
			url += `/${id}`;
		}

		if (method !== HTTP_METHOD.DELETE) {
			options.body = JSON.stringify(payload);
		}
	}

	return fetch(url, options).then((jsonData) => jsonData.json());
};

export const createTodoOnSerever = (newTodo) => fetchData('POST', newTodo);

export const readTodosOnSerever = (isAlphabetSorting = false) =>
	fetchData('GET', { isAlphabetSorting });

export const updateTodoOnSerever = (todoData) => fetchData('PUT', todoData);

export const deleteTodoOnSerever = (todoId) => fetchData('DELETE', { id: todoId });
