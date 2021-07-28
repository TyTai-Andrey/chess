import React, {useState} from 'react'
import './Modal.scss';
import {useDispatch,useSelector} from 'react-redux';
import {Set_Modal, Add_Student,Lesson_Add,Lesson_Delete} from '../../REDUX/actions';
import {MONTHS, TIMES} from '../DATA';


export const Modal = ({type})=> {
	const dispatch = useDispatch()
	const main = useSelector(state => state.main)
	const [state, setState] = useState(
		{
			name: '',
			email: '',
			lesson_date: main.modal.payload.length === 0 ? '' : main.modal.payload.split('-')[0],
			lesson_time_hour: main.modal.payload.length === 0 ? '' : main.modal.payload.split('-')[1].split(':')[0],
			lesson_time_minutes: main.modal.payload.length === 0 ? '' : main.modal.payload.split('-')[1].split(':')[1],
			lesson_student: '',
			timeLesson: '',
			lesson_type: main.modal.update.status ?? '',

			select: false,
			statusSelect: main.modal.update.status,
		}
	);
	const [typeNewLesson, setTypeNewLesson] = useState('Students')

	let header='что-то не так';
	let footer='что-то не так';
	let modal='что-то не так';

	let arrayStatusSelect = 
	[
		{text: 'Неявка ученика', ellipse: 'red', type: 'past'},
		{text: 'Урок успешно проведен', ellipse: 'green', type: 'ok'},
		{text: 'Урок запланирован', ellipse: 'blue', type: 'planned'},
	]

	function checker() {
		if (state.name.trim().length !== 0 && state.email.trim().length !== 0) {
			dispatch(Set_Modal({type: 'add_success', payload: '', update: ''}))
			dispatch(Add_Student({student_name: state.name.trim()}))
		}
	}

	function newLesson() {
		if (state.lesson_date.length !== 0 && state.lesson_time_hour.length !== 0 && state.lesson_time_minutes.length !== 0 && state.lesson_student.length !== 0) {
			

			const hours_end = +state.lesson_time_hour + (( +state.lesson_time_minutes+ +state.timeLesson)%60 === 0 ? 
						( +state.lesson_time_minutes+ +state.timeLesson)/60 : 
						(+state.lesson_time_minutes+ +state.timeLesson - ( +state.lesson_time_minutes+ +state.timeLesson)%60)/60);

			const minutes_end = +state.lesson_time_minutes + (( +state.lesson_time_minutes+ +state.timeLesson)%60) 


			dispatch(Lesson_Add({
				date: state.lesson_date.split('.')[0]+'.'+((''+(++state.lesson_date.split('.')[1])).length === 1 ? '0'+(++state.lesson_date.split('.')[1]) : ''+(++state.lesson_date.split('.')[1]))+'.'+main.calendar.getFullYear(),
				student_name: state.lesson_student,
				time_start: state.lesson_time_hour+':'+state.lesson_time_minutes,
				time_end: hours_end+':'+((''+minutes_end).length === 1 ? '0'+minutes_end : ''+minutes_end),
				status: state.statusSelect === undefined ? '' : state.statusSelect
			}))



			dispatch(Set_Modal({type: false, payload: '', update: ''}))

			// date: '20.07',
			// student_name: 'Андрей',
			// time_start: '9:00',
			// time_end: '10:00',
			// status: false
		}
	}

	function select_lesson_date () {
		return (
			<select 
				disabled={main.modal.update !== ''}
	            name="lesson_date"  
            	onChange={(e)=>{setState({...state, [e.target.name]: e.target.value})}}
            >
            	{main.nowWeek.map(i=><option 
            		key={i.Day}
            		value={''+((''+i.Day).length === 1 ? '0'+i.Day : i.Day)+'.'+((''+i.Month).length === 1 ? '0'+i.Month : i.Month)}
            		selected={+i.Day === +main.modal.payload.split('.')[0]}
            		>{''+i.Day+' '+MONTHS[i.Month]}</option>)}
            </select>
		)
	}

	function select_lesson_time_hour () {
		return (
			<select 
				disabled={main.modal.update !== ''}
	            name="lesson_time_hour" 
    			onChange={(e)=>{setState({...state, [e.target.name]: e.target.value})}}
            >
            	{TIMES.map(i=><option 
            		key={i} 
            		value={i.split(':')[0]}
            		selected={+i.split(':')[0] === +main.modal.payload.split('-')[1].split(':')[0]}
            		>{i.split(':')[0]}</option>)}
            </select>
		)
	}

	function select_lesson_time_minutes () {
		return (
			<>
				{ main.modal.update !== '' ? 
			 			<select 
			 				disabled
			 	            name="lesson_time_minutes" 
			     			onChange={(e)=>{setState({...state, [e.target.name]: e.target.value})}}
			             >
			             	{['00','15','30','45'].map(i=><option 
			             		selected={(main.modal.update.time_start).split(':')[1] === i}
			             		key={i} 
			             		value={i}
			             		>{i}</option>)}
			             </select> : 
			             <select 
			 	            name="lesson_time_minutes" 
			     			onChange={(e)=>{setState({...state, [e.target.name]: e.target.value})}}
			             >
			             	{['00','15','30','45'].map(i=><option 
			             		key={i} 
			             		value={i}
			             		>{i}</option>)}
			             </select>} 
			</>
		)
	}


	function student_list(array) {
		return (
			<>
				<div className="students">
            		{array.map(i=>(
            			<div 
            			className={state.lesson_student === i.student_name? "student active" : "student"} 
            			key={i.student_name}
            			onClick={()=>{state.lesson_student === i.student_name ? setState({...state, lesson_student: i.student_name}) : setState({...state, lesson_student: i.student_name, timeLesson: '60'})}}
            			>
	            			<div className="student-data">
	            				<div className="student-avatar">
		            				<img
									  className='search-icon-img'
						              src={require("../../img/avatar_2.svg").default}
						              alt="account"
						              width='39'
						              height='39'
						            />
		            			</div>
		            			<div className="student-name">{i.student_name}</div>
	            			</div>
	            			{state.lesson_student === i.student_name || array[0].time_end ?
	            				<div className="student-timeLesson">
		            				<select 
		            					disabled={array[0].time_end}
							            name="timeLesson" 
				            			onChange={(e)=>{setState({...state, [e.target.name]: e.target.value})}}
						            >
						            	{array[0].time_end ? 
						            		[ '' +(array[0].time_end.split(':')[1])-(array[0].time_start.split(':')[1])+(array[0].time_end.split(':')[0] * 60)-(array[0].time_start.split(':')[0] * 60)].map(i=><option 
						            		key={i} 
						            		value={i}
						            		>{i} мин</option>) 
						            		: ['60','75','90','105', '120'].map(i=><option 
						            		key={i} 
						            		value={i}
						            		>{i} мин</option>)}
						            </select>
		            			</div> : null}
	            		</div>
	            		)
            		)}
            	</div>
			</>
		)
	}

	function new_lesson () {
		return (
			<>
				<div className="selection">
		            <p>Время урока</p>
		            <div className="selection-group">
		            	{select_lesson_date()}
			            в
			            {select_lesson_time_hour()}
			            :
			            {select_lesson_time_minutes()}
		            </div>
		            
				</div>
				<div className="choose">
					<div className="choose-menu">
						<div 
						className={typeNewLesson === 'Students' ? 'active set-student' : 'set-student'}
						onClick={()=>setTypeNewLesson('Students')}
						>
							<p>Ученики</p>
							<div className="line"></div>
						</div>
						<div 
						className={typeNewLesson === 'Groups' ? 'active set-group' : 'set-group'}
						onClick={()=>setTypeNewLesson('Groups')}
						>
							<p>Группы</p>
							<div className="line"></div>
						</div>
					</div>
		            {typeNewLesson === 'Students'? 
		            <div className="choose-student">
		            	<div className="search">
		            		<label className='search-label' htmlFor="search">
		            			<div className="search-icon">
		            				<img
									  className='search-icon-img'
						              src={require("../../img/search.svg").default}
						              alt="account"
						            />
		            			</div>
		            		</label>
		            		<input name='search' id='search' type="text" placeholder='Найти ученика ...' />
		            	</div>
		            	{student_list(main.students)}
		            </div> : 
		            <div className="choose-group">Что-то есть</div>}
				</div>
            </>
		)
	}

	function add_student () {
		return (
			<>
				<div className="registration">
		            <p>Назовите ученика</p>
					<input 
					value={state.name} 
					name='name' 
					type="text" 
					placeholder='Имя ученика в вашем кабинете'
					onChange={(e)=>{setState({...state, [e.target.name]: e.target.value})}}
					/>
				</div>
				<div className="registration">
		            <p>Впишите email</p>
					<input 
					value={state.email} 
					name='email' 
					type="text" 
					placeholder='Email или имя пользователя ...'
					onChange={(e)=>{setState({...state, [e.target.name]: e.target.value})}}
					/>
				</div>
            </>
		)
	}

	function add_success () {
		return (
			<>
				<img
				  className='smail'
	              src={require("../../img/smail.svg").default}
	              alt="account"
	              width='50'
	            />
	            <p>Ученику направлено письмо на электронную почту с данными для входа (регистрации).</p>
            </>
		)
	}

	function checkerType (type) {
		if (state.select) {
			if (type !== 'ok' && state.statusSelect === true) {
				setState({...state, statusSelect: false})
			}
			if (type === 'ok') {
				setState({...state, statusSelect: true})
			}
		}

	}

	function deleteLesson () {

		let lessons = JSON.parse(JSON.stringify(main.lesson_dates))

		lessons = lessons.filter(i=>{
			return (
					(i.date !== main.modal.update.date) 
					|| (i.student_name !== main.modal.update.student_name) 
					|| (i.time_start !== main.modal.update.time_start) 
					|| (i.time_end !== main.modal.update.time_end)
					)
		})

		dispatch(Lesson_Delete(lessons))
		dispatch(Set_Modal({type: false, payload: '', update: ''}))
	}

	function update_lesson () {


		let type = 'planned'
		let a = main.modal.update.date.split('.');
		a[1]=a[1]-1
		let dateCheck = new Date (+a[2],a[1],a[0])
		let s = main.modal.update.time_start.split(':')
		dateCheck.setHours(+s[0], 0, 0, 0)
		if (+(new Date().getTime()) > +dateCheck.getTime()) {
			type = 'past';
		}

		return (
			<>
				<div className="selection">
		            <p>Время урока</p>
		            <div className="selection-group">
			            {select_lesson_date()}
			            в
			            {select_lesson_time_hour()}
			            :
			            {select_lesson_time_minutes()}
			        </div>
				</div>
				<div 
				className={state.select ? "select-body active" : "select-body"}
				>
            		<div className="select-list">
            			{ type === 'past' ?
            				arrayStatusSelect.slice(0,2).map(i=>(
	            				<div
	            				key={i.text}
	            				style={i.type === 'ok' && state.statusSelect === true ? {order: -1} : null} 
	            				onClick={()=>{checkerType(i.type)}}						
	            				className="select-item"
	            				>
			            			<div className={"ellipse " + i.ellipse}></div>
			            			{i.text}
		            			</div>
	            			)) :
	            			arrayStatusSelect.slice(2,3).map(i=>(
	            				<div
	            				key={i.text} 
	            				className="select-item">
			            			<div className={"ellipse " + i.ellipse}></div>
			            			{i.text}
		            			</div>
	            			))
	            		}
            		</div>
            		{ type === 'past' ? 
            		<div 
            		className="arrow"
					onClick={()=>{setState({...state, select: !state.select})}}
            		>
            			<img
		                  src={require("../../img/Arrow-g.svg").default}
		                  alt="account"
		                />
            		</div> 
            		: null}
            	</div>
	            {student_list([main.modal.update])}
			</>
		)
	}

	switch(type) {
		case 'new_lesson':
			header='Новый урок'
			footer=<>
				<div
				className="Modal-button"
				onClick={()=>{newLesson()}}
				>Новый урок</div>
			</>
			modal= new_lesson()
			break;
		case 'add_student':
			header='Выберите, кого добавить в ученики'
			footer=<>
				<div
				className="Modal-button"
				onClick={()=>{checker()}}
				>Добавить ученика</div>
			</>
			modal=add_student()
			break;
		case 'add_success':
			header='Приглашение отправлено'
			footer=<>
				<div
				className="Modal-button"
				onClick={()=>{dispatch(Set_Modal({type: false, payload: '', update: ''}))}}
				>Перейти к уроку</div>
			</>
			modal= add_success()
			break;
		case 'update_lesson':
			header='Урок'
			footer=<>
					<div className="Modal-buttons">
						<div
						className="Modal-button delete small"
						onClick={()=>{deleteLesson()}}
						>Удалить урок</div>
						<div
						className="Modal-button small"
						onClick={()=>{
							deleteLesson ()
							dispatch(Lesson_Add({
								date: main.modal.update.date,
								student_name: main.modal.update.student_name,
								time_start: main.modal.update.time_start,
								time_end: main.modal.update.time_end,
								status: state.statusSelect === undefined ? '' : state.statusSelect
							}))
							dispatch(Set_Modal({type: false, payload: '', update: ''}))
						}}
						>Применить</div>
					</div>
				</>
			modal= update_lesson()
			break;
		default:
			return 
	}

	return (
		<>
			<div className="Modal-curtain"
			onClick={()=>{dispatch(Set_Modal({type: false, payload: '', update: ''}))}}
			>
				<div
				className="Modal"
				onClick={(e)=>{e.stopPropagation()}}
				>
					<div className="Modal-header">{header}</div>
					<div className="Modal-body">
						{modal}
					</div>
					<div className="Modal-footer">
						{footer}
					</div>
					<div
					className="close"
					onClick={()=>{dispatch(Set_Modal({type: false, payload: '', update: ''}))}}
					>
						<img
		                  src={require("../../img/close.svg").default}
		                  alt="account"
		                /> 
					</div>
				</div>
			</div>
		</>
	)
}