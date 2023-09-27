import http from '../interceptor';
export const registerRequest = async (data) => {
	try {
		return await http.post('/registration', data);
	} catch (error) {
		throw error;
	}
};

export const loginRequest = async (data) => {
	try {
		return await http.post('/login', data);
	} catch (error) {
		throw error;
	}
};

export const getUser = async () => {
	try {
		return await http.get('/getUser');
	} catch (error) {
		throw error;
	}
};

export const updateContest = async (data) => {
	try {
		return await http.put(`contests/${data.get('contestId')}`, data);
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
export const payMent = async (data) => {
	try {
		return await http.post('pay', data.formData);
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

export const getPreviewChat = async () => {
	try {
		return await http.get('chat/getPreview');
	} catch (error) {
		throw error;
	}
};

export const getDialog = async (data) => {
	try {
		 const a = await http.post('chat/getChat', data);
		 return a 
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

export const cashOut = async (data) => {
	try {
		return await http.post('cashout', data);
	} catch (error) {
		throw error;
	}
};

export const updateUser = async (data) => {
	try {
		return await http.post('updateUser', data);
	} catch (error) {
		throw error;
	}
};

export const newMessage = async (data) => {
	try {

		return await http.post('chat/newMessage', data);
	} catch (error) {
		throw error;
	}
};

export const changeChatFavorite = async (data) => {
	try {
		return await http.post('chat/favorite', data);
	} catch (error) {
		throw error;
	}
};

export const changeChatBlock = async (data) => {
	try {
		return await http.post('chat/blackList', data);
	} catch (error) {
		throw error;
	}
};

export const getCatalogList = async (data) => {
	try {
		return await http.post('chat/getCatalogs', data);
	} catch (error) {
		throw error;
	}
};

export const addChatToCatalog = async (data) => {
	try {
		return await http.post('chat/addNewChatToCatalog', data);
	} catch (error) {
		throw error;
	}
};

export const createCatalog = async (data) => {
	try {

		return await http.post('chat/createCatalog', data);
	} catch (error) {
		throw error;
	}
};

export const deleteCatalog = async (data) => {
	try {
		return await http.post('chat/deleteCatalog', data);
	} catch (error) {
		throw error;
	}
};

export const removeChatFromCatalog = async (data) => {
	try {
		return await http.post('chat/removeChatFromCatalog', data);
	} catch (error) {
		throw error;
	}
};

export const changeCatalogName = async (data) => {
	try {
		return await http.post('chat/updateNameCatalog', data);
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
				offset: data.offset
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


export const getModerator = async (offerId) => {

	try {
		return await http.get(`/moderator/allOffers`)
	} catch (error) {
		throw (error)
	}
}
export const changeVarifiedOfeertStatus = async (data) => {
	try {
		return await http.put('moderator/updateOfferStatus', data);
	} catch (error) {
		throw error;
	}
}