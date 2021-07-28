import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Set_Modal} from '../../REDUX/actions';

import './ListLessons.scss';
import {LessonInformation} from '../LessonInformation/LessonInformation';


export const ListLessons = ({numderLessonHandler, numderLesson,showLessons})=>{
	

	const main = useSelector(state=>state.main)

	const Headers = [
		'№',
		'Название урока',
		'Упражнений в уроке',
		'Упражнений выполнено',
		'Ошибок',
		'Неточности',
		'Потречаенное время',
		'Заработано террикоинов',
	]

	const Body = [
		{num1: 100, num2: 90},
		{num1: 30, num2: 25},
		{num1: 70, num2: 70},
		{num1: 20, num2: 10},
		{num1: 33, num2: 27},
		{num1: 23, num2: 19},
		{num1: 55, num2: 50},
		{num1: 88, num2: 70},
	]


	return (
		<>
			{main.students.length !==0 ?
			<>
				{numderLesson===0 ? 
				<div className='ListLessons'>

					<div className="ListLessons-headRow">
					{
						Headers.map(i=>(
							<div key={i} className="ListLessons-headItem ListLessons-Item">{i}</div>
							))
					}
					</div>
					{
						Body.map((i,index)=>(
							<div 
							key={i.num1+index}
							className='ListLessons-bodyRow'
							onClick={()=>{numderLessonHandler(index+1)}}
							>
								<div className="ListLessons-bodyItem ListLessons-Item">{index+1}</div>
								<div className="ListLessons-bodyItem ListLessons-Item">Урок {index+1}</div>
								<div className="ListLessons-bodyItem ListLessons-Item">{i.num1}</div>
								<div className="ListLessons-bodyItem ListLessons-Item">{i.num2}</div>
								<div className="ListLessons-bodyItem ListLessons-Item">19</div>
								<div className="ListLessons-bodyItem ListLessons-Item">33</div>
								<div className="ListLessons-bodyItem ListLessons-Item">100 мин</div>
								<div className="ListLessons-bodyItem ListLessons-Item">1000</div>
							</div>
					))}
				</div> 
				: <LessonInformation showLessons={showLessons}/> }
			</> : null }
		</>
	)
}