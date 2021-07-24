import {combineReducers} from 'redux'

import {TYPE} from './types'


// Данные для select`ов
const initialState = {
	
}

function mainReducer (state = initialState, action) {
	switch (action.type) {
		case TYPE:
			return state;
		default:
			return state;
	}
}




export const rootReducer = combineReducers ({
	main: mainReducer,
})