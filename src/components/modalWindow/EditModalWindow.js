import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './EditModalWindow.module.css';
import { selectIsModal, selectSelectedTodo } from '../../selectors';
import { setModalFalse, updateTodos } from '../../actions';

export const EditModalWindow = () => {
	const inputTitle = useRef();
	const inputCompleted = useRef();
	const dispatch = useDispatch();
	const isModal = useSelector(selectIsModal);
	const { id, title, completed } = useSelector(selectSelectedTodo);

	const handleModalFormSubmit = (e) => {
		e.preventDefault();
		dispatch(
			updateTodos({
				id: id,
				title: inputTitle.current.value,
				completed: inputCompleted.current.checked,
			}),
		);
		onClose();
	};

	const onClose = () => {
		dispatch(setModalFalse);
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
							defaultValue={title}
							ref={inputTitle}
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
