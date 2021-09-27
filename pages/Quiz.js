import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';
import classes from '../styles/Quiz.module.css';
import YouTube from 'react-youtube';
import Image from 'next/dist/client/image';
import Pusher from 'pusher-js';
import logo from '../public/logo.svg';
import Chart from 'react-google-charts';
import Head from 'next/dist/shared/lib/head';

const myLoader = ({ src }) => {
	return `${src}`;
};

const Quiz = () => {
	const [data, setData] = useState({
		type: 'leaderboard',
		leaders: [
			{ name: 'Nitin', point: 100 },
			{ name: 'Vijay', point: 200 },
		],
	});
	const [ans, setAns] = useState('');
	const [ready, setReady] = useState(false);
	const [showVideo, setShowVideo] = useState(false);
	const [time, setTime] = useState(100);
	const [time2, setTime2] = useState(100);
	const [graphData, setGraphData] = useState();
	const temp = [
		{
			type: 'text',
			title: 'This is a sample text',
			image: '../public/logo.svg',
		},
		{
			type: 'question',
			prevCorrectAns: 'null',
			question: {
				title: 'This is the question',
				time: 100,
				image: '/logo.png',
				options: ['Option A', 'Option B', 'Option C', 'Option D'],
			},
		},
		{
			type: 'question',
			prevCorrectAns: 'Option A',
			points: 100,
			question: {
				title: 'This is the question',
				time: 100,
				image: '/logo.png',
				options: ['Option A', 'Option B', 'Option C', 'Option D'],
			},
		},
		{
			type: 'leaderboard',
			leaders: [
				{ name: 'Nitin', point: 100 },
				{ name: 'Vijay', point: 200 },
			],
			total: 100,
			rank: 90,
		},
	];

	var opt = {
		playerVars: {
			autoplay: 1,
		},
	};
	useEffect(() => {
		setTime(100);
		setReady(true);
		const chartData = [['Names', 'Points']];

		let pusher = new Pusher('a8db60a268d186196705', {
			cluster: 'ap2',
		});

		let channel = pusher.subscribe('my-channel');
		channel.bind('state', function (data) {
			setData(data);
			console.log(data);
			if (data.type == 'leaderboard') {
				data.leaders.forEach((item) => {
					const temp = [];
					temp.push(item.name);
					temp.push(item.point);
					chartData.push(temp);
				});
				console.log(chartData);
				setGraphData(chartData);
			}
		});
		if (data.type == 'question') {
			setTime2(data.question.time);
			setTime(data.question.time);
		}
	}, []);
	useEffect(() => {
		if (data != undefined && data.type === 'question') {
			var hr = document.getElementById('timeLine');
			if (ready) {
				let temp = setInterval(() => {
					if (time > 0) {
						setTime(time - 1);
						hr.style.width = `${100 - time / 100}vw`;
					} else {
						clearInterval(temp);
					}
				}, 1000);

				return () => clearInterval(temp);
			}
		}
	});

	// if (ready) {
	// 	var player = document.getElementById('liveVideoContainer');
	// 	if (showVideo) {
	// 		player.style.flex = 1;
	// 	} else {
	// 		player.style.flex = 0;
	// 	}
	// }

	const handleClick = (e) => {
		e.preventDefault();
	};

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
			{data != undefined && data.type === 'question' && (
				<hr
					id='timeLine'
					style={{
						margin: 0,
						height: '4px',
						border: 'none',
						background: '#0670ed',
						transition: 'width 1.2s linear',
						borderRadius: '2px',
						marginBottom: 0,
					}}
				/>
			)}
			{data != undefined && data.type === 'question' && (
				<span
					style={{
						position: 'absolute',
						left: `${100 - time / 100}vw`,
						top: '15vh',
						transition: 'left 1.2s linear',
						backgroundColor: '#0670ed',
						color: 'white',
						borderRadius: '10px',
						padding: '0.2rem',
						wordBreak: 'keep-all',
						borderTopLeftRadius: `${
							ready && window.innerWidth > 800 ? 10 : 0
						}px`,
					}}
				>
					{time}sec
				</span>
			)}
			{data != undefined && (
				<div className={classes.board}>
					{/* <div className={classes.playerCont} id='liveVideoContainer'>
					{showVideo && (
						<YouTube
							// videoId={data.items[0].id.videoId}
							className={classes.player}
							opt={opt}
							id='liveVideo'
						/>
					)}
				</div> */}
					{data.type === 'leaderboard' && (
						<div className={classes.leaderBoard}>
							<p
								style={{
									textAlign: 'center',
									fontSize: '1.4rem',
									fontWeight: '600',
								}}
							>
								Leader Board
							</p>

							<div>
								<p style={{ fontWeight: '600', textAlign: 'center' }}>
									Your Rank: {data.rank}
								</p>
								<p style={{ fontWeight: '600', textAlign: 'center' }}>
									Total Participants:{data.total}
								</p>
							</div>

							<Chart
								width={'100%'}
								height={'auto'}
								chartType='BarChart'
								loader={<div>Loading Leader Board</div>}
								data={graphData}
								options={{
									title: 'Top Performers',
									chartArea: {
										width: `${ready && window.innerWidth > 800 ? 80 : 60}%`,
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
					)}
					{data.type === 'text' && (
						<div className={classes.questionCont}>
							<div style={{ marginBottom: '2rem' }}>
								<p
									style={{
										margin: '0',
										textAlign: 'center',
										fontWeight: '600',
									}}
								>
									{data.title}
								</p>
							</div>
							<div style={{ textAlign: 'center' }}>
								<Image
									src={data.image}
									loader={myLoader}
									height='200'
									width='300'
									unoptimized
								/>
							</div>
						</div>
					)}

					{(data.type === 'answer' || data.type === 'question') && (
						<>
							<div className={classes.question}>
								<div className={classes.time}>
									{/* <p>
							<input
								type='checkbox'
								name='video'
								id='video'
								onChange={() => {
									if (showVideo) {
										setShowVideo(false);
									} else {
										setShowVideo(true);
									}
								}}
								defaultChecked
							/>
							<label htmlFor='video'>HIDE VIDEO</label>
						</p> */}
									{/* <p style={{ textAlign: 'right', margin: 0 }}>Time: {time}sec</p> */}
								</div>
								<div className={classes.questionCont}>
									<div style={{ marginBottom: '2rem' }}>
										<label htmlFor='ques'>Q. {data.question.title}</label>
									</div>
									<div style={{ textAlign: 'center' }}>
										<Image
											src='#'
											loader={data.question.image}
											height='200'
											width='300'
											unoptimized
										/>
									</div>
									<div className={classes.option}>
										<input
											type='radio'
											name='ques'
											id='opt1'
											value={data.question.options[0]}
											onChange={(e) => setAns(e.target.value)}
										/>
										<p
											className={classes.p}
											style={{
												color: `${
													data.type === 'answer' && data.correctAns == '0'
														? '#fff'
														: ''
												}`,
												backgroundColor: `${
													data.type === 'answer' && data.correctAns == '0'
														? 'green'
														: ''
												}`,
											}}
										>
											<label htmlFor='opt1'>{data.question.options[0]}</label>
										</p>
									</div>
									<div className={classes.option}>
										<input
											type='radio'
											name='ques'
											id='opt2'
											value={data.question.options[1]}
											onChange={(e) => setAns(e.target.value)}
										/>
										<p
											className={classes.p}
											style={{
												color: `${
													data.type === 'answer' && data.correctAns == '1'
														? '#fff'
														: ''
												}`,
												backgroundColor: `${
													data.type === 'answer' && data.correctAns == '1'
														? 'green'
														: ''
												}`,
											}}
										>
											<label htmlFor='opt2'>{data.question.options[1]}</label>
										</p>
									</div>
									<div className={classes.option}>
										<input
											type='radio'
											name='ques'
											id='opt3'
											value={data.question.options[2]}
											onChange={(e) => setAns(e.target.value)}
										/>
										<p
											className={classes.p}
											style={{
												color: `${
													data.type === 'answer' && data.correctAns == '2'
														? '#fff'
														: ''
												}`,
												backgroundColor: `${
													data.type === 'answer' && data.correctAns == '2'
														? 'green'
														: ''
												}`,
											}}
										>
											<label htmlFor='opt3'>{data.question.options[2]}</label>
										</p>
									</div>
									<div className={classes.option}>
										<input
											type='radio'
											name='ques'
											id='opt4'
											value={data.question.options[3]}
											onChange={(e) => setAns(e.target.value)}
										/>
										<p
											className={classes.p}
											style={{
												color: `${
													data.type === 'answer' && data.correctAns == '3'
														? '#fff'
														: ''
												}`,
												backgroundColor: `${
													data.type === 'answer' && data.correctAns == '3'
														? 'green'
														: ''
												}`,
											}}
										>
											<label htmlFor='opt4'>{data.question.options[3]}</label>
										</p>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			)}
			{data != undefined && data.type === 'question' && (
				<button className={classes.button} onClick={(e) => handleClick(e)}>
					Submit
				</button>
			)}
			{data == undefined && (
				<div className={classes.question}>
					<p style={{ textAlign: 'center' }}>Wait quiz will start soon</p>
					{/* <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
						Please Join us on Youtube
					</p> */}
				</div>
			)}
		</div>
	);
};

export default Quiz;
