import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Set_Modal} from '../../REDUX/actions';

import './Lesson.scss';


export const Lesson = ({type,ind})=>{
	const lesson = useSelector(state => state.main.lesson_dates)
    const dispatch = useDispatch()


	let styles = lesson[ind].status ? {background: '#A1F9CF'} : type==='past' ? {background: '#F9A1A1'} : {background: '#A1EEF9'};

	let size = lesson[ind].time_end.split(':')[0] - lesson[ind].time_start.split(':')[0];
	if (+lesson[ind].time_start.split(':')[1] !== 0 || +lesson[ind].time_end.split(':')[1] !== 0) {
		size +=1;
	}
	let pb = +lesson[ind].time_end.split(':')[1] === 0 ? 0 : +lesson[ind].time_end.split(':')[1] === 15 ? 30 : +lesson[ind].time_end.split(':')[1] === 45 ? 10 : 20;
	let pt = +lesson[ind].time_start.split(':')[1] === 0 ? 0 : +lesson[ind].time_start.split(':')[1] === 15 ? 10 : +lesson[ind].time_start.split(':')[1] === 45 ? 30 : 20;


	function setModalHandler (e) {
		let check = e.target;

		while (check.classList[0] !== 'Calendar-item') {
			check = check.parentNode
		}

	    let dataForModal = JSON.parse(JSON.stringify(lesson))

	    check = check.classList[1]
		
		let send = dataForModal.filter(i=>(
			i.time_start.split(':')[0] === check.split('-')[1].split(':')[0] &&
			i.date.split('.')[0] === check.split('.')[0] &&
			+i.date.split('.')[1] === ++check.split('-')[0].split('.')[1]
			))

		console.log(send)

		// 'Calendar-item'
		dispatch(Set_Modal({type: 'update_lesson', payload: check, update: send[0]}))
	}


	return (
		<div 
		className='lesson'
		onClick={(e)=>setModalHandler(e)}
		>
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