import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';
import { EditModalWindow, SearchTodoForm, TodoItem } from './components';
import { selectTodos, selectIsAlphabetSorting, selectIsModal } from './selectors';
import { getTodos, addTodo, deleteTodo, setSortingTrue } from './actions';

export const App = () => {
	const [newTodoTitle, setNewTodoTitle] = useState('');
	const isModal = useSelector(selectIsModal);
	const isAlphabetSorting = useSelector(selectIsAlphabetSorting);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTodos(isAlphabetSorting));
	}, [isAlphabetSorting]);

	const todos = useSelector(selectTodos);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addTodo({ title: newTodoTitle, completed: false }));
		setNewTodoTitle('');
	};

	const onChange = ({ target }) => {
		setNewTodoTitle(target.value);
	};

	const handleSortButton = () => {
		dispatch(setSortingTrue);
	};

	return (
		<div className={styles.app}>
			<EditModalWindow isModal={isModal} />
			<form action="#" className={styles.form} onSubmit={handleSubmit}>
				<input
					className={styles.newTodoInput}
					type="text"
					name="newTask"
					value={newTodoTitle}
					placeholder="новая задача"
					onChange={onChange}
				/>
				<button className={styles.addTodoBtn} type="submit">
					Добавить задачу
				</button>
			</form>
			<SearchTodoForm />
			<h1 className={styles.title}>Todo List (Список задач)</h1>
			<div className={styles.titleLine}>
				<div>#</div>
				<div className={styles.todosTitle}>Todos Name</div>
				<button
					className={styles.sort}
					type="button"
					onClick={handleSortButton}
				/>
			</div>
			<div className={styles.todosWrapper}>
				{todos.map(({ id, title, completed }, index) => (
					<TodoItem
						key={id}
						id={id}
						title={title}
						completed={completed}
						index={index}
					/>
				))}
			</div>
		</div>
	);
};
