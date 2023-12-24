import { FieldLayout } from './FieldLayout';

export const Field = ({
	field,
	setField,
	currentPlayer,
	setCurrentPlayer,
	checkIsGameEnded,
	handleClick,
}) => {
	// const fieldValue = currentPlayer ? 'X' : 'O';

	// const handleClick = (index) => {
	// 	const changedField = field.map((f, i) => {
	// 		if (i === index) {
	// 			return (f = fieldValue);
	// 		} else {
	// 			return f;
	// 		}
	// 	});
	// 	setField(changedField);
	// 	setCurrentPlayer(!currentPlayer);
	// 	// console.log(field);
	// 	// console.log(matchedField);
	// 	checkIsGameEnded(fieldValue);
	// };

	return (
		<FieldLayout
			field={field}
			setField={setField}
			// fieldValue={fieldValue}
			currentPlayer={currentPlayer}
			setCurrentPlayer={setCurrentPlayer}
			handleClick={handleClick}
			checkIsGameEnded={checkIsGameEnded}
		/>
	);
};
