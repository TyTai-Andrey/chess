import {combineReducers} from 'redux'

import {CALENDAR_UPDATE,WEEK_UPDATE, MODAL, ADD_STUDENT} from './types'
import {LESSON} from '../components/DATA'

// Данные для select`ов
const initialState = {
	calendar: new Date(),
	nowWeek: [],
	lesson_dates: LESSON,
	students: [
		{student_name: 'Andrey'},
	],
	modal: false,
}

function mainReducer (state = initialState, action) {
	switch (action.type) {
		case CALENDAR_UPDATE:
			return {...state, calendar: action.payload};
		case WEEK_UPDATE:
			return {...state, nowWeek: action.payload};
		case MODAL:
			return {...state, modal: action.payload};
		case ADD_STUDENT:
			return {...state, students: [...state.students, {student_name: action.payload}]};
		default:
			return state;
	}
}




export const rootReducer = combineReducers ({
	main: mainReducer,
})