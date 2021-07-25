import React from 'react'
import {useSelector} from 'react-redux';

import './Lesson.scss';


export const Lesson = ({type,ind})=>{
	const lesson = useSelector(state => state.main.lesson_dates)


	let styles = lesson[ind].status ? {background: '#A1F9CF'} : type==='past' ? {background: '#F9A1A1'} : {background: '#A1EEF9'};

	let size = lesson[ind].time_end.split(':')[0] - lesson[ind].time_start.split(':')[0];
	if (+lesson[ind].time_start.split(':')[1] !== 0 || +lesson[ind].time_end.split(':')[1] !== 0) {
		size +=1;
	}
	let pb = +lesson[ind].time_end.split(':')[1] === 0 ? 0 : 25 
	let pt = +lesson[ind].time_start.split(':')[1] === 0 ? 0 : 25 


	return (
		<div className='lesson'>
			<div className="lesson-screen" style={{height: 100*size+'%'}}>
				<div className="lesson-body" style={{paddingTop: pt+'px', paddingBottom: pb+'px'}}>
					<div className="lesson-type" style={styles}>
						<img
		                  src={require("../../img/avatar.svg").default}
		                  alt="account"
		                /> 
		                <span>{lesson[ind].student_name}</span>
					</div>
				</div>
			</div>
		</div>
	)
}