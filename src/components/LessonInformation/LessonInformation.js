import React, {useState} from 'react'

import './LessonInformation.scss';


export const LessonInformation = ({showLessons})=>{
	
	const Headers = [
		'№',
		'Название упражнения',
		'Пользовался решением',
		'Брал подсказку',
		'Ошибок',
		'Неточности',
		'Потречаенное время',
		'Заработано террикоинов',
	]


	// if (typeLesson === 'all' ) {
	// 	setState(Body)
	// } else if (typeLesson === 'homework') {
	// 	setState(Body.filter(i=>i.type === 'homework'))
	// } else {
	// 	setState(Body.filter(i=>i.type === 'classAssignment'))
	// }

	return (
		<>
			<div className='LessonInformation'>

				<div className="LessonInformation-headRow">
				{
					Headers.map(i=>(
						<div key={i} className="LessonInformation-headItem LessonInformation-Item">{i}</div>
						))
				}
				</div>
				{
					showLessons.map((i,index)=>(
						<div 
						key={i.num1+i.number}
						className='LessonInformation-bodyRow'
						>
							<div className="LessonInformation-bodyItem LessonInformation-Item">{i.number}</div>
							<div className="LessonInformation-bodyItem LessonInformation-Item">
								<div className={i.type === 'homework' ? 'ellipse ellipse-blue' : i.type === 'classAssignment' ? 'ellipse ellipse-green' : 'ellipse'}></div>
								<span>Упражнение {i.number}</span>
							</div>
							<div className="LessonInformation-bodyItem LessonInformation-Item">{i.num1}</div>
							<div className="LessonInformation-bodyItem LessonInformation-Item">{i.num2}</div>
							<div className="LessonInformation-bodyItem LessonInformation-Item">19</div>
							<div className="LessonInformation-bodyItem LessonInformation-Item">33</div>
							<div className="LessonInformation-bodyItem LessonInformation-Item">100 мин</div>
							<div className="LessonInformation-bodyItem LessonInformation-Item">1000</div>
						</div>
				))}
			</div> 
		</>
	)
}