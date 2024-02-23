import { useRef, useContext } from 'react';
import { AppContext } from '../../context';
import styles from './SearchTodoForm.module.css';
import { filterTodos } from '../../utils/filter.todos';

export const SearchTodoForm = ({ isReset, setIsReset }) => {
	const { todos, dispatch } = useContext(AppContext);
	const searchingText = useRef();

	const onSearchSubmit = (e) => {
		e.preventDefault();
		dispatch({
			type: 'SET_TODOS',
			payload: filterTodos(searchingText.current.value, todos),
		});
	};

	const onSearchReset = () => {
		setIsReset(!isReset);
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
