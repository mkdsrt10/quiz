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
		setReady(true);
		fetch(
			`${
				'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
				channelId +
				'&eventType=live&maxResults=1&order=date&type=video&key=' +
				key
			}`
		)
			.then((response) => response.json())
			.then((data) => {
				setData(data), console.log(data, ques);
			});
	}, []);

	if (ready) {
		var player = document.getElementById('liveVideoContainer');
		if (showVideo) {
			player.style.flex = 1;
		} else {
			player.style.flex = 0;
		}
	}
	return (
		<div className={classes.container}>
			<div className={classes.header}>
				<div className={classes.headerContainer}>
					<p>LOGO</p>
					<p style={{ display: 'flex', flexDirection: 'row-reverse' }}>
						<ul>
							<li>
								<Link href='https://www.scoreplus.live/Tracker'>
									<a>TRACK</a>
								</Link>
							</li>
						</ul>
					</p>
				</div>
			</div>

			<div className={classes.board}>
				<div className={classes.playerCont} id='liveVideoContainer'>
					{showVideo && (
						<YouTube
							videoId={'dKg8jbk8wGM'}
							className={classes.player}
							opt={opt}
							id='liveVideo'
						/>
					)}
				</div>
				<div className={classes.question}>
					<div className={classes.time}>
						<p>
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
						</p>
						<p style={{ textAlign: 'right', margin: 0 }}>TIME:</p>
					</div>
					<div className={classes.questionCont}>
						<div style={{ marginBottom: '2rem' }}>
							<label htmlFor='ques'>Q. {ques[0].ques}</label>
						</div>
						<div style={{ textAlign: 'center' }}>
							<Image
								src={
									'https://images.unsplash.com/photo-1567665202038-6c5e97837696?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
								}
								loader={myLoader}
								height='200'
								width='300'
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
			<div className={classes.textEditor}>
				<p>
					<span>pic</span>
					<span>symbol</span>
				</p>
				<textarea name='text' id='text' cols='30' rows='10'></textarea>
			</div>
		</div>
	);
};

export default Quiz;
