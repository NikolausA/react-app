import { useState, useEffect } from 'react';
import styles from './EditModalWindow.module.css';

export const EditModalWindow = ({
	isModal,
	selectedTodo,
	onClose,
	requestUpdateTodo,
}) => {
	const [editedTodo, setEditedTodo] = useState('');

	const { id, title } = selectedTodo;

	useEffect(() => {
		setEditedTodo(title);
	}, [title]);

	const onChange = ({ target }) => {
		setEditedTodo(target.value);
	};

	const handleModalFormSubmit = (e) => {
		e.preventDefault();
		requestUpdateTodo(id, editedTodo);
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
							value={editedTodo}
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
