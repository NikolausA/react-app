import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { EditModalWindow } from './components';

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

	useEffect(() => {
		const getAllTodos = async () => {
			const loadedData = await fetch(`http://localhost:3004/todos${sortParam}`);
			const loadedTodos = await loadedData.json();
			setTodos(loadedTodos);
		};

		getAllTodos();
	}, [refreshProductFlag, sortParam]);

	const requestAddNewTask = async (text) => {
		const newTodo = await fetch('http://localhost:3004/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				userId: 1,
				id: String(Date.now()),
				title: text,
				completed: false,
			}),
		});
		const addedTodo = await newTodo.json();

		const newTodos = [...todos, addedTodo];
		setTodos(newTodos);
		setSortParam('');
	};

	const requestUpdateCompleteTodo = async (id, completed) => {
		const res = await fetch(`http://localhost:3004/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ completed: !completed }),
		});
		const response = await res.json();
		refreshProducts();
		console.log(response);
	};

	const requestUpdateTodo = async (id, text) => {
		const res = await fetch(`http://localhost:3004/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id: id,
				title: text,
			}),
		});

		const response = await res.json();
		refreshProducts();
		console.log(response);
	};

	const requestDeleteTodo = async (id) => {
		try {
			const res = await fetch(`http://localhost:3004/todos/${id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
			});

			const deletedTodo = await res.json();
			refreshProducts();
		} catch (error) {
			console.log('Error: ', error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		requestAddNewTask(newTodo);
		setNewTodo('');
	};

	const onChange = ({ target }) => {
		setNewTodo(target.value);
	};

	const getEditedTodo = (id) => {
		return todos.find((item) => item.id === id);
	};

	const handleModalOpen = (id) => {
		const editedTodo = getEditedTodo(id);
		setSelectedTodo(editedTodo);
		setIsModal(true);
	};

	const handleModalClose = () => {
		setIsModal(false);
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
