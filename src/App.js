import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import { TodosList, TodoItem, NotFound } from './components';

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<TodosList />} />
			<Route path="/todos/:id" element={<TodoItem />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
