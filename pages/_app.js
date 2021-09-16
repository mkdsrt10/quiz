import '../styles/globals.css';
import { useState, useEffect } from 'react';
import Amplify, { Hub } from 'aws-amplify';
import awsExports from '../components/aws-export';
import { checkAuth } from '../functions/checkAuth';
import { AuthRoutes } from '../functions/constants';
import { useRouter } from 'next/router';
import { getSambhav } from '../functions/user';
import mixpanel from 'mixpanel-browser';

mixpanel.init('e5f51cfce8207bba07b26ace2c93f72e');
Amplify.configure({ ...awsExports });

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [token, setToken] = useState(0);
	const [user, setUser] = useState(null);

	useEffect(() => {
		mixpanel.track('Site loadup');
	}, []);

	useEffect(() => {
		Hub.listen('auth', (data) => {
			const event = data.payload.event;
			console.log('event:', event);
			if (event === 'signOut') {
				mixpanel.track('Sign Out');
				setToken(null);
			} else if (event === 'signIn') {
				mixpanel.track('SignIn');
				checkAuth({ token, setToken, setUser }).then((r) => {
					console.log('Event Login', token);
				});
			}
		});
	}, []);

	useEffect(() => {
		checkAuth({ token, setToken, setUser }).then((r) => {
			console.log('Set first time token');
		});
	}, []);

	useEffect(() => {
		if (token === null && AuthRoutes.includes(router.pathname)) {
			mixpanel.track('Redirected to login');
			router.push('/').then((r) => {
				console.log('Redirected to Login');
			});
		}
		//else if (token !== 0 && AuthRoutes.includes(router.pathname)) {
		// 	getSambhav({ token }).then((r) => {
		// 		r.data.then((sam) => {
		// 			if (!sam) {
		// 				console.log('JAIMATA', r);
		// 				mixpanel.track('Redirected to waitlisted');
		// 				router.replace('/').then((r) => console.log(r));
		// 			}
		// 		});
		// 	});
		//}
	}, [token, router.pathname]);

	return (
		<Component
			token={token}
			setToken={setToken}
			user={user || { class: '', name: '' }}
			{...pageProps}
		/>
	);
}

export default MyApp;
