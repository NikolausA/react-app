import styles from './Field.module.css';
import PropTypes from 'prop-types';

export const FieldLayout = ({ field, handleClick }) => {
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

FieldLayout.propTypes = {
	field: PropTypes.array,
	handleClick: PropTypes.func,
};
