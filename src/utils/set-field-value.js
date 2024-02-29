export const setFieldValue = (array, value, index) => {
	return array.map((item, inx) => (inx === index ? value : item));
};
