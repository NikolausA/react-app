import { useRef } from 'react';
import styles from './EditModalWindow.module.css';

export const EditModalWindow = ({ isModal, selectedTodo, onSave, onClose }) => {
	let { id, title, completed } = selectedTodo;

	const inputTitle = useRef();
	const inputCompleted = useRef();

	const handleModalFormSubmit = (e) => {
		e.preventDefault();
		onSave({
			id,
			title: inputTitle.current.value,
			completed: inputCompleted.current.checked,
		});
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
							type="checkbox"
							defaultChecked={completed}
							ref={inputCompleted}
						/>
						<input
							className={styles.modalInput}
							type="text"
							ref={inputTitle}
							defaultValue={title}
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
