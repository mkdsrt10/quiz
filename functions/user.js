import { BASE_BACKEND } from './constants';

export async function createNewUser({ token, user }) {
	const req = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: token,
		},
		body: JSON.stringify(user),
	};
	try {
		const res = await fetch(BASE_BACKEND + '/users', req);
		return { data: res.json(), error: res.status === 400 };
	} catch (e) {
		return { data: null, error: e };
	}
}

export async function getSambhav({ token }) {
	const req = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: token,
		},
	};
	try {
		const res = await fetch(BASE_BACKEND + '/userstracker', req);
		return { data: res.json(), error: res.status === 400 };
	} catch (e) {
		return { data: true, error: e };
	}
}
