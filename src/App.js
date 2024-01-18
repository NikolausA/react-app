import { useEffect, useState } from 'react';
import styles from './App.module.css';
import trash from './icons8-trash-30.png';

export const App = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos/?_limit=5')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			});
	}, []);

	return (
		<div className={styles.app}>
			<h1 className={styles.title}>Todo List (Список задач)</h1>
			<div className={styles.titleLine}>
				<div>#</div>
				<div className={styles.todosTitle}>Todos Name</div>
			</div>
			<div className={styles.todosWrapper}>
				{todos.map(({ id, title }) => (
					<div key={id} className={styles.item}>
						<p className={styles.itemText}>
							{id}. {title}
						</p>
						<img src={trash} alt="trash" className={styles.trash} />
					</div>
				))}
			</div>
		</div>
	);
};
