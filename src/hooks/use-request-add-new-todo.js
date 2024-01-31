import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddNewTodo = () => {
	const requstAddNewTodo = (text) => {
		const todosDbRef = ref(db, 'todos');
		push(todosDbRef, {
			completed: false,
			title: text,
		}).then((response) => {
			console.log(response);
		});
	};

	return requstAddNewTodo;
};
