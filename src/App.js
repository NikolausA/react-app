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

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [isModal, setIsModal] = useState(false);
	const [sortParam, setSortParam] = useState('');
	const [refreshProductFlag, setRrefreshProductFlag] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState({
		userId: 1,
		id: 1,
		title: '',
		completed: false,
	});

	const refreshProducts = () => {
		setRrefreshProductFlag(!refreshProductFlag);
	};

	const requestAddNewTodo = useRequestAddNewTodo(newTodo, todos);
	const requestDeleteTodo = useRequestDeletetodo(refreshProducts);
	const requestUpdateCompleteTodo = useRequestUpdateCompleteTodo(refreshProducts);
	const requestUpdateTodo = useRequestUpdateTodo(refreshProducts);
	const requestSearchTodo = useRequestSearchTodo();

	useEffect(() => {
		const getAllTodos = async () => {
			const loadedData = await fetch(`http://localhost:3004/todos${sortParam}`);
			const loadedTodos = await loadedData.json();
			setTodos(loadedTodos);
		};

		getAllTodos();
	}, [refreshProductFlag, sortParam]);

	const handleSubmit = (e) => {
		e.preventDefault();
		requestAddNewTodo().then((newTodos) => setTodos(newTodos));
		setSortParam('');
		setNewTodo('');
	};

	const onChange = ({ target }) => {
		setNewTodo(target.value);
	};

	const getEditedTodo = (id) => {
		return todos.find((item) => item.id === id);
	};

	const handleDelete = (id) => {
		requestDeleteTodo(id);
	};

	const handleCheckboxClick = (id, completed) => {
		requestUpdateCompleteTodo(id, completed);
	};

	const handleSortButton = () => {
		setSortParam('?_sort=title');
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
				{todos.length > 0 &&
					todos.map(({ id, title, completed }, index) => (
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
