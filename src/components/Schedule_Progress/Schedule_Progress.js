import React, {useState,useEffect} from 'react'
import {Calendar} from '../Calendar/Calendar';
import {MONTHS as arrMonths} from '../DATA';

import './Schedule_Progress.scss';
import {useDispatch,useSelector} from 'react-redux';
import {Calendar_Update, Week_Update} from '../../REDUX/actions';


export const Schedule_Progress = () => {

	const [type, setType] = useState('schedule')
	const [cheacker, setCheacker] = useState(true)
	const dispatch = useDispatch()
	const calendar = useSelector(state => state.main.calendar)


	let Month = calendar.getMonth()
	let Year = calendar.getFullYear()
	let Day = calendar.getDay();
	let Now = calendar.getDate();
	let DaysInMonth = new Date(Year, Month + 1, 0).getDate();
	let DaysPastMonth = new Date(Year, Month, 0).getDate();

	let arrDate = [];


	calendar.getDate() - Day === calendar.getDate() ? Day = 6 : Day -= 1
	let start = (calendar.getDate() - Day)
	
	for (var i = 6; i > -1; i--) {
				
		if (start+i <= 0) {
			arrDate.unshift({Day: DaysPastMonth + start+i, Month: Month-1})
		} else {
			if (start+i > DaysInMonth) {
				arrDate.unshift({Day: start+i-DaysInMonth, Month: Month+1})
			} else {
				arrDate.unshift({Day: start+i, Month: Month})
			}	
		}
	}

	useEffect(()=>{
		dispatch(Week_Update(arrDate))
	},[cheacker])




	function typeHandler (param) {
	  if (param === type) {return}
	  const newType = type === 'schedule' ? 'progress' : 'schedule'
	  setType(newType)
	}

	return (
		<div className='schedule_progress'>
			<div className='schedule_progress-menu'>
				<div className='schedule_progress-menu_left'>
					<div className='schedule' className={type === 'schedule' ? 'active type schedule' : 'type schedule'} 
					onClick={()=>typeHandler('schedule')}>
						<h2>Расписание</h2>
						<div className="line"></div>
					</div>
					<div className='progress' className={type === 'progress' ? 'active type progress' : 'type progress'} 
					onClick={()=>typeHandler('progress')}>
						<h2>Успеваемость</h2>
						<div className="line"></div>
					</div>
				</div>
				<div className='schedule_progress-menu_right'>
					<img
		              src={require("../../img/Arrow.svg").default}
		              alt="account"
		              onClick={()=>{dispatch(Calendar_Update(new Date(Year,Month,Now-7))); setCheacker(!cheacker)}}
		            /> 
					
					<span>{arrDate[0].Day} {arrMonths[arrDate[0].Month]} - {arrDate[6].Day} {arrMonths[arrDate[6].Month]}</span>
					
					<img
		              src={require("../../img/Arrow.svg").default}
		              alt="account"
		              onClick={()=>{dispatch(Calendar_Update(new Date(Year,Month,Now+7))); setCheacker(!cheacker)}}
		            /> 
				</div>
			</div>

			{ type === 'schedule' ? <Calendar week={arrDate} /> : type === 'progress' ? <div>Что-то</div> : null}
		</div>
	)
}