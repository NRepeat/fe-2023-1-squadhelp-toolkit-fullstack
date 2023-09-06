import React, { useEffect, useState } from 'react';
import { getOffers } from '../../store/slices/offerSlice';
import { useDispatch } from 'react-redux';
export default function ModeratorPage() {
  const [data, setData] = useState(null);
  const [offerData, setOfferData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
  

    const fetchOffers = async () => {
      try {
        const offers = await dispatch(getOffers()); 
        console.log("🚀 ~ file: ModeratorPage.jsx:15 ~ fetchOffers ~ offers:", offers)
        setOfferData(offers.payload.data); 
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1>Moderator Data</h1>
          <pre>{JSON.stringify(data.data, null, 2)}</pre>
        </div>
      ) : (
        <div>Loading Moderator Data...</div>
      )}

      {offerData ? (
        <div>
          <h1>Offers Data</h1>
          <pre>{JSON.stringify(offerData, null, 2)}</pre>
        </div>
      ) : (
        <div>Loading Offers Data...</div>
      )}
    </div>
  );
}
