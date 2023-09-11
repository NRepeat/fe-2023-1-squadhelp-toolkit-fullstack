import {
	decorateAsyncThunk,
	rejectedReducer,
	createExtraReducers,
} from '../../utils/store';
import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';
import * as restController from '../../api/rest/restController';


const initialState = {
	isFetching: true,
	offers: [],
	addOfferError: null,
	setOfferStatusError: null,
};

const OFFERS_SLICE_NAME = 'getOffers';


export const getOffers = decorateAsyncThunk({
	key: `${OFFERS_SLICE_NAME}`,
	thunk: async payload => {
		const { data } = await restController.getModerator(payload);

		return {  data };
	},
});

const getOffersReducers = createExtraReducers({
	thunk: getOffers,
	pendingReducer: state => {
		state.isFetching = true;
		state.error = null;
		state.offers = [];
	},
	fulfilledReducer: (state, { payload: {  offers } }) => {
		state.isFetching = false;
		state.error = null;
		state.offers = offers;
	},
	rejectedReducer,
});
export const changeOferrStatus = decorateAsyncThunk({
	key: `${OFFERS_SLICE_NAME}/changeOferrStatus`,
	thunk: async payload => {
		console.log("🚀 ~ file: offerSlice.js:47 ~ payload:", payload)
		const { data } = await restController.changeVarifiedOfeertStatus(payload);
		console.log("🚀 ~ file: offerSlice.js:48 ~ data:", data)
		return data;
	},
})
export const setOfferStatus = decorateAsyncThunk({
	key: `${OFFERS_SLICE_NAME}/setOfferStatus`,
	thunk: async payload => {
		console.log("🚀 ~ file: offerSlice.js:56 ~ payload:", payload)
		const { data } = await restController.setOfferStatus(payload);
		return data;
	},
});

const setOfferStatusExtraReducers = createExtraReducers({
	thunk: setOfferStatus,
	fulfilledReducer: (state, { payload }) => {
		state.offers.forEach(offer => {
			if (payload.status === CONSTANTS.OFFER_STATUS_WON) {
				offer.status =
					payload.id === offer.id
						? CONSTANTS.OFFER_STATUS_WON
						: CONSTANTS.OFFER_STATUS_REJECTED;
			} else if (payload.id === offer.id) {
				offer.status = CONSTANTS.OFFER_STATUS_REJECTED;
			}
		});
		state.error = null;
	},
	rejectedReducer: (state, { payload }) => {
		state.setOfferStatusError = payload;
	},
});
const reducers = {
	updateStoreAfterUpdateContest: (state, { payload }) => {
		state.error = null;
		state.isEditContest = false;
		state.contestData = { ...state.contestData, ...payload };
	},
	clearAddOfferError: state => {
		state.addOfferError = null;
	},
	clearSetOfferStatusError: state => {
		state.setOfferStatusError = null;
	},
};

const extraReducers = builder => {
	getOffersReducers(builder);
	setOfferStatusExtraReducers(builder);
};
const contestByIdSlice = createSlice({
	name: OFFERS_SLICE_NAME,
	initialState,
	reducers,
	extraReducers,
});

const { actions, reducer } = contestByIdSlice;

export const {
	updateStoreAfterUpdateContest,
	clearAddOfferError,
	clearSetOfferStatusError,
} = actions;

export default reducer;