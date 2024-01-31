import { useEffect, useState } from 'react';
import {
	useRequestAddNewTodo,
	useRequestUpdateCompleteTodo,
	useRequestUpdateTodo,
	useRequestDeletetodo,
	useRequestSearchTodo,
} from './hooks';
import styles from './App.module.css';
import { EditModalWindow, SearchTodoForm } from './components';
import { ref, onValue, query, orderByChild, orderByValue } from 'firebase/database';
import { db } from './firebase';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [sortedTodos, setSortedTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [isModal, setIsModal] = useState(false);
	const [isSorted, setIsSorted] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState([
		'1',
		{ completed: false, title: '' },
	]);

	const requestAddNewTodo = useRequestAddNewTodo();
	const requestDeleteTodo = useRequestDeletetodo();
	const requestUpdateCompleteTodo = useRequestUpdateCompleteTodo();
	const requestUpdateTodo = useRequestUpdateTodo();
	const requestSearchTodo = useRequestSearchTodo();

	useEffect(() => {
		if (isSorted) {
			setSortedTodos(sortedTodos);
		} else {
			const todosDbRef = ref(db, 'todos');
			return onValue(todosDbRef, (snapshot) => {
				const loadedTodos = Object.entries(snapshot.val());
				setTodos(loadedTodos);
			});
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		requestAddNewTodo(newTodo);
		setNewTodo('');
	};

	const onChange = ({ target }) => {
		setNewTodo(target.value);
	};

	const handleDelete = (id) => {
		requestDeleteTodo(id);
	};

	const handleCheckboxClick = (id, completed) => {
		requestUpdateCompleteTodo(id, completed);
	};

	const handleSortButton = () => {
		const todosSorted = todos.sort((a, b) => (a[1].title > b[1].title ? 1 : -1));
		setSortedTodos(todosSorted);
		setIsSorted(true);
	};

	const getEditedTodo = (id) => {
		return todos.find((item) => item[0] === id);
	};

	const handleModalOpen = (id) => {
		const editedTodo = getEditedTodo(id);
		setSelectedTodo(editedTodo);
		setIsModal(true);
	};

	const handleModalClose = () => {
		setIsModal(false);
	};

	return (
		<div className={styles.app}>
			<EditModalWindow
				isModal={isModal}
				selectedTodo={selectedTodo}
				onClose={handleModalClose}
				requestUpdateTodo={requestUpdateTodo}
			/>
			<form action="#" className={styles.form} onSubmit={handleSubmit}>
				<input
					className={styles.newTodoInput}
					type="text"
					name="newTask"
					value={newTodo}
					placeholder="новая задача"
					onChange={onChange}
				/>
				<button className={styles.addTodoBtn} type="submit">
					Добавить задачу
				</button>
			</form>
			<SearchTodoForm
				todos={todos}
				setTodos={setTodos}
				requestSearchTodo={requestSearchTodo}
			/>
			<h1 className={styles.title}>Todo List (Список задач)</h1>
			<div className={styles.titleLine}>
				<div>#</div>
				<div className={styles.todosTitle}>Todos Name</div>
				<button className={styles.sort} onClick={handleSortButton} />
			</div>
			<div className={styles.todosWrapper}>
				{todos.map(([id, { completed, title }], index) => (
					<div key={id} className={styles.item}>
						<span>{index + 1}. </span>
						<input
							type="checkbox"
							value={completed}
							onClick={() => handleCheckboxClick(id, completed)}
						/>
						<p className={styles.itemText}>{title}</p>
						<button
							className={`${styles.todoBtn} ${styles.edit}`}
							onClick={() => handleModalOpen(id)}
						/>
						<button
							className={`${styles.todoBtn} ${styles.delete}`}
							onClick={() => handleDelete(id)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
