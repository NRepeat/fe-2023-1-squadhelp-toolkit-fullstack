import React, { useEffect, useState } from 'react';
import { getOffers } from '../../store/slices/offerSlice';
import { useDispatch, useSelector } from 'react-redux';
import constants from '../../constants';

export default function ModeratorPage(props) {
  const [offerData, setOfferData] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offers = await dispatch(getOffers());

        setOfferData(offers.payload.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div>
      {offerData ? (
        <div>
          <h1>Contest Data</h1>
          {offerData.map((offer, i) => (
            <div key={i}>
              <p>Contest ID: {offer.id}</p>
              <p>Contest Type: {offer.contestType}</p>
              <p>Industry: {offer.industry}</p>
              <p>Status: {offer.status}</p>
              <p>Prize: {offer.prize}</p>
              <div>
                Offer
                {offer.Offers.map((o,i) => (
                  <div key={i} >
                    <p>Offer ID: {o.id}</p>
                    <p>Offer message: {o.text}</p>
                    <p>Status: {o.status}</p>
                    <p>User Display Name: {o.User.displayName}</p>
                    <p>User Email: {o.User.email}</p>
                    <p>User First Name: {o.User.firstName}</p>
                    <p>User Last Name: {o.User.lastName}</p>
                    <p>User Rating: {o.User.rating}</p>
                  </div>
                ))}
              </div>
            
            </div>
          ))}
        </div>
      ) : (
        <div>Loading Offers Data...</div>
      )}
    </div>
  );
}
