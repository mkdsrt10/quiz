import { Auth } from 'aws-amplify';
import { fetchAuth } from './fetchAuth';
import mixpanel from 'mixpanel-browser';

export async function checkAuth({ setToken, setUser = () => {} }) {
	try {
		const user = await Auth.currentAuthenticatedUser();
		console.log('user:', user);
		if (user) {
			const too = user.getSignInUserSession().getIdToken().getJwtToken();
			setToken(too);
			const response = await fetchAuth(too, '/users');
			setUser(response);
		} else {
			setToken(null);
		}
	} catch (e) {
		console.log('error:', e);
		setToken(null);
	}
}

export async function signCustom({ username }) {
	return await Auth.signIn(username)
		.then((user) => {
			if (user.challengeName === 'CUSTOM_CHALLENGE') {
				console.log('KLKL');
				mixpanel.track('Signin CUSTOM CHALLENEG response recieved');
				// to send the answer of the custom challenge
				return { error: false, data: user };
			} else {
				console.log(user);
				return { error: false, data: user };
			}
		})
		.catch((err) => {
			return { error: true, data: err.message };
		});
}

export async function signInOTP({ user, otp }) {
	return await Auth.sendCustomChallengeAnswer(user, otp)
		.then((user) => {
			return { error: false, data: user };
		})
		.catch((err) => {
			return { error: true, data: err.message };
		});
}

export async function signUp({
	phone,
	name,
	classs,
	gender,
	dob,
	token,
	setToken,
}) {
	try {
		await Auth.signUp({
			username: phone,
			password: 'P1GAMERSQ12aasdf',
			attributes: {
				phone_number: phone,
				name: name,
				gender: gender,
				birthdate: dob,
			},
		});
		/* Once the user successfully signs in, update the form state to show the signed in state */
		return null;
	} catch (err) {
		console.log({ err });
		return err.message;
	}
}

export async function confirmSignUp({ username, otp, pass, token, setToken }) {
	try {
		await Auth.confirmSignUp(username, otp);
		/* Once the user successfully signs in, update the form state to show the signed in state */
		// await checkAuth({token, setToken})
		await Auth.signIn({ username, password: pass });
		return null;
	} catch (err) {
		console.log({ err });
		return err.message;
	}
}
