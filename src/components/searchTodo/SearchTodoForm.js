import { useState } from 'react';
import styles from './SearchTodoForm.module.css';
import { filterTodos } from '../../utils/filter-todos';

export const SearchTodoForm = ({ todos, onSetTodos, isReset, setIsReset }) => {
	const [searchInputValue, setSearchInputValue] = useState('');

	const onChange = ({ target }) => {
		setSearchInputValue(target.value);
	};

	const onSearchSubmit = (e) => {
		e.preventDefault();
		onSetTodos(filterTodos(searchInputValue, todos));
	};

	const onSearchReset = () => {
		setSearchInputValue('');
		setIsReset(!isReset);
	};
	return (
		<div>
			<form className={styles.searchForm} action="#" onSubmit={onSearchSubmit}>
				<input
					className={styles.searchInput}
					type="text"
					value={searchInputValue}
					onChange={onChange}
					placeholder="Поиск..."
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
