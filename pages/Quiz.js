import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';
import classes from '../styles/Quiz.module.css';
import YouTube from 'react-youtube';
import Image from 'next/dist/client/image';
import Pusher from 'pusher-js';
import logo from '../public/logo.svg';
import Chart from 'react-google-charts';

const myLoader = ({ src }) => {
	return `${src}`;
};

const Quiz = () => {
	const [data, setData] = useState();
	const [ans, setAns] = useState('');
	const [ready, setReady] = useState(false);
	const [showVideo, setShowVideo] = useState(false);
	const [time, setTime] = useState();
	const [graphData, setGraphData] = useState();
	const temp = [
		{
			type: 'text',
			title: 'This is a sample text',
			image: '../public/logo.svg',
		},
		{
			type: 'question',
			question: {
				title: 'This is the question',
				image: '/logo.png',
				options: [
					{ id: 0, title: 'Option A' },
					{ id: 1, title: 'Option B' },
					{ id: 2, title: 'Option C' },
					{ id: 3, title: 'Option D' },
				],
			},
		},
		{
			type: 'answer',
			correctAns: 1,
			question: {
				title: 'This is the question',
				image: '/logo.png',
				options: [
					{ id: 0, title: 'Option A' },
					{ id: 1, title: 'Option B' },
					{ id: 2, title: 'Option C' },
					{ id: 3, title: 'Option D' },
				],
			},
		},
		{
			type: 'leaderboard',
			leaders: [
				{ name: 'Nitin', point: 100 },
				{ name: 'Vijay', point: 200 },
			],
		},
	];
	const [ques, setQues] = useState([
		{
			id: 1,
			ques: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo tenetur eos nesciunt, vel amet tempora hic harum officia a aperiam beatae, rerum quis eligendi culpa consequatur facere officiis, maiores corrupti.',
			opts: {
				a: 'a',
				b: 'b',
				c: 'c',
				d: 'd',
			},
		},
	]);

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
	}, []);
	useEffect(() => {
		if (data != undefined && data.type === 'question') {
			var hr = document.getElementById('timeLine');
			if (ready) {
				let temp = setInterval(() => {
					if (time > 0) {
						setTime(time - 1);
						hr.style.width = `${time}vw`;
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
						left: `${time}vw`,
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
							<Chart
								width={'100%'}
								height={'auto'}
								chartType='BarChart'
								loader={<div>Loading Leader Board</div>}
								data={graphData}
								options={{
									title: 'Top Performers',
									chartArea: { width: `${window.innerWidth > 800 ? 80 : 60}%` },
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
											value={data.question.options[0].title}
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
											<label htmlFor='opt1'>
												{data.question.options[0].title}
											</label>
										</p>
									</div>
									<div className={classes.option}>
										<input
											type='radio'
											name='ques'
											id='opt2'
											value={data.question.options[1].title}
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
											<label htmlFor='opt2'>
												{data.question.options[1].title}
											</label>
										</p>
									</div>
									<div className={classes.option}>
										<input
											type='radio'
											name='ques'
											id='opt3'
											value={data.question.options[2].title}
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
											<label htmlFor='opt3'>
												{data.question.options[2].title}
											</label>
										</p>
									</div>
									<div className={classes.option}>
										<input
											type='radio'
											name='ques'
											id='opt4'
											value={data.question.options[3].title}
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
											<label htmlFor='opt4'>
												{data.question.options[3].title}
											</label>
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
					<p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
						Please Join us on Youtube
					</p>
				</div>
			)}
		</div>
	);
};

export default Quiz;
