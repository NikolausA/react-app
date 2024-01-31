import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeletetodo = () => {
	const requestDeleteTodo = (id) => {
		const todoDbRef = ref(db, 'todos/' + id);
		remove(todoDbRef).then((response) => {
			console.log(response);
		});
	};

	return requestDeleteTodo;
};
