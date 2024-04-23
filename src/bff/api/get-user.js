import { transformUser } from '../../bff/transformers';

export const getUser = async (enteredLogin) =>
	fetch(`http://localhost:3004/users/?login=${enteredLogin}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser && transformUser(loadedUser));
