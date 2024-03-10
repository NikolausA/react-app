import { readTodosOnSerever } from '../api/api';

export const getTodos = (isAlphabetSorting) => {
	return (dispatch) => {
		return readTodosOnSerever(isAlphabetSorting).then((loadedTodos) => {
			dispatch({
				type: 'SET_TODOS',
				payload: loadedTodos,
			});
		});
	};
};
