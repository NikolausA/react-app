import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './todoItem.module.css';
import { findTodo } from '../../utils/find-todo';
import { useState } from 'react';
import { updateTodo, deleteTodo } from '../../api/api';
import { NotFound } from '../notFound/NotFound';

export const TodoItem = () => {
	const { state } = useLocation();
	const todos = state?.todos || [];
	const { id } = useParams();
	if (!findTodo(todos, id)) return <NotFound />;
	let { title, completed } = findTodo(todos, id) || {};
	const navigate = useNavigate();

	const [isEditing, setIsEditing] = useState(false);
	const [editingTitle, setEditingTitle] = useState(title);
	const [checked, setCheckted] = useState(completed);

	const onTodoClick = () => {
		setIsEditing(true);
	};

	const onChange = ({ target }) => {
		setEditingTitle(target.value);
	};

	const onCompletedChange = ({ target }) => {
		setCheckted(target.checked);
	};

	const handleUpdateSubmit = (e, id) => {
		e.preventDefault();
		updateTodo({ id, title: editingTitle, completed: checked });
		navigate('/');
	};

	const handleDelete = (id) => {
		deleteTodo(id);
		navigate('/');
	};

	const handleBackButtonClick = () => {
		navigate('/');
	};

	return (
		<div className={styles.todoItem}>
			<h3>Страница редактирования задачи</h3>
			{isEditing ? (
				<form
					action="#"
					className={styles.itemForm}
					onSubmit={(e) => handleUpdateSubmit(e, id)}
				>
					<input
						className={styles.checkbox}
						type="checkbox"
						checked={checked}
						onChange={onCompletedChange}
					/>
					<textarea
						value={editingTitle}
						id=""
						cols="30"
						rows="4"
						onChange={onChange}
					></textarea>
					<button
						type="submit"
						className={`${styles.todoBtn} ${styles.save}`}
					/>
				</form>
			) : (
				<div className={styles.todo} onClick={onTodoClick}>
					<input
						className={styles.checkbox}
						type="checkbox"
						checked={checked}
						readOnly
					/>
					<p className={styles.todoText}>{title}</p>
					{/* <button className={`${styles.todoBtn} ${styles.edit}`}></button> */}
					<button
						type="button"
						className={`${styles.todoBtn} ${styles.delete}`}
						onClick={() => handleDelete(id)}
					></button>
				</div>
			)}
			<button
				type="button"
				className={styles.backBtn}
				onClick={handleBackButtonClick}
			>
				К списку задач
			</button>
		</div>
	);
};
