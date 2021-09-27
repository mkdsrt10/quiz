import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/Code.module.css';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import logo from '../public/logo.svg';
import svg from '../public/code/img.svg';
import {joinQuiz, startQuiz} from "../functions/quiz";

const Code = ({token, setQuizCode, setData}) => {
	const [code, setCode] = useState('');
	const [quizMeta, setQuizMeta] = useState(null);
	const [error, setError] = useState('Submit');
	const [ready, setReady] = useState(false);
	const [start, setStart] = useState(0);
	// 0 --> No join request till now
	// 1 --> Joined, ready to start
	// 2 --> Start

	const route = useRouter();
	useEffect(() => {
		setReady(true);
	}, []);

	const handleClick = async (e) => {
		e.preventDefault();
		const {data, error} = await joinQuiz({token, id:code})
		if (error){
			setError(data)
		} else {
			setError("Start quiz");
			setStart(1);
			console.log(data)
			setQuizMeta(data)

		}
	};

	const startQuizFu = async (e) => {
		e.preventDefault();
		const {data, error} = await startQuiz({token, id:code})
		if (error){
			setError(data)
		} else {
			setStart(2);
			setData(data)
			setQuizCode(code)
		}
	}

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
									<a style={{ fontSize: '1rem' }}>Study Tracker</a>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<svg
				style={{
					position: 'absolute',
					bottom: '0',
					transformOrigin: 'center',
					transform: 'rotateY(180deg)',
					zIndex: '-1',
				}}
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 1440 320'
			>
				<path
					fill='#ffd334'
					fillOpacity='1'
					d='M0,32L48,64C96,96,192,160,288,192C384,224,480,224,576,218.7C672,213,768,203,864,202.7C960,203,1056,213,1152,229.3C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
				></path>
			</svg>
			<div className={styles.content}>
				<div className={styles.code}>
					{
						start === 0 &&
						<div style={{ width: '100%' }}>
							<p style={{ textAlign: 'center' }}>
								Enter the code shown on the Screen
							</p>
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
					}
					{
						start === 1 && quizMeta !== null &&
						<div style={{ width: '100%' }}>
							<p style={{ textAlign: 'center' }}>
								Quiz #{code}
							</p>
							<form className={styles.codeContainer}>
								<div style={{ width: '100%' }}>
									<h1>{quizMeta.title}</h1>
									{/*{quizMeta.image !== "" && <Image src={quizMeta.image} height={100} width={100}/>}*/}
									<h3>{quizMeta.total_questions}</h3>
								</div>
								<button className={styles.button} onClick={(e) => startQuizFu(e)}>
									{error}
								</button>
							</form>
						</div>
					}
				</div>
				{/*{ready && window.innerWidth > 500 && (*/}
				{/*	<div className={styles.svg}>*/}
				{/*		<div style={{ width: '100%', height: '100%' }}>*/}
				{/*			<Image src={svg} className={styles.image} />*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*)}*/}
			</div>
		</div>
	);
};

export default Code;
