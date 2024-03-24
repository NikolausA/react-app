import { getUsers } from './get-users';

export const getUser = async (enteredLogin) => {
	const users = await getUsers();

	return users.find(({ login }) => login === enteredLogin);
};
