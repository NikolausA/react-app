import { Link } from 'react-router-dom';
import styles from './todosList.module.css';
import { useEffect, useState } from 'react';
import { createTodo, readTodos, updateTodo, deleteTodo } from '../../api/api';
import { SearchTodoForm } from '../searchTodo/SearchTodoForm';

export const TodosList = () => {
	const [todos, setTodos] = useState([]);
	const [newTodoTitle, setNewTodoTitle] = useState('');
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);
	const [isReset, setIsReset] = useState(false);

	useEffect(() => {
		readTodos(searchPhrase, isAlphabetSorting).then((loadedTodos) =>
			setTodos(loadedTodos),
		);
	}, [searchPhrase, isAlphabetSorting, isReset]);

	const handleSortButton = () => {
		setIsAlphabetSorting(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createTodo({ title: newTodoTitle, completed: false }).then(
			({ id, title, completed }) => setTodos([...todos, { id, title, completed }]),
		);
		setNewTodoTitle('');
	};

	const onChange = ({ target }) => {
		setNewTodoTitle(target.value);
	};

	return (
		<div className={styles.todoList}>
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
			<SearchTodoForm
				todos={todos}
				onSetTodos={setTodos}
				isReset={isReset}
				setIsReset={setIsReset}
			/>
			<h1 className={styles.title}>Todo List (Список задач)</h1>
			<div className={styles.titleLine}>
				<div>#</div>
				<div className={styles.todosTitle}>Todos Name</div>
				<button className={styles.sort} onClick={handleSortButton} />
			</div>
			<div className={styles.todoWrapper}>
				{todos.map(({ id, title, completed }, index) => (
					<div key={id}>
						<Link
							className={styles.item}
							to={`/todos/${id}`}
							state={{ todos }}
						>
							<span>{index + 1}. </span>
							<input type="checkbox" checked={completed} readOnly />
							<p className={styles.itemText}>{title}</p>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};
