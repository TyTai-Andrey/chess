
import {CALENDAR_UPDATE,WEEK_UPDATE, MODAL, ADD_STUDENT,LESSON_ADD, UPDATE_STUDENTS, LESSON_DATA_UPDATE, LESSON_DELETE} from './types'


// Запросить города
// export function fetchAreas () {
// 	return async dispatch => {
// 		const response = await fetch('https://api.repetit.ru/public/areas')
// 		const json = await response.json()
// 		dispatch({type: TYPE, payload: json})
// 	}
// }

export function Calendar_Update (NEW_DATE) {
	return {type: CALENDAR_UPDATE, payload: NEW_DATE}
}

export function Week_Update (NEW_WEEK) {
	return {type: WEEK_UPDATE, payload: NEW_WEEK}
}

export function Students_Update (STUDENTS) {
	return {type: UPDATE_STUDENTS, payload: STUDENTS}
}

export function Add_Student (NEW_STUDENT) {
	return {type: ADD_STUDENT, payload: NEW_STUDENT}
}

export function Lesson_Add (NEW_LESSON) {
	return {type: LESSON_ADD, payload: NEW_LESSON}
}

export function Lesson_Delete (LESSONS) {
	return {type: LESSON_DELETE, payload: LESSONS}
}

export function Set_Modal (status) {
	if (status.type) {
		document.getElementById('main').style.overflowY = 'hidden';
	    document.body.style.marginRight = '17px';	
	} else {
		document.getElementById('main').style.overflowY = 'scroll';
	    document.body.style.marginRight = '';	
	}
	return {type: MODAL, payload: status}
}


