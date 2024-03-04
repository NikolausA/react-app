export const checkIsThereWinner = (letter, array, arrayPatterns) => {
	let matchedIndexesString = '';
	array.forEach((item, i) => {
		if (item === letter) {
			matchedIndexesString += String(i);
		}
	});

	return arrayPatterns.some((patern) => matchedIndexesString.includes(patern));
};
