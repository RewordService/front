import React,{useState,useEffect,useRef} from 'react';
import styled from 'styled-components';
//scripts
import {GameIndex} from '../Axios/GamePost'
import {IsSignedIn} from '../Axios/UsersController';
//partials
import {Content} from '../Atom/Content';
import {Section} from '../Atom/Section';

export default function RewordInfo() {
	const [scoreTotal, setScoreTotal]=useState(0)
	const [scoreRate, setScoreRate]=useState(0)
	const refScoreTotal = useRef(scoreTotal)
	const refScoreRate = useRef(scoreRate)
	const [flag,setFlag] = useState(IsSignedIn())

	useEffect(()=>{
		refScoreTotal.current=scoreTotal;
	}, [scoreTotal]);

	useEffect(()=>{
		refScoreRate.current=scoreRate;
	}, [scoreRate]);
	

	useEffect(()=>{
		GameIndex().then(res=>{
			console.log(res)
			let timer = setInterval(async()=>{
				await setScoreTotal(score=>score+1)
				if(res.score_total<refScoreTotal.current) clearInterval(timer)
			},10)

			let timer1 = setInterval(()=>{
				setScoreRate(score=>score+1)
				if(res.score_rate<refScoreRate.current){
					clearInterval(timer1)
					setScoreRate(res.score_rate)
				}
			},10)
		})
	},[])
	return(
		<Container className={flag.toString()}>
			<Section>
				<h2>Reword</h2>
			</Section>
			<div className="table">
				<div className="score-total">
					<p>総合Reword数</p>
					<h1>{scoreTotal}</h1>
				</div>
				<div className="border"/>
				<div className="score-rate">
					<p>総合正答率</p>
					<h1>{scoreRate}%</h1>
				</div>
			</div>
		</Container>
	);
}

const Container = styled(Content)`
	width: 1060px;
	margin-bottom: 10px;	
	transform: translateX(5px);
	&.false{
		width: 800px;
		transform: translateX(0px);
		@media screen and (max-width: 800px){
			width: 600px;
		}
		@media screen and (max-width: 500px){
			width: 350px;
		}
	}
	.table{
		display: flex;
		justify-content: space-around;
		text-align: center;
		h1{
			font-size: 36px;
		}
		.border{
			border-left: solid 1px #bababa;
		}
	}
`
