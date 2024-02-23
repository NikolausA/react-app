import styles from './todoItem.module.css';
// import { useState } from 'react';

export const TodoItem = ({ id, title, completed, index, handleEdit, handleDelete }) => {
	// const [editedTodoTitle, setEditedTodoTitle] = useState(title);

	// const onTitleChange = ({ target }) => {
	// 	setEditedTodoTitle(target.value);
	// };

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
