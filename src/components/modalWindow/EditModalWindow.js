import { useState, useEffect } from 'react';
import styles from './EditModalWindow.module.css';

export const EditModalWindow = ({
	isModal,
	selectedTodo,
	onClose,
	requestUpdateTodo,
}) => {
	const [editedTodoTitle, setEditedTodoTitle] = useState('');

	const [id, todo] = selectedTodo;

	useEffect(() => {
		setEditedTodoTitle(todo.title);
	}, [todo.title]);

	const onChange = ({ target }) => {
		setEditedTodoTitle(target.value);
	};

	const handleModalFormSubmit = (e) => {
		e.preventDefault();
		requestUpdateTodo(id, editedTodoTitle);
		onClose();
	};

	if (!isModal) return null;

	return (
		<div className={styles.modal}>
			<div className={styles.modalContent}>
				<div className={styles.modalHeader}>
					<button className={styles.modalClose} onClick={() => onClose()}>
						X
					</button>
				</div>
				<div className={styles.modalBody}>
					<p>Редактирование задачи</p>
					<form
						action="#"
						className={styles.modalForm}
						onSubmit={handleModalFormSubmit}
					>
						<input
							className={styles.modalInput}
							type="text"
							value={editedTodoTitle}
							onChange={onChange}
							autoFocus
						/>
						<button className={styles.addTodoModalBtn} type="submit">
							Сохранить
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
