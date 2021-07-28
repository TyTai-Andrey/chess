import {combineReducers} from 'redux'

import {CALENDAR_UPDATE,WEEK_UPDATE, MODAL, ADD_STUDENT,LESSON_ADD,UPDATE_STUDENTS, LESSON_DELETE} from './types'
import {LESSON} from '../components/DATA'


const initialState = {
	calendar: new Date(),
	nowWeek: [],
	lesson_dates: [],
	students: [],
	modal: {type: false, payload: '', update: ''},
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
			return {...state, students: state.students.concat(action.payload)};
		case UPDATE_STUDENTS:
			return {...state, students: action.payload};
		case LESSON_ADD:
			return {...state, lesson_dates: state.lesson_dates.concat(action.payload)};
		case LESSON_DELETE:
			return {...state, lesson_dates: action.payload};
		default:
			return state;
	}
}




export const rootReducer = combineReducers ({
	main: mainReducer,
})