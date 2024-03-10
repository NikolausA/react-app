import { updateTodos, deleteFromTodos, filterTodos } from '../utils';

const initialTodosState = {
	todos: [],
	filteredTodos: [],
	selectedTodo: {},
};

export const todosReduser = (state = initialTodosState, action) => {
	switch (action.type) {
		case 'SET_TODOS':
			return { ...state, todos: action.payload };
		case 'SET_SELECTED_TODO':
			return { ...state, selectedTodo: action.payload };
		case 'UPDATE_TODO':
			return { ...state, todos: updateTodos(state.todos, action.payload) };
		case 'ADD_TODO':
			return { ...state, todos: [...state.todos, action.payload] };
		case 'DELETE_TODO':
			return { ...state, todos: deleteFromTodos(state.todos, action.payload) };
		case 'FILTER_TODOS':
			return { ...state, todos: filterTodos(state.todos, action.payload) };
		default:
			return state;
	}
};
