import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdateTodo = () => {
	const requestUpdateTodo = (id, text) => {
		const todoDbRef = ref(db, 'todos/' + id);
		set(todoDbRef, {
			completed: false,
			title: text,
		}).then((response) => {
			console.log(response);
		});
	};

	return requestUpdateTodo;
};
