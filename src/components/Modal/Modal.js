import React, {useState} from 'react'
import './Modal.scss';
import {useDispatch,useSelector} from 'react-redux';
import {Set_Modal, Add_Student} from '../../REDUX/actions';
import {MONTHS, TIMES} from '../DATA';


export const Modal = ({type})=> {
	const dispatch = useDispatch()
	const main = useSelector(state => state.main)
	const [state, setState] = useState(
		{
			name: '',
			email: '',
			lesson_day: main.nowWeek[0].Day,
			lesson_month: main.nowWeek[0].Month,
		}
	);

	console.log(state)

	let header='что-то не так';
	let footer='что-то не так';
	let modal;


	function checker() {
		if (state.name.trim().length !== 0 && state.email.trim().length !== 0) {
			dispatch(Set_Modal('add_success'))
			dispatch(Add_Student(state.name.trim()))
		}
	}

	switch(type) {
		case 'new_lesson':
			header='Новый урок'
			footer=<>
				<div
				className="Modal-button"
				onClick={()=>{checker()}}
				>Новый урок</div>
			</>
			modal=<>
				<div className="selection">
		            <p>Время урока</p>
		            <select name="" id="">
		            	{main.nowWeek.map(i=><option value={''+i.Day+i.Month}>{''+i.Day+' '+MONTHS[i.Month]}</option>)}
		            </select>
		            в
		            <select name="" id="">
		            	{TIMES.map(i=><option key={i} value={i}>{i}</option>)}
		            </select>
		            :
		            <select name="" id="">
		            	{['00','30'].map(i=><option key={i} value={i}>{i}</option>)}
		            </select>
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
			break;
		case 'add_student':
			header='Выберите, кого добавить в ученики'
			footer=<>
				<div
				className="Modal-button"
				onClick={()=>{checker()}}
				>Добавить ученика</div>
			</>
			modal=<>
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
			break;
		case 'add_success':
			header='Приглашение отправлено'
			footer=<>
				<div
				className="Modal-button"
				onClick={()=>{dispatch(Set_Modal(false))}}
				>Перейти к уроку</div>
			</>
			modal=<>
				<img
				  className='smail'
	              src={require("../../img/smail.svg").default}
	              alt="account"
	              width='50'
	            />
	            <p>Ученику направлено письмо на электронную почту с данными для входа (регистрации).</p>
            </>
			break;
		default:
			return 
	}

	return (
		<>
			<div className="Modal-curtain"
			onClick={()=>{dispatch(Set_Modal(false))}}
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
					onClick={()=>{dispatch(Set_Modal(false))}}
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