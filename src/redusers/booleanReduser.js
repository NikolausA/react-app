const initialBooleanState = { isModal: false, isAlphabetSorting: false, isReset: false };

export const booleanReduser = (state = initialBooleanState, action) => {
	switch (action.type) {
		case 'SET_MODAL_TRUE':
			return { ...state, isModal: true };
		case 'SET_MODAL_FALSE':
			return { ...state, isModal: false };
		case 'SET_SORTING_TRUE':
			return { ...state, isAlphabetSorting: true };
		case 'SET_SORTING_FALSE':
			return { ...state, isAlphabetSorting: false };
		default:
			return state;
	}
};
