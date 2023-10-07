export const getModerator = async (offerId) => {
  try {
    return await http.get(`/moderator/allOffers`);
  } catch (error) {
    throw error;
  }
};

export const changeVarifiedOfeertStatus = async (data) => {
  try {
    return await http.put('moderator/updateOfferStatus', data);
  } catch (error) {
    throw error;
  }
};