import { generateDate } from './generate-date';

export const addUser = (login, password) =>
	fetch('http://localhost:3004/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'applacation/json;charset=utf-8',
		},
		body: JSON.stringify({
			login,
			password,
			registed_at: generateDate(),
			role_id: 2,
		}),
	});
