import { createStore, combineReducers, applyMiddleware } from 'redux';
import { booleanReduser, todosReduser } from './redusers';
import { thunk } from 'redux-thunk';

const reduser = combineReducers({
	todosState: todosReduser,
	booleanState: booleanReduser,
});

export const store = createStore(reduser, applyMiddleware(thunk));
