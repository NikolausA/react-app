export const setFilteredTodos = (text) => {
	return {
		type: 'FILTER_TODOS',
		payload: text,
	};
};
