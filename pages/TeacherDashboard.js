import classes from '../styles/TeacherDashboard.module.css';
import Head from 'next/dist/shared/lib/head';
import Link from 'next/link';
import Image from 'next/dist/client/image';
import logo from '../public/logo.svg';
import quiz from '../public/teacher/quiz.svg';
import quiz1 from '../public/teacher/quiz 1.svg';
import { useEffect, useState } from 'react';
const TeacherDashboard = () => {
	const [ready, setReady] = useState(false);
	useEffect(() => {
		setReady(true);
	}, []);
	return (
		<div className={classes.container}>
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
				</div>
			</div>
			<div className={classes.content}>
				<div className={classes.choices}>
					<div className={classes.create}>
						<div style={{ width: '100%' }}>
							<h1
								style={{
									width: '100%',
									fontWeight: '500',
									fontSize: '2.5rem',
									textAlign: 'right',
								}}
							>
								Create a Quiz
							</h1>
							<Link href='#'>
								<a style={{ float: 'right' }}>
									<button>Let&apos;s Create</button>
								</a>
							</Link>
						</div>
					</div>

					<div className={classes.start}>
						<div style={{ width: '100%' }}>
							<h1
								style={{
									fontWeight: '500',
									fontSize: '2.5rem',
									textAlign: 'right',
								}}
							>
								Start a Quiz
							</h1>
							<Link href='/Teacher'>
								<a style={{ float: 'right' }}>
									<button>Let&apos;s Start</button>
								</a>
							</Link>
						</div>
					</div>
				</div>
				<div className={classes.illustration}>
					<div style={{ width: '100%' }}>
						<Image src={quiz1} className={classes.quizImage} />
					</div>
				</div>
			</div>
			<div className={classes.quizList}>
				<h1
					style={{ textAlign: 'center', fontWeight: '500', fontSize: '3rem' }}
				>
					List Of Quiz
				</h1>
				<div>
					<ul
						style={{
							listStyle: 'none',
							padding: '0',
						}}
					>
						<li
							style={{
								display: 'block',
								textAlign: 'center',
							}}
						>
							<h2>Quiz 1</h2>
						</li>
						<li
							style={{
								display: 'block',
								textAlign: 'center',
							}}
						>
							<h2>Quiz 2</h2>
						</li>
						<li
							style={{
								display: 'block',
								textAlign: 'center',
							}}
						>
							<h2>Quiz 3</h2>
						</li>
						<li
							style={{
								display: 'block',
								textAlign: 'center',
							}}
						>
							<h2>Quiz 4</h2>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default TeacherDashboard;
