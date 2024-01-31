import { useState } from 'react';
import styles from './SearchTodoForm.module.css';

export const SearchTodoForm = ({ todos, setTodos, requestSearchTodo }) => {
	const [searchTodo, setSearchTodo] = useState('');

	const onChange = ({ target }) => {
		setSearchTodo(target.value);
	};

	const onSearchSubmit = () => {
		setTodos(requestSearchTodo(searchTodo, todos));
	};

	const onSearchReset = () => {
		setSearchTodo('');
		setTodos(todos);
	};
	return (
		<div>
			<form className={styles.searchForm} action="#" onSubmit={onSearchSubmit}>
				<input
					className={styles.searchInput}
					type="text"
					value={searchTodo}
					onChange={onChange}
				/>
				<button className={styles.searchSubmitBtn} type="submit">
					Найти
				</button>
				<button
					className={styles.searchResetBtn}
					type="reset"
					onClick={onSearchReset}
				>
					Сбросить
				</button>
			</form>
		</div>
	);
};
