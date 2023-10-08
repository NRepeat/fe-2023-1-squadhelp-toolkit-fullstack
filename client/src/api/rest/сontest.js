import http from '../interceptor';

export const updateContest = async (data) => {
	try {
		return await http.put(`contests/${data.get('contestId')}`, data);
	} catch (error) {
		throw error;
	}
};
export const changeMark = async (data) => {
	try {
		return await http.post('changeMark', data);
	} catch (error) {
		throw error;
	}
};
export const setNewOffer = async (data) => {
	try {
		return await http.post('contests/setNewOffer', data);
	} catch (error) {
		throw error;
	}
};

export const setOfferStatus = async (data) => {
	try {
		return await http.post('contests/setOfferStatus', data);
	} catch (error) {
		throw error;
	}
};

export const downloadContestFile = async (data) => {
	try {
		return await http.get(`contests/downloadFile/${data.fileName}`);
	} catch (error) {
		throw error;
	}
};
export const dataForContest = async (data) => {
	try {
		return await http.post('contests/dataForContest', data);
	} catch (error) {
		throw error;
	}
};
export const getCustomersContests = async (data) => {
	try {
		return await http.get('contests/customers', {
			params: {
				status: data.contestStatus,
				limit: data.limit,
				offset: data.offset,
			},
		});
	} catch (error) {
		throw error;
	}
};
export const getActiveContests = async ({
	offset,
	limit,
	typeIndex,
	contestId,
	industry,
	awardSort,
	ownEntries,
}) => {
	try {
		return await http.post('contests/all', {
			offset,
			limit,
			typeIndex,
			contestId,
			industry,
			awardSort,
			ownEntries,
		});
	} catch (error) {
		throw error;
	}
};

export const getContestById = async (contestId) => {
	try {
		return await http.get(`contests/${contestId}`);
	} catch (error) {
		throw error;
	}
};