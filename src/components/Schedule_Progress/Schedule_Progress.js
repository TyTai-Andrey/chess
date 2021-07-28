import React, {useState,useEffect} from 'react'
import {Calendar} from '../Calendar/Calendar';
import {MONTHS as arrMonths} from '../DATA';

import './Schedule_Progress.scss';
import {useDispatch,useSelector} from 'react-redux';
import {Calendar_Update, Week_Update} from '../../REDUX/actions';
import {ListLessons} from '../ListLessons/ListLessons';

export const Schedule_Progress = ({studentsState}) => {


	const Body = [
		{number: '1',type: 'homework',num1: 'да', num2: 'нет'},
		{number: '2',type: '',num1: 'да', num2: 'нет'},
		{number: '3',type: 'classAssignment',num1: 'да', num2: 'нет'},
		{number: '4',type: 'homework',num1: 'нет', num2: 'нет'},
		{number: '5',type: 'classAssignment',num1: 'нет', num2: 'да'},
		{number: '6',type: 'classAssignment',num1: 'да', num2: 19},
		{number: '7',type: '',num1: 'нет', num2: 'да'},
		{number: '8',type: '',num1: 'нет', num2: 'да'},
	]

	const calendar = useSelector(state => state.main.calendar)
	const main = useSelector(state => state.main)
	const [type, setType] = useState('schedule')
	const [cheacker, setCheacker] = useState(true)
	const [numderLesson, setNumderLesson] = useState(0)
	const [students, setStudents] = useState(studentsState)
	const [typeLesson, setTypeLesson] = useState([
		{title: 'Все упражнения', type: 'all'},
		{title: 'Домашние упражнения', type: 'homework'},
		{title: 'Классные упражнения', type: 'classAssignment'},
		])
	const [selectState, setSelectState] = useState({
		select_students: false,
		select_type: false,
	})
	const dispatch = useDispatch()

	const [showLessons, setShowLessons] = useState(Body)



	let Month = calendar.getMonth()
	let Year = calendar.getFullYear()
	let Day = calendar.getDay();
	let Now = calendar.getDate();
	let DaysInMonth = new Date(Year, Month + 1, 0).getDate();
	let DaysPastMonth = new Date(Year, Month, 0).getDate();

	let arrDate = [];

	function numderLessonHandler (num) {
		setNumderLesson(num)
	}

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


	function studentsHandler (name) {
		let  otherStudents = students.filter(i=>i.student_name !== name)
		let firstStudent = students.find(i=>i.student_name === name)
		setStudents([firstStudent,...otherStudents])
		setSelectState({...selectState, select_students: !selectState.select_students})
	}

	function typeSelectHandler (type) {
		let  otherTypes = typeLesson.filter(i=>i.type !== type)
		let firstType = typeLesson.find(i=>i.type === type)

		type === 'all' ? setShowLessons(Body) : setShowLessons(Body.filter(i=>i.type === type))
		setTypeLesson([firstType,...otherTypes])
		setSelectState({...selectState, select_type: !selectState.select_type})
	}

	function typeHandler (param) {
	  if (param === type) {return}
	  const newType = type === 'schedule' ? 'progress' : 'schedule'
	  setType(newType)
	  setStudents(main.students)
	}

	return (
		<div className='schedule_progress'>
			<div className='schedule_progress-menu'>
				<div className='schedule_progress-menu_left'>
					<div className='schedule' className={type === 'schedule' ? 'active type schedule' : 'type schedule'} 
					onClick={()=>{typeHandler('schedule');numderLessonHandler(0)}}>
						<h2>Расписание</h2>
						<div className="line"></div>
					</div>
					<div className='progress' className={type === 'progress' ? 'active type progress' : 'type progress'} 
					onClick={()=>{typeHandler('progress');numderLessonHandler(0)}}>
						<h2>Успеваемость</h2>
						<div className="line"></div>
					</div>
					{
						numderLesson === 0 ? null : <>
							<div className="arrow">
								<img
					              src={require("../../img/Arrow-p.svg").default}
					              alt="account"
					              onClick={()=>{dispatch(Calendar_Update(new Date(Year,Month,Now-7))); setCheacker(!cheacker)}}
					            /> 
							</div>
							<div className="numderLesson"><h2>Урок {numderLesson}</h2> </div>
						</>
					}
				</div>
				{ type === 'schedule' ? 
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
				</div> : type === 'progress' && main.students.length !==0 ? <>
					
				{numderLesson !== 0 ? <>
					<div 
					className={selectState.select_type ? "select-body active" : "select-body"}
					>
	            		<div className="select-list">
		            		{
		            			typeLesson.map((i,index)=>(

		            				<div
		            				key={i.student_name+''+index}				
		            				className="select-item"
		            				onClick={()=>{typeSelectHandler(i.type)}}
		            				>
				            			<div className={i.type + " ellipse"}></div>
						                {i.title}
			            			</div>

		            			))
		            		}
	            		</div>
	            		<div 
	            		className="arrow"
	            		onClick={(e)=>setSelectState({...selectState, select_type: !selectState.select_type})}
	            		>
	            			<img
			                  src={require("../../img/Arrow-g.svg").default}
			                  alt="account"
			                />
	            		</div> 
	            	</div>
	            	</> : null }
					<div 
					className={selectState.select_students ? "select-body active" : "select-body"}
					>
	            		<div className="select-list">
		            		{
		            			students.map((i,index)=>(

		            				<div
		            				key={i.student_name+''+index}				
		            				className="select-item"
		            				onClick={()=>{studentsHandler(i.student_name)}}
		            				>
				            			<img
						                  src={require("../../img/avatar_2.svg").default}
						                  alt="account"
						                  width='30'
						                  height='30'
						                  className='avatar'
						                />
						                {i.student_name}
			            			</div>

		            			))
		            		}
	            		</div>
	            		<div 
	            		className="arrow"
	            		name='select_students'
	            		onClick={(e)=>setSelectState({...selectState, select_students: !selectState.select_students})}
	            		>
	            			<img
			                  src={require("../../img/Arrow-g.svg").default}
			                  alt="account"
			                />
	            		</div> 
	            	</div>

	            	<div className="filter">
	            	<img
	                  src={require("../../img/filter.svg").default}
	                  alt="account"
	                  className='filter-icon'
	                />
	            	Фильтр
	            	</div>



				</> : null}
			</div>

			{ type === 'schedule' ? <Calendar week={arrDate} /> : type === 'progress' ? <ListLessons showLessons={showLessons} numderLesson={numderLesson} numderLessonHandler={numderLessonHandler} /> : null}
		</div>
	)
}