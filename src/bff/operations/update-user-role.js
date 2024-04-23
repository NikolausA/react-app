import { setUserRole } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const updateUserRole = async (hash, userId, newUserRole) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Access prohibited',
			res: null,
		};
	}

	setUserRole(userId, newUserRole);

	return {
		error: null,
		res: true,
	};
};
