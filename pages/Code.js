import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Code.module.css';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import logo from '../public/logo.svg';

const Code = () => {
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
};

export default Code;
