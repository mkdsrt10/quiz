import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';
import classes from '../styles/Quiz.module.css';
import YouTube from 'react-youtube';

const Quiz = () => {
	const [data, setData] = useState();
	const [ans, setAns] = useState('');
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
				<div className={classes.playerCont}>
					<YouTube
						videoId={'dKg8jbk8wGM'}
						className={classes.player}
						opt={opt}
					/>
				</div>
				<div className={classes.question}>
					<div className={classes.time}>
						<p style={{ textAlign: 'right', margin: 0 }}>TIME:</p>
					</div>
					<div className={classes.questionCont}>
						<div>
							<label htmlFor='ques'>Q. {ques[0].ques}</label>
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
		</div>
	);
};

export default Quiz;
