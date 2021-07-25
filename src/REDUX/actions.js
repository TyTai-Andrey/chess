
import {CALENDAR_UPDATE,WEEK_UPDATE, MODAL, ADD_STUDENT} from './types'


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

export function Add_Student (NEW_STUDENT) {
	return {type: ADD_STUDENT, payload: NEW_STUDENT}
}

export function Set_Modal (status) {
	if (status) {
		document.body.style.overflow = 'hidden';
	    document.body.style.paddingRight = '17px';	
	} else {
		document.body.style.overflow = '';
	    document.body.style.paddingRight = '';	
	}
	return {type: MODAL, payload: status}
}