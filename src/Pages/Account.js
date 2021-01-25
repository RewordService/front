import React from 'react';
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,Legend,CartesianGrid,Tooltip} from 'recharts';
//scripts
import {UserInfo} from '../Axios/UsersController';
//partials
import LeftBar from '../Organisms/LeftBar';
import {Section} from '../Atom/Section';
import {Content} from '../Atom/Content';
import {FlexJustify} from '../Atom/FlexJustify';
import UserProfile from '../Molecules/UserProfile';


export default class Account extends React.Component{
	constructor(props){
		super(props);
		this.state={
			name: ' ',
			created_date: ' ',
			total: 0,
			rewords:[
				{
					name: '2',
					total: 0,
					correct: 0,
					percent: 0,
				},{	
					name: '3',
					total: 0,
					correct: 0,
					percent: 0,
				},{
					name: '4',
					total: 0,
					correct: 0,
					percent: 0,
				},{
					name: '5',
					total: 0,
					correct: 0,
					percent: 0,
				},{
					name: '6',
					total: 0,
					correct: 0,
					percent: 0,
				},{
					name: '7',
					total: 0,
					correct: 0,
					percent: 0,
				},{
					name: '8',
					total: 0,
					correct: 0,
					percent: 0,
				},{
					name: '9',
					total: 0,
					correct: 0,
					percent: 0,
				},{
					name: '10',
					total: 0,
					correct: 0,
					percent: 0,
				},
			]
		}
	}
	componentDidMount() {
		UserInfo(this.props.match.params.id)
		.then(res=>{
			let rewords = res.rewords[0];
			this.setState({	
				rewords:[
					{
						name: '2',
						total: rewords.second_total,
						correct: rewords.second_success,
						percent:  this.calPercent(rewords.second_success,rewords.second_total),
					},{	
						name: '3',
						total: rewords.third_total,
						correct: rewords.third_success,
						percent: this.calPercent(rewords.third_success,rewords.third_total),
					},{
						name: '4',
						total: rewords.fourth_total,
						correct: rewords.fourth_success,
						percent:  this.calPercent(rewords.fourth_success,rewords.fourth_total)
					},{
						name: '5',
						total: rewords.fifth_total,
						correct: rewords.fifth_success,
						percent:  this.calPercent(rewords.fifth_success,rewords.fifth_total)
					},{
						name: '6',
						total: rewords.sixth_total,
						correct: rewords.sixth_success,
						percent:  this.calPercent(rewords.sixth_success,rewords.sixth_total)
					},{
						name: '7',
						total: rewords.seventh_total,
						correct: rewords.seventh_success,
						percent:  this.calPercent(rewords.seventh_success,rewords.seventh_total)
					},{
						name: '8',
						total: rewords.eighth_total,
						correct: rewords.eighth_success,
						percent:  this.calPercent(rewords.eighth_success,rewords.eighth_total)
					},{
						name: '9',
						total: rewords.ninth_total,
						correct: rewords.ninth_success,
						percent: this.calPercent(rewords.ninth_success,rewords.ninth_total)
					},{
						name: '10',
						total: rewords.tenth_total,
						correct: rewords.tenth_success,
						percent:  this.calPercent(rewords.tenth_success,rewords.tenth_total)
					},
				]
			})
		})
		.catch(err=>{
			console.log("ゲームデータがないやん//",err);
		});
  	}
  	
  	calPercent = (success,total) =>{
		let result=Math.round((success/total)*100)
		if(isNaN(result)) return 0;
		if(result>100) return 100
		return result
  	}
	
	render(){
		return(
			<FlexJustify>
				<LeftBar/>
				<div>
					<UserProfile id={this.props.match.params.id}/>	
					<Content>
						<Section>
							<h2>成績</h2>
							<h3>正答数</h3>
							<ResponsiveContainer width="99%" aspect={2}>
							<BarChart 
								data={this.state.rewords}
								width={730}
					  			height={400}
					  			label={{value: '正答数', position: 'top'}}
					  			margin={{ top: 20, right: 50, left: 50, bottom: 20 }}
					  		>
					  			<Legend verticalAlign="top" height={36}/>
					  			<Tooltip />
					  			<CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
								<XAxis dataKey="name" label={{value: '文字数', position: 'bottom'}}/>
								<YAxis domain={['dataMin', 'dataMax']} label={{value: '試行回数', angle: -90, position: 'left'}}/>
								<Bar type="monotone"  dataKey="total" barSize={10} fill="#78dbff"/>
								<Bar type="monotone" dataKey="correct" barSize={10} fill="#ff7878"/>
							</BarChart>
							</ResponsiveContainer>
						</Section>
						<Section>
							<h3>正答率</h3>
							<ResponsiveContainer width="99%" aspect={2}>
							<BarChart 
								data={this.state.rewords}
								width={730}
					  			height={400}
					  			margin={{ top: 20, right: 50, left: 50, bottom: 20 }}
					  		>
					  			<Tooltip />
					  			<CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
								<XAxis dataKey="name" label={{value: '文字数', position: 'bottom'}}/>
								<YAxis ticks={[0,10,20,30,40,50,60,70,80,90,100]} unit="" label={{value: 'パーセント', angle: -90, position: 'left'}}/>
								<Bar type="monotone"  dataKey="percent" barSize={10} fill="#2a7886"/>
							</BarChart>
							</ResponsiveContainer>
						</Section>
					</Content>
				</div>
			</FlexJustify>
		);
	}
}
