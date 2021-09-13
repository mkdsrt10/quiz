import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

export default function Home() {
	const [code, setCode] = useState('');
	const [error, setError] = useState('Submit');
	const route = useRouter();

	const handleClick = (e) => {
		e.preventDefault();
		if (code === '1234') {
			route.push('/Quiz');
		} else {
			setError('Invalid Code');
			setTimeout(() => {
				setError('Submit');
			}, 1000);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.headerContainer}>
					<p>LOGO</p>
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
			<div className={styles.code}>
				<p>Enter the code shown on the Screen</p>
				<form className={styles.codeContainer}>
					<div style={{ width: '100%' }}>
						<input
							type='text'
							name='code'
							id='code'
							onChange={(e) => setCode(e.target.value)}
						/>
					</div>
					<button className={styles.button} onClick={(e) => handleClick(e)}>
						{error}
					</button>
				</form>
			</div>
		</div>
	);
}
