import '../styles/globals.css';
import { useState, useEffect } from 'react';
import Amplify, { Hub } from 'aws-amplify';
import awsExports from '../components/aws-export';
import { checkAuth } from '../functions/checkAuth';
import { AuthRoutes } from '../functions/constants';
import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';

mixpanel.init('e5f51cfce8207bba07b26ace2c93f72e');
Amplify.configure({ ...awsExports });

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [token, setToken] = useState(0);
	const [user, setUser] = useState(null);
	const [data, setData] = useState(null);
	const [quizCode, setQuizCode] = useState("");

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
	}, [token, router.pathname]);

	useEffect(() => {
		if (quizCode !== ""){
			router.push('/Quiz').then((r) => {
				console.log('Redirected to Quiz');
			});
		}
	}, [quizCode])

	return (
		<Component
			token={token}
			quizCode={quizCode}
			data={data}
			setData={setData}
			setQuizCode={setQuizCode}
			setToken={setToken}
			user={user || { class: '', name: '' }}
			{...pageProps}
		/>
	);
}

export default MyApp;
