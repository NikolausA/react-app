import { HTTP_METHOD } from '../constants';

export const fetchData = (method, { id, ...payload } = {}) => {
	let url = 'http://localhost:3004/todos';
	let options = {
		method,
		headers: { 'Content-Type': 'application/json' },
	};

	if (method === HTTP_METHOD.GET) {
		const { searchPhrase, isAlphabetSorting } = payload;
		const sortingParams = isAlphabetSorting ? '_sort=title' : '_sort=id';
		url += `?${sortingParams}&title_like=${searchPhrase}`;
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

export const createTodo = (newTodo) => fetchData('POST', newTodo);

export const readTodos = (searchPhrase = '', isAlphabetSorting = false) =>
	fetchData('GET', { searchPhrase, isAlphabetSorting });

export const updateTodo = (todoData) => fetchData('PUT', todoData);

export const deleteTodo = (todoId) => fetchData('DELETE', { id: todoId });
