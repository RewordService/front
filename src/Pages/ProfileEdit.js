import React,{useEffect,useState} from 'react';
//scripts
import {UserPatch, UserInfo, CurrentUser} from '../Axios/UsersController';
//partials
import FlashCard from '../Atom/Flash';
import LeftBar from '../Organisms/LeftBar'
import {Btn} from '../Atom/Button';
import {Content} from '../Atom/Content';
import {FlexJustify} from '../Atom/FlexJustify';
import {TextArea} from '../Atom/TextArea';
import {Section} from '../Atom/Section';

export default function ProfileEdit(){
	const [intro, setIntro] = useState('')
	const [count, setCount] = useState(100)
	function IconPatch(e){
		let formData = new FormData();
		formData.append('image',e.target.files[0])
		UserPatch(formData).then(()=>window.location.reload())
	};

	function IconDelete(){
		const data={'image': null};
		UserPatch(data)
		};

	function IntroPatch () {
		UserPatch({intro: intro})
	};

	function handleCountChange(e){ 
		if (e.target.value.length >= 100){
			e.target.value = e.target.value.substring(0,100)
		}else{
			setCount(100-e.target.value.length) 
		}
	};

	useEffect(()=>{
		UserInfo(CurrentUser()).then(res=>{
			setIntro(res.intro)
		})
	},[])	

	return(
		<FlexJustify>
			<FlashCard/>
			<LeftBar/>
			<div>
				<Content>
					<Section>
						<h2>プロフィール画像</h2>
						<input type="file" name="file" accept="image/*" onChange={e=>IconPatch(e)}/>
						<Btn type="button" value="デフォルトに戻す"onClick={e=>IconDelete(e)} />
					</Section>
					<Section className="margin-none">
						<h2>紹介文</h2>
						<TextArea spellCheck="false" value={intro} onKeyUp={e=>handleCountChange(e)} onChange={e => {setIntro(e.target.value); }}/>
						<p>残り{count}文字</p>
						<Btn value="保存" type="button" onClick={e=>IntroPatch(e)}/>
					</Section>
				</Content>
			</div>
		</FlexJustify>
	);
}


