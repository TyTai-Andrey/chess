import React from 'react'

import './Calendar.scss';
import {useSelector, useDispatch} from 'react-redux';
import {Lesson} from '../Lesson/Lesson';
import {Set_Modal} from '../../REDUX/actions';
import {DAYS, TIMES} from '../DATA';






export const Calendar = ({week}) => {

	const state = useSelector(state => state.main)
	const dispatch = useDispatch()

	const Year = state.calendar.getFullYear()

	let nowDate = new Date()
	

	function CalendarDate() {
		const CalendarDate = state.nowWeek.map((i,index)=><div key={''+DAYS[index]+index} className="Calendar-date"><span className='num'>{i.Day}</span> <span className='letter'>{DAYS[index]}</span></div>)
		return <><div className="Calendar-date-spase"></div>{CalendarDate}</>
	}

	function setModalHandler (e) {
		let check = e.target;

		while (check.classList[0] !== 'Calendar-item') {
			check = check.parentNode
		}

		console.log(check.classList)
		// 'Calendar-item'
		dispatch(Set_Modal({type: 'new_lesson', payload: check.classList[1], update: ''}))
	}

	function CalendarTime(time) {

		const CalendarTime = state.nowWeek.map((i,index)=>{
		const standard = ''+((''+i.Day).length === 1 ? '0'+i.Day : i.Day)+'.'+((''+i.Month).length === 1 ? '0'+(i.Month+1) : (i.Month+1))+'.'+Year;
		const indexLesson = state.lesson_dates.findIndex( i => i.date === standard && i.time_start.split(':')[0] === time.split(':')[0])
			if (indexLesson !== -1) {
				let type = 'planned'
				let a = state.lesson_dates[indexLesson].date.split('.');
				a[1]=a[1]-1
				let dateCheck = new Date (+a[2],a[1],a[0])
				let e = state.lesson_dates[indexLesson].time_end.split(':')
				dateCheck.setHours(+e[0], 0, 0, 0)
				if (+nowDate.getTime() > +dateCheck.getTime()) {
					type = 'past';
				}
				return <React.Fragment key={''+time+index+i.Day}>
						<div className={`Calendar-item ${""+((''+i.Day).length === 1 ? '0'+i.Day : i.Day)+'.'+((''+i.Month).length === 1 ? '0'+i.Month : i.Month)+'-'+time}`}>
							<Lesson type={type} ind={indexLesson}/>
						</div>
					</React.Fragment>
			}
			return <React.Fragment key={''+time+index+i}>
						<div className={`Calendar-item ${""+((''+i.Day).length === 1 ? '0'+i.Day : i.Day)+'.'+((''+i.Month).length === 1 ? '0'+i.Month : i.Month)+'-'+time}`}>
							<div 
							className="Calendar-item__body"
							onClick={(e)=>{setModalHandler(e)}}
							>
								<div className="ellipse">
					                <img
					                  src={require("../../img/Add-w.svg").default}
					                  alt="account"
					                  width='10'
					                /> 
								</div>
				                <span>Новый урок</span>
							</div>
						</div>
					</React.Fragment>
		})
		return <><div className="Calendar-item-time">{time}</div>{CalendarTime}</>
	}

	return (
		<>
			<div className='Calendar-wrapper'>
				<div className='Calendar'>
					{CalendarDate()}
					{TIMES.map(i=>CalendarTime(i))}
				</div>
				{state.students.length === 0 ? <><div className="Calendar-curtain">
					<img
	                  src={require("../../img/calendar.svg").default}
	                  alt="account"
	                  className='calendar'
	                /> 
					<h3>Для планирования уроков в расписании сначала добавьте учеников</h3>
					<div 
					className="button"
			        onClick={()=>{dispatch(Set_Modal({type: 'add_student', payload: '', update: ''}))}}
					>
						<div className="ellipse">
			                <img
			                  src={require("../../img/Add-b.svg").default}
			                  alt="account"
			                  width='10'
			                /> 
						</div>
		                <span>Добавить ученика</span>
					</div>
				</div></> : null}
			</div>
		</>
	)
}