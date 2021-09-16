import classes from '../styles/Join.module.css';
import Head from 'next/head';
import Image from 'next/dist/client/image';
import logo from '../public/logo.svg';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { checkAuth, signCustom, signInOTP } from '../functions/checkAuth';
import { Auth } from 'aws-amplify';
import mixpanel from 'mixpanel-browser';

// function useWindowSize() {
// 	const [windowSize, setWindowSize] = useState({
// 		width: undefined,
// 		height: undefined,
// 	});
// 	useEffect(() => {
// 		if (typeof window !== 'undefined') {
// 			function handleResize() {
// 				setWindowSize({
// 					width: window.innerWidth,
// 					height: window.innerHeight,
// 				});
// 			}
// 			window.addEventListener('resize', handleResize);
// 			handleResize();
// 			return () => window.removeEventListener('resize', handleResize);
// 		}
// 	}, []);
// 	return windowSize;
// }
const Join = ({ token, setToken }) => {
	const route = useRouter();
	const [otpenter, setOtpEnter] = useState(false);
	const [otp, setOtp] = useState('');
	const [phone, setPhone] = useState('');
	const [wrongInput, setWrongInput] = useState(false);
	const [user, setUser] = useState(null);
	const [err, setErr] = useState('');
	const [loading, setLoading] = useState(false);

	//pushes page to coueseDone page if validations are met
	const handleSignIn = async (e) => {
		mixpanel.track('Signin button clicked');
		e.preventDefault();
		if (phone != '') {
			mixpanel.track('SignIn action taken');
			setLoading(true);
			const user = await signCustom({ username: '+91' + phone });
			if (user.error) {
				mixpanel.track('Signin error');
				setLoading(false);
				setErr(user.data);
			} else {
				mixpanel.track('Signin otp sent success');
				setLoading(false);
				setErr('');
				setUser(user.data);
				setOtpEnter(true);
			}
		} else {
			mixpanel.track('Signin wrong input');
			setWrongInput(true);
			setTimeout(() => {
				setWrongInput(false);
			}, 2000);
		}
	};
	const handleClickOtp = async (e) => {
		mixpanel.track('Signin OTP button clicked');
		e.preventDefault();
		if (phone != '' && otp != '') {
			mixpanel.track('Signin OTP input action taken');
			setLoading(true);
			const res = await signInOTP({ user, otp });
			if (res.error) {
				mixpanel.track('Signin OTP submit ERROR');
				setLoading(false);
				setErr(res.data);
			} else {
				mixpanel.track('Signin OTP submit SUCCESS');
				setErr('');
				setLoading(false);
				await checkAuth({ token, setToken });
			}
		} else {
			mixpanel.track('Signin OTP sent wrong input');
			setWrongInput(true);
			setTimeout(() => {
				setWrongInput(false);
			}, 2000);
		}
	};
	// const screen = useWindowSize();

	useEffect(() => {
		mixpanel.track('Join now page landed');
	}, []);

	useEffect(() => {
		Auth.currentAuthenticatedUser().then((r) => {
			if (r) {
				mixpanel.track('Redirected to dashboard from Join Page');
				route.push('/Code').then((r) => {
					console.log(r);
				});
			}
		});
	}, [token]);

	return (
		<>
			<div id='page1' className={classes.container}>
				<Head>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href='/favicon-32x32.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href='/favicon-16x16.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='/apple-touch-icon.png'
					/>
					<link rel='manifest' href='/site.webmanifest' />
					<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
					<meta name='theme-color' content='#ffffff' />
					<title>Scoreplus.</title>
				</Head>
				<div className={classes.header}>
					<div className={classes.headerContainer}>
						<div style={{ flex: 'left' }}>
							<span style={{ transform: 'scale(1.2)', marginTop: '1rem' }}>
								<Image src={logo} />
							</span>
						</div>
						<div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
							<ul>
								<li>
									<Link href='https://www.scoreplus.live/Tracker'>
										<a style={{ fontSize: '1rem' }}>Track Progress</a>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className={classes.detailsForm}>
					<p
						style={{
							textAlign: 'center',
							borderBottom: '1px solid #414042',
							marginTop: '3rem',
							paddingBottom: '0.6rem',
							fontWeight: '500',
							color: '#414042',
							fontSize: '1.2rem',
						}}
					>
						Let&apos;s get started
					</p>
					<form className={classes.mobileform} action='' id={'1'}>
						<div>
							<label htmlFor='name'>Phone No.: </label>
							<input
								style={{
									backgroundColor: otpenter ? 'white' : '',
									border: otpenter ? '0' : '',
								}}
								type='text'
								name='phone'
								id='phone'
								placeholder={'Enter your 10 digit phone number'}
								disabled={otpenter}
								onChange={(e) => setPhone(e.target.value)}
								required
							/>
						</div>
						{otpenter && (
							<div>
								<label htmlFor='name'>OTP: </label>
								<input
									type='text'
									name='otp'
									id='otp'
									required
									onChange={(e) => setOtp(e.target.value)}
								/>
							</div>
						)}
						<button
							disabled={loading}
							type='submit'
							style={{
								backgroundColor: loading
									? 'grey'
									: wrongInput == false
									? ''
									: 'red',
								fontWeight: '600',
							}}
							onClick={(e) => (otpenter ? handleClickOtp(e) : handleSignIn(e))}
						>
							{otpenter ? 'Enter OTP' : 'Get OTP'}
						</button>
						<Link href={'/'}>
							<a>
								<p className={classes.leftButtonBottom}>
									Not registered? Sign-up here
								</p>
							</a>
						</Link>
					</form>
					<p
						style={{
							textAlign: 'center',
							marginTop: '3rem',
							color: 'red',
							fontSize: '1rem',
						}}
					>
						{err}
					</p>
				</div>
			</div>
		</>
	);
};

export default Join;
