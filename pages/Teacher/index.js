import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Teacher.module.css';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import logo from '../../public/logo.svg';
import Chart from 'react-google-charts';

export default function Home() {
	const [state, setState] = useState();
	const [graphData, setGraphData] = useState();

	useEffect(() => {
		console.log(state);
		const chartData = [['Names', 'Points']];
		let pusher = new Pusher('a8db60a268d186196705', {
			cluster: 'ap2',
		});

		let channel = pusher.subscribe('my-channel');
		channel.bind('state', function (data) {
			setState(data);
			console.log(data);
			if (data.type == 'leaderboard') {
				data.leaders.forEach((item) => {
					const temp = [];
					temp.push(item.name);
					temp.push(item.point);
					chartData.push(temp);
				});

				setGraphData(chartData);
			}
		});
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		await fetch('/api/websoket?action=next&id=1');
	}, []);

	const handle = useFullScreenHandle();

	async function nextEvent() {
		await fetch('/api/websoket?action=next&id=2');
	}

	async function previousEvent() {
		await fetch('/api/websoket?action=previous&id=0');
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
				</div>
			</div>
			<main className={styles.main}>
				<button onClick={handle.enter} style={{ marginLeft: '-.5rem' }}>
					Enter fullscreen
				</button>
				<FullScreen handle={handle}>
					<div
						style={{ with: '100%', height: '100%', backgroundColor: 'white' }}
					>
						{state && state.type === 'question' ? (
							<div>
								<h2 style={{ textAlign: 'left' }}>Q {state.question.title}</h2>
								<Image
									src={state.question.image}
									width={'300'}
									height={'200'}
								/>
								<div>
									{state.question.options.map((opt, index) => {
										// eslint-disable-next-line react/jsx-key
										return (
											<p
												key={index}
												style={{ textAlign: 'left', paddingLeft: '1rem' }}
											>
												<span style={{ fontWeight: '300' }}>{opt.id + 1}.</span>
												{opt.title}
											</p>
										);
									})}
								</div>
							</div>
						) : state && state.type === 'answer' ? (
							<div>
								<h2 style={{ textAlign: 'left' }}>Q {state.question.title}</h2>
								<Image
									src={state.question.image}
									width={'300'}
									height={'200'}
								/>
								<div>
									{state.question.options.map((opt, index) => {
										// eslint-disable-next-line react/jsx-key
										return (
											<p
												key={index}
												style={{
													textAlign: 'left',
													paddingLeft: '1rem',
													color: state.correctAns === opt.id && 'green',
												}}
											>
												<span style={{ fontWeight: '300' }}>{opt.id + 1}.</span>{' '}
												{opt.title}
											</p>
										);
									})}
								</div>
							</div>
						) : state && state.type === 'leaderboard' ? (
							<div style={{ paddingTop: '3rem' }}>
								{/* {state.leaders.map((opt) => {
									// eslint-disable-next-line react/jsx-key
									return (
										<p>
											{opt.name} - {opt.point}
										</p>
									);
								})} */}

								<Chart
									width={'100%'}
									height={'auto'}
									chartType='BarChart'
									loader={<div>Loading Leader Board</div>}
									data={graphData}
									options={{
										title: 'Top Performers',
										chartArea: {
											width: `${window.innerWidth > 800 ? 80 : 60}%`,
										},
										hAxis: {
											title: 'Points',
											minValue: 0,
										},
										vAxis: {
											title: 'Names',
										},
									}}
								/>
							</div>
						) : state && state.type === 'text' ? (
							<div>
								<h2>{state.title}</h2>
								<Image src={state.image} width={'300'} height={'200'} />
							</div>
						) : (
							<div></div>
						)}
						<div>
							<button onClick={previousEvent}>
								<svg
									style={{ transform: 'rotateZ(180deg)' }}
									width='19'
									height='17'
									viewBox='0 0 19 17'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										id='Vector'
										d='M0.657471 8.56733C0.657471 8.13789 0.974475 7.78313 1.38379 7.7311L1.48792 7.72453H18.0968C18.4334 7.72453 18.7357 7.93017 18.8642 8.24594C18.9062 8.34932 18.9273 8.45832 18.9273 8.56733C18.9273 8.74993 18.8688 8.93098 18.7564 9.07925L18.6826 9.16403L11.9836 15.9345C11.6592 16.2626 11.1333 16.2615 10.8099 15.9323C10.5136 15.6294 10.4889 15.1557 10.7376 14.8261L10.8122 14.74L16.086 9.41013H1.48792C1.02951 9.41013 0.657471 9.03255 0.657471 8.56733ZM10.812 2.395C10.4865 2.06687 10.4865 1.5331 10.8098 1.20272C11.1062 0.900907 11.5729 0.874811 11.8993 1.1253L11.9846 1.20047L15.6785 4.93464C15.8423 5.09983 15.9232 5.31558 15.9232 5.53246C15.9232 5.7471 15.8423 5.96173 15.6807 6.12692C15.3843 6.42976 14.9186 6.45594 14.5923 6.2046L14.507 6.12916L10.812 2.395Z'
										fill='white'
									/>
								</svg>
							</button>
							<button onClick={nextEvent}>
								<svg
									width='19'
									height='17'
									viewBox='0 0 19 17'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										id='Vector'
										d='M0.657471 8.56733C0.657471 8.13789 0.974475 7.78313 1.38379 7.7311L1.48792 7.72453H18.0968C18.4334 7.72453 18.7357 7.93017 18.8642 8.24594C18.9062 8.34932 18.9273 8.45832 18.9273 8.56733C18.9273 8.74993 18.8688 8.93098 18.7564 9.07925L18.6826 9.16403L11.9836 15.9345C11.6592 16.2626 11.1333 16.2615 10.8099 15.9323C10.5136 15.6294 10.4889 15.1557 10.7376 14.8261L10.8122 14.74L16.086 9.41013H1.48792C1.02951 9.41013 0.657471 9.03255 0.657471 8.56733ZM10.812 2.395C10.4865 2.06687 10.4865 1.5331 10.8098 1.20272C11.1062 0.900907 11.5729 0.874811 11.8993 1.1253L11.9846 1.20047L15.6785 4.93464C15.8423 5.09983 15.9232 5.31558 15.9232 5.53246C15.9232 5.7471 15.8423 5.96173 15.6807 6.12692C15.3843 6.42976 14.9186 6.45594 14.5923 6.2046L14.507 6.12916L10.812 2.395Z'
										fill='white'
									/>
								</svg>
							</button>
						</div>
					</div>
				</FullScreen>
			</main>
		</div>
	);
}
