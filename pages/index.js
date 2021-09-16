import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/dist/client/image';
import logo from '../public/logo.svg';
import { Auth } from 'aws-amplify';
import mixpanel from 'mixpanel-browser';
import Head from 'next/head';
import {
	checkAuth,
	signCustom,
	signInOTP,
	signUp,
} from '../functions/checkAuth';
import { createNewUser } from '../functions/user';

export default function Home({ token, setToken }) {
	const [error, setError] = useState('Submit');
	const [name, setName] = useState('');
	const [classNum, setClassNum] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [dob, setDob] = useState('');
	const [courseName, setCourseName] = useState('');
	const [gender, setGender] = useState('');
	const [otpenter, setOtpEnter] = useState(false);
	const [otp, setOtp] = useState('');
	const [err, setErr] = useState('');
	const [wrongInput, setWrongInput] = useState(false);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);
	const route = useRouter();

	useEffect(() => {
		mixpanel.track('Tracker Onboarding Landed');
	}, []);
	useEffect(() => {
		Auth.currentAuthenticatedUser().then((r) => {
			if (r) {
				mixpanel.track('Tracker Onboarding REDIRECTED to Dashboard');
				route.push('/Code').then((r) => {
					console.log(r);
				});
			}
		});
	}, [token]);

	const handleClick = async (e) => {
		mixpanel.track('SIGNUP button clicked');
		setLoading(true);
		e.preventDefault();
		if (name != '' && gender != '' && classNum != '' && phone != '') {
			mixpanel.track('SignUP action taken');
			signUp({
				phone: '+91' + phone,
				name,
				classs: classNum,
				gender,
				dob,
			}).then(async (r) => {
				setLoading(false);
				if (
					r === null ||
					r === 'An account with the given phone_number already exists.'
				) {
					setOtpEnter(true);
					mixpanel.track('SIGNUP: Success/AlreadyExists');
					const user = await signCustom({ username: '+91' + phone });
					if (user.error) {
						mixpanel.track('Auto-Signin error');
						setErr(user.data);
					} else {
						mixpanel.track('Auto-Signin otp sent success');
						setErr('');
						setUser(user.data);
					}
				} else {
					mixpanel.track('SIGNUP ERROR');
					setErr(r);
				}
			});
		} else {
			mixpanel.track('SignUP wrong input');
			setWrongInput(true);
			setTimeout(() => {
				setWrongInput(false);
			}, 2000);
			setLoading(false);
		}
	};

	const handleClickOtp = async (e) => {
		mixpanel.track('SignUP OTP button clicked');
		setLoading(true);
		e.preventDefault();
		if (phone != '' && otp != '') {
			mixpanel.track('SignUP OTP input action taken');
			const res = await signInOTP({ user, otp });
			if (res.error) {
				mixpanel.track('SIGNUP-Signin OTP submit ERROR');
				setErr(res.data);
			} else {
				mixpanel.track('SIGNUP-Signin OTP submit SUCCESS');
				setErr('');
				await checkAuth({ token, setToken });
			}
			setLoading(false);
		} else {
			mixpanel.track('SignUP OTP sent wrong input');
			setWrongInput(true);
			setTimeout(() => {
				setWrongInput(false);
			}, 2000);
			setLoading(false);
		}
	};
	useEffect(() => {
		if (token !== null && token !== '' && classNum !== '') {
			mixpanel.track('CCREATE A NEW USER');
			createNewUser({
				token,
				user: {
					firstname: name,
					lastname: '',
					phone: '+91' + phone,
					class: classNum,
					language: '',
					course: courseName,
					dob: dob,
					gender: gender,
				},
			})
				.then((r) => {
					mixpanel.track('CCREATE A NEW USER: SUCCESS');
					setErr('');
				})
				.catch((err) => {
					mixpanel.track('CCREATE A NEW USER:ERROR');
					setErr(err.message);
				});
		}
	}, [token]);

	return (
		<div className={styles.container}>
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
			<div className={styles.header}>
				<div className={styles.headerContainer}>
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
			<div className={styles.form}>
				{/* form for details of student */}
				{!otpenter && (
					<form action=''>
						<div>
							<label htmlFor='name'>Name</label>
							<input
								type='text'
								name='name'
								id='name'
								placeholder='Name'
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</div>
						<div>
							<label htmlFor='school'>Gender: </label>
							{/*<input*/}
							{/*	type='text'*/}
							{/*	name='gender'*/}
							{/*	value={gender}*/}
							{/*	id='gender'*/}
							{/*	required*/}
							{/*	onChange={(e) => setGender(e.target.value)}*/}
							{/*/>*/}

							<select
								style={{ float: 'right' }}
								id='gender'
								name='gender'
								value={gender}
								onChange={(e) => setGender(e.target.value)}
							>
								<option value='' style={{ fontWeight: '300' }}>
									-
								</option>
								<option value='Male' style={{ fontWeight: '300' }}>
									Male
								</option>
								<option value='Female' style={{ fontWeight: '300' }}>
									Female
								</option>
								<option value='Other' style={{ fontWeight: '300' }}>
									Other
								</option>
							</select>
						</div>
						<div>
							<label htmlFor='dob'>DOB: </label>
							<input
								type='date'
								name='dob'
								id='dob'
								value={dob}
								required
								onChange={(e) => setDob(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor='email'>Email</label>
							<input
								type='email'
								name='email'
								id='email'
								placeholder='Email'
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>
						<div>
							<label htmlFor='class'>Class</label>
							<select
								style={{ width: '8rem' }}
								name='class'
								id='class'
								onChange={(e) => setClassNum(e.target.value)}
							>
								<option value='' hidden style={{ color: 'gray' }}>
									Class
								</option>
								<option value='9'>9th</option>
								<option value='10'>10th</option>
								<option value='11 PCM'>11th PCM</option>
								<option value='11 PCB'>11th PCB</option>
								<option value='12 PCM'>12 PCM</option>
								<option value='12 PCB'>12 PCB</option>
							</select>
						</div>
						<div>
							<label htmlFor='course'>Course: </label>
							<select
								id='course'
								name='course'
								value={courseName}
								onChange={(e) => setCourseName(e.target.value)}
							>
								<option value='' style={{ fontWeight: '300', color: 'gray' }}>
									Course
								</option>
								{/*<option value='10' style={{ fontWeight: '300' }}>*/}
								{/*	Class 10th*/}
								{/*</option>*/}
								<option value='SAMBHAV12' style={{ fontWeight: '300' }}>
									SAMBHAV 12th Batch
								</option>
								<option value='SAMBHAV11' style={{ fontWeight: '300' }}>
									SAMBHAV 11th Batch
								</option>
								<option value='SAFAL' style={{ fontWeight: '300' }}>
									SAFAL Batch
								</option>
								<option value='VIJYA' style={{ fontWeight: '300' }}>
									VIJYA Batch
								</option>
							</select>
						</div>
						<div>
							<label htmlFor='phone'>Phone No.</label>
							<input
								type='tel'
								name='phone'
								id='phone'
								pattern='[0-9]{10}'
								placeholder='10 digit number'
								required
								onChange={(e) => {
									setPhone(e.target.value);
								}}
							/>
						</div>
						<button
							disabled={loading}
							type='submit'
							style={{
								backgroundColor: loading
									? 'grey'
									: wrongInput == false
									? ''
									: 'red',
							}}
							onClick={(e) => handleClick(e)}
						>
							{wrongInput == false ? 'SUBMIT' : 'ALL FIELDS ARE NEEDED (2 sec)'}
						</button>
						<p>
							<Link href='/Join'>
								<a>Aleardy have a account, LOG IN</a>
							</Link>
						</p>
					</form>
				)}

				{/* form for OTP for verfication */}
				{otpenter && (
					<form action=''>
						<p style={{ fontSize: '1.5rem' }}>Enter the OTP sent on {phone}</p>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<input
								type='otp'
								name='otp'
								id='otp'
								style={{
									width: '60%',
									height: '2rem',
									letterSpacing: '0.2rem',
									fontSize: '1.2rem',
									textAlign: 'center',
								}}
								placeholder='OTP'
								onChange={(e) => {
									setOtp(e.target.value);
								}}
							/>
						</div>
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
							onClick={(e) => handleClickOtp(e)}
						>
							{wrongInput == false ? 'SUBMIT' : 'Enter OTP'}
						</button>
					</form>
				)}
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
	);
}
