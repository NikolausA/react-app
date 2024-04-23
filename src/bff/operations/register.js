import { addUser, getUser } from '../api';
import { sessions } from '../sessions';

export const register = async (regLogin, regPassword) => {
	const user = await getUser(regLogin);

	if (user) {
		return {
			error: 'Такой логин уже занят',
			res: null,
		};
	}

	const addedUser = await addUser(regLogin, regPassword);

	return {
		error: null,
		res: {
			id: addedUser.id,
			login: addedUser.login,
			roleId: addedUser.role_id,
			session: sessions.create(addedUser),
		},
	};
};
