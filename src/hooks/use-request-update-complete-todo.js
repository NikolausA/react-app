import { ref, update } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdateCompleteTodo = () => {
	const requestUpdateCompleteTodo = (id, completed) => {
		const todoDbRef = ref(db, 'todos/' + id);
		update(todoDbRef, {
			completed: !completed,
		}).then((response) => {
			console.log(response);
		});
	};

	return requestUpdateCompleteTodo;
};
