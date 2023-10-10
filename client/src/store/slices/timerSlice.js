import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	events: []
}
const timerSlice = createSlice({

	name: 'timers',
	initialState,
	reducers: {
		addEvent: (state, action) => {
			state.events.push(action.payload);
		},
		updateEvent: (state, action) => {
		},
		deleteEvent: (state, action) => {
			const eventId = action.payload; 
      state.events = state.events.filter(event => event.id !== eventId);
		},
	},
})
export const { addEvent, updateEvent, deleteEvent } = timerSlice.actions;
const { reducer: timerReducer } = timerSlice
export default timerReducer;