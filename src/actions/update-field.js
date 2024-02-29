export const updateField = (newField) => {
	return {
		type: 'UPDATE_FIELD',
		payload: newField,
	};
};
