import { initialState } from './initialState';

export const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'UPDATE_FIELD':
			return { ...state, field: payload };
		case 'CHANGE_CURRENT_PLAYER':
			return { ...state, currentPlayer: !state.currentPlayer };
		case 'SET_GAME_OVER':
			return { ...state, isGameEnded: true };
		case 'SET_DRAW':
			return { ...state, isDraw: true };
		case 'RESET':
			return initialState;
		default:
			return state;
	}
};
