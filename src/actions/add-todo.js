import { createTodoOnSerever } from '../api/api';

export const addTodo = (newTodo) => {
	return (dispatch) => {
		return createTodoOnSerever(newTodo).then((addedTodo) => {
			dispatch({
				type: 'ADD_TODO',
				payload: addedTodo,
			});
		});
	};
};
