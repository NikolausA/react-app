import { deleteTodoOnSerever } from '../api/api';

export const deleteTodo = (todoId) => {
	return (dispatch) => {
		return deleteTodoOnSerever(todoId).then((deletedTodo) => {
			dispatch({
				type: 'DELETE_TODO',
				payload: deletedTodo.id,
			});
		});
	};
};
