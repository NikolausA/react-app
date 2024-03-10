import { useRef } from 'react';
import styles from './SearchTodoForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAlphabetSorting } from '../../selectors';
import { getTodos, setFilteredTodos } from '../../actions';

export const SearchTodoForm = () => {
	const isAlphabetSorting = useSelector(selectIsAlphabetSorting);
	const dispatch = useDispatch();
	const searchingText = useRef();

	const onSearchSubmit = (e) => {
		dispatch(setFilteredTodos(searchingText.current.value));
	};

	const onSearchReset = () => {
		dispatch(getTodos(isAlphabetSorting));
	};
	return (
		<div>
			<form className={styles.searchForm} action="#" onSubmit={onSearchSubmit}>
				<input className={styles.searchInput} type="text" ref={searchingText} />
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
