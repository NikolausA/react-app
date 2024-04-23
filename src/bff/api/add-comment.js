import { generateDate } from '../utils';

export const addComment = (userId, postId, content) =>
	fetch('http://localhost:3004/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'applacation/json;charset=utf-8',
		},
		body: JSON.stringify({
			author_id: userId,
			post_id: postId,
			published_at: generateDate(),
			content,
		}),
	});
