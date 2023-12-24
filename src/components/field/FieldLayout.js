import styles from './Field.module.css';

export const FieldLayout = ({
	field,
	setField,
	fieldValue,
	currentPlayer,
	setCurrentPlayer,
	checkIsGameEnded,
	handleClick,
}) => {
	return (
		<div className={styles.field}>
			{field.map((item, index) => (
				<button
					disabled={item}
					className={styles.fieldCell}
					key={index}
					onClick={() => handleClick(index)}
				>
					{item}
				</button>
			))}
		</div>
	);
};
