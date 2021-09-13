import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';
import classes from '../styles/Quiz.module.css';
import YouTube from 'react-youtube';
import Image from 'next/dist/client/image';

const myLoader = ({ src }) => {
	return `${src}`;
};

const Quiz = () => {
	const [data, setData] = useState();
	const [ans, setAns] = useState('');
	const [ready, setReady] = useState(false);
	const [showVideo, setShowVideo] = useState(false);
	const [time, setTime] = useState();
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
		var key = 'AIzaSyBqehmFSfiommirnXq1ZXcYHgh_zikOvuo';
		var channelId = 'UCXw0dnfXlCMExVOUpK-iOWg';
		setTime(100);
		setReady(true);
		// fetch(
		// 	`${
		// 		'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
		// 		channelId +
		// 		'&eventType=live&maxResults=1&order=date&type=video&key=' +
		// 		key
		// 	}`
		// )
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		setData(data), console.log(data, ques);
		// 	});
	}, []);
	useEffect(() => {
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
					borderTopLeftRadius: `${ready && window.innerWidth > 800 ? 10 : 0}px`,
				}}
			>
				{time}sec
			</span>
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
							<label htmlFor='ques'>Q. {ques[0].ques}</label>
						</div>
						<div style={{ textAlign: 'center' }}>
							<Image
								src={'https://www.ducksters.com/kidsmath/volume_box.gif'}
								loader={myLoader}
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
								value={ques[0].opts.a}
								onChange={(e) => setAns(e.target.value)}
							/>
							<p className={classes.p}>
								<label htmlFor='opt1'>{ques[0].opts.a}</label>
							</p>
						</div>
						<div className={classes.option}>
							<input
								type='radio'
								name='ques'
								id='opt2'
								value={ques[0].opts.b}
								onChange={(e) => setAns(e.target.value)}
							/>
							<p className={classes.p}>
								<label htmlFor='opt2'>{ques[0].opts.b}</label>
							</p>
						</div>
						<div className={classes.option}>
							<input
								type='radio'
								name='ques'
								id='opt3'
								value={ques[0].opts.c}
								onChange={(e) => setAns(e.target.value)}
							/>
							<p className={classes.p}>
								<label htmlFor='opt3'>{ques[0].opts.c}</label>
							</p>
						</div>
						<div className={classes.option}>
							<input
								type='radio'
								name='ques'
								id='opt4'
								value={ques[0].opts.d}
								onChange={(e) => setAns(e.target.value)}
							/>
							<p className={classes.p}>
								<label htmlFor='opt4'>{ques[0].opts.d}</label>
							</p>
						</div>
					</div>
				</div>
			</div>

			<button className={classes.button} onClick={(e) => handleClick(e)}>
				Submit
			</button>
		</div>
	);
};

export default Quiz;
