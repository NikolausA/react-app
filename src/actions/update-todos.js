import { updateTodoOnSerever } from '../api/api';

export const updateTodos = (todoData) => {
	return (dispatch) => {
		return updateTodoOnSerever(todoData).then((updatedTodo) => {
			dispatch({
				type: 'UPDATE_TODO',
				payload: updatedTodo,
			});
		});
	};
};
