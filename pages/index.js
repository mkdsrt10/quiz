import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/dist/client/image';
import logo from '../public/logo.svg';

export default function Home() {
	const [error, setError] = useState('Submit');
	const [name, setName] = useState('');
	const [classNum, setClassNum] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [alreadyHaveAccount, setAlreadyHaveAccount] = useState(false);
	const [detailsFilled, setDetailsFilled] = useState(false);
	const [otp, setOtp] = useState('');
	const route = useRouter();

	const handleClick = (e) => {
		e.preventDefault();
		if (classNum != '' && email != '' && phone != '' && classNum != '') {
			setDetailsFilled(true);
		} else {
			setError('All details are  required');
			setTimeout(() => {
				setError('Submit');
			}, 2000);
		}
	};

	const clickAfterOtp = (e) => {
		e.preventDefault();
		if (otp != '') {
			route.push('/Code');
		} else {
			setError('Invalid OTP');
			setTimeout(() => {
				setError('Submit');
			}, 2000);
		}
	};

	return (
		<div className={styles.container}>
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
				{!alreadyHaveAccount && !detailsFilled && (
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
								<option value='' hidden>
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
							<label htmlFor='phone'>Phone No.</label>
							<input
								type='text'
								name='phone'
								id='phone'
								onChange={(e) => {
									setPhone(e.target.value);
								}}
							/>
						</div>
						<button
							onClick={(e) => {
								handleClick(e);
							}}
						>
							{error}
						</button>
						<p
							onClick={() => {
								setAlreadyHaveAccount(true);
							}}
						>
							Aleardy have a account, LOG IN
						</p>
					</form>
				)}

				{alreadyHaveAccount && !detailsFilled && (
					<form action=''>
						<p style={{ fontSize: '1.2rem', marginBottom: '4rem' }}>
							Please enter the number you have Registered
						</p>
						<div>
							<label
								htmlFor='phone'
								style={{ display: 'block', textAlign: 'center' }}
							>
								Phone Number
							</label>
							<input
								style={{
									display: 'block',
									float: 'none',
									margin: 'auto',
									width: '12rem',
								}}
								type='text'
								name='phone'
								id='phone'
								onChange={(e) => {
									setPhone(e.target.value);
								}}
							/>
						</div>
						<button
							onClick={(e) => {
								handleClick(e);
								setDetailsFilled(true);
							}}
						>
							{error}
						</button>
						<p
							onClick={() => {
								setAlreadyHaveAccount(false);
							}}
						>
							Register
						</p>
					</form>
				)}

				{/* form for OTP for verfication */}
				{detailsFilled && (
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
						{/* <div>
							<label htmlFor='class'>Course</label>
							<select
								style={{ width: '8rem' }}
								name='class'
								id='class'
								onChange={(e) => setCourse(e.target.value)}
							>
								<option value='' hidden>
									Course
								</option>
								<option value='6'>10</option>
								<option value='7'>11</option>
								<option value='8'>12th</option>
								<option value='9'>9</option>
								<option value='10'>10</option>
								<option value='11'>11</option>
								<option value='12'>12</option>
							</select>
						</div> */}
						<button
							onClick={(e) => {
								clickAfterOtp(e);
							}}
						>
							{error}
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
