import { useDispatch, useSelector } from 'react-redux';
import { selectIsModal } from '../../selectors';
import styles from './todoItem.module.css';
import { setModalTrue, setSelectedTodo, deleteTodo } from '../../actions';

export const TodoItem = ({ id, title, completed, index }) => {
	const isModal = useSelector(selectIsModal);
	const dispatch = useDispatch();

	const handleEdit = () => {
		dispatch(setSelectedTodo({ id: id, title: title, completed: completed }));
		dispatch(setModalTrue);
	};

	const handleDelete = () => {
		dispatch(deleteTodo(id));
	};

	return (
		<div className={styles.item} onClick={handleEdit}>
			<span>{index + 1}. </span>
			<input
				className={styles.itemCheckbox}
				type="checkbox"
				checked={completed}
				readOnly
			/>
			<div className={styles.itemText}>{title}</div>
			<button
				type="button"
				className={`${styles.todoBtn} ${styles.edit}`}
				onClick={handleEdit}
			/>
			<button
				type="button"
				className={`${styles.todoBtn} ${styles.delete}`}
				onClick={(e) => {
					e.stopPropagation();
					handleDelete(e, id);
				}}
			/>
		</div>
	);
};
