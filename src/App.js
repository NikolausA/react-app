import { useEffect, useState, useReducer } from 'react';
import { AppContext } from './context';
import styles from './App.module.css';
import { createTodo, readTodos, deleteTodo, updateTodo } from './api/api';
import { EditModalWindow, SearchTodoForm, TodoItem } from './components';
import { findTodo, updateTodos, deleteFromTodos } from './utils';

const reducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'SET_TODOS': {
			return payload;
		}
		case 'UPDATE_TODOS': {
			return [...state, payload];
		}
		default:
			return state;
	}
};

export const App = () => {
	const [todos, dispatch] = useReducer(reducer, []);
	const [newTodoTitle, setNewTodoTitle] = useState('');
	const [isModal, setIsModal] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState({
		id: '',
		title: '',
		completed: false,
	});
	const [isReset, setIsReset] = useState(false);

	useEffect(() => {
		readTodos(searchPhrase, isAlphabetSorting).then((loadedTodos) =>
			dispatch({ type: 'SET_TODOS', payload: loadedTodos }),
		);
	}, [searchPhrase, isAlphabetSorting, isReset]);

	const onChange = ({ target }) => {
		setNewTodoTitle(target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createTodo({ title: newTodoTitle, completed: false }).then(
			({ id, title, completed }) =>
				dispatch({ type: 'UPDATE_TODOS', payload: { id, title, completed } }),
		);
		setNewTodoTitle('');
	};

	const handleEdit = (id) => {
		setSelectedTodo(findTodo(todos, id));
		setIsModal(true);
	};

	const onSave = ({ id, title, completed }) => {
		updateTodo({ id, title, completed }).then((updatedTodo) => {
			dispatch({ type: 'SET_TODOS', payload: updateTodos(todos, updatedTodo) });
		});
	};

	const onDelete = (id) => {
		deleteTodo(id).then((deletedTodo) => {
			dispatch({
				type: 'SET_TODOS',
				payload: deleteFromTodos(todos, deletedTodo.id),
			});
		});
	};

	const handleSortButton = () => {
		setIsAlphabetSorting(!isAlphabetSorting);
	};

	const handleModalClose = () => {
		setIsModal(false);
	};

	return (
		<AppContext.Provider value={{ todos, dispatch }}>
			<div className={styles.app}>
				<EditModalWindow
					isModal={isModal}
					selectedTodo={selectedTodo}
					onClose={handleModalClose}
					onSave={onSave}
				/>
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
				<SearchTodoForm isReset={isReset} setIsReset={setIsReset} />
				<h1 className={styles.title}>Todo List (Список задач)</h1>
				<div className={styles.titleLine}>
					<div>#</div>
					<div className={styles.todosTitle}>Todos Name</div>
					<button className={styles.sort} onClick={handleSortButton} />
				</div>
				<div className={styles.todosWrapper}>
					{todos.map(({ id, title, completed }, index) => (
						<TodoItem
							key={id}
							id={id}
							title={title}
							completed={completed}
							index={index}
							handleDelete={() => onDelete(id)}
							handleEdit={() => handleEdit(id)}
						/>
					))}
				</div>
			</div>
		</AppContext.Provider>
	);
};
