import { BASE_BACKEND } from './constants';

export async function fetchAuth(token, url) {
	if (token === 0 || token === null) {
		return null;
	}
	const req = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: token,
		},
	};
	try {
		const res = await fetch(BASE_BACKEND + url, req);
		if (res.status !== 200) {
			throw Error('Server error' + (await res.json()));
		}
		return res.json();
	} catch (e) {
		console.log('Error:', e);
		return null;
	}
}
