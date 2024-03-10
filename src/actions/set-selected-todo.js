export const setSelectedTodo = (selectedTodo) => {
	return {
		type: 'SET_SELECTED_TODO',
		payload: selectedTodo,
	};
};
