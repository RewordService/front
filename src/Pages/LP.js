import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Color from '../Assets/Color';
import Observer from '@researchgate/react-intersection-observer';
//partials
import AuthBtns from "../Molecules/AuthBtns";

export default function LP (){
	const [first, setFirst]= useState(false)
	const [second, setSecond]= useState(false)
	const [third, setThird]= useState(false)

	useEffect(()=>{
	},[])
	return(
		<Container id="window" style={{marginTop: '-40px'}}>
			<Observer onChange={e=>setFirst(e.isIntersecting)}>
				<article className={'fade-'+first}>
					<section>
						<h1>Reword <br/><span className="subtitle">-ワーキングメモリーを鍛える-</span></h1>
						<p>逆唱を行うことでワーキングメモリーを鍛えます。</p>
						<p>会員登録を行うことで、試行回数、正答率などを記録し<br/>グラフで確認することができます</p>
					</section>
					<AuthBtns/>
				</article>
			</Observer>

			<Observer onChange={e=>setSecond(e.isIntersecting)}>
				<article className={'fade-'+second}>
					<section>
						<h1>ワーキングメモリーとは</h1>
						<p>ワーキングメモリーとは<span className="red">「短期記憶に存在する情報に対して処理を行う能力」</span>を指します。</p>
						<p>Rewordでは、<span className="blue">「短期記憶に保持した文字列を逆から読み返すという処理」</span>を行います。</p>
					</section>
				</article>
			</Observer>

			<Observer onChange={e=>setThird(e.isIntersecting)}>
				<article className={'fade-'+third}>
					<section>
						<h1>Reword</h1>
						<p>Rewordではワーキングメモリーを鍛えるサービスを提供します。</p>
						<div className="row">

							<Card>
								<i className="fas fa-comments" style={{fontSize: '50px'}}/>
								<h2>- 逆唱で鍛える -</h2>
								<p>逆唱とは、ある文字列を提示された際、その文字列を反対から読み返すことを指します。<br/>
								この処理を少しづつ負荷をかけながら継続をすることで鍛えることができます。</p>
							</Card>

							<Card>
								<i className="far fa-chart-bar" style={{fontSize: '50px'}}/>
								<h2>- 成績をグラフ化 -</h2>
								<p>会員登録を行うことで、成績をグラフ化し自分の成長を可視化することができます。</p>
							</Card>

							<Card>
								<i className="fas fa-database" style={{fontSize: '50px'}} />
								<h2>- データの蓄積 -</h2>
								<p>正答数や正答率、試行回数、の他に生年月日や性別を入力することで。良質なデータを蓄積し皆様にお届けすることができます。</p>
							</Card>


						</div>
					</section>
					<AuthBtns/>
				</article>
			</Observer>

		</Container>
	);
}

const Card =styled.div`
	width: 250px;
	padding: 30px;
	border-radius: 10px;
	h2,p,i{
		color: white;
	}
`


const Container = styled.div`
	.fade-false{opacity:0;}
	.fade-true{opacity: 1; transition: 2s ease;}
	span{
		&.red{color: ${Color.red};}
		&.blue{color: ${Color.blue};}
	}
	article{
		padding: 200px 10%;
		span,p,h1{
			margin: 0;
			font-weight: bold;
			letter-spacing: 3px;
		}
	}
	article:first-child{
		background: linear-gradient(90deg,${Color.blue} 60%, ${Color.blue2});
		section{
			padding: 30px;
			margin-bottom: 30px;
		}
		p,h1{
			color:white;
		}
		h1{
			font-size: 50px;
		}
	}
	article:nth-child(2){
		padding: 300px 0;
		text-align: center;
		section{
			h1{
				margin-bottom: 50px;
				text-align: center;
				font-size: 50px;
				color: #2b2b2b;
			}
			p{
				margin-bottom: 15px;
			}
			span{
				font-size: 17px;
			}
		}
	}
	article:last-child{
		position: relative;
		background: #2b2b2b;
		text-align: center;
		margin-bottom: -30px;
		section{
			padding: 30px;
			p,h1{
				color: white;
			}
			h1{
				margin-bottom: 50px;
				text-align: center;
				font-size: 50px;
			}
			.row{
				display: flex;
				justify-content: space-around;
			}
		}
	}
	@media screen and (max-width:1000px){
		.subtitle{
			font-size: 22px;
		}
		.row{
			flex-direction: column;
			align-items: center;
		}
	}
`
