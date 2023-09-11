import React, { useEffect, useState } from 'react';
import { changeOferrStatus, getOffers } from '../../store/slices/offerSlice';
import { useDispatch, useSelector } from 'react-redux';
import constants from '../../constants';

export default function ModeratorPage(props) {
  const [offerData, setOfferData] = useState(null);
  const [activeTab, setActiveTab] = useState('tab1'); // Используйте состояние для отслеживания активной вкладки

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await dispatch(getOffers());
        const offers = response.payload.data;

        setOfferData(offers);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);
  function handleVerifi(id) {
    const status = 'verified';
    dispatch(changeOferrStatus({ id, status }));
  }
  function handleReject(id) {
    const status = 'rejected';
    dispatch(changeOferrStatus({ id, status }));
  }
  function mapContestData(offerData) {
    console.log("🚀 ~ file: ModeratorPage.jsx:35 ~ mapContestData ~ offerData:", offerData)
    if (offerData) {
      return (
        <div>
          {offerData.map((offer, i) => (
            <div key={i}>
              <p>Contest ID: {offer.id}</p>
              <p>Contest Type: {offer.contestType}</p>
              <p>Industry: {offer.industry}</p>
              <p>Status: {offer.status}</p>
              <p>Prize: {offer.prize}</p>
              <div>
                Offer
                {offer.Offers.map((o, j) => (
                  <div key={j}>
                    <p>Offer ID: {o.id}</p>
                    <p>Offer message: {o.text}</p>
                    <p>Status: {o.status}</p>
                    <p>User Display Name: {o.User.displayName}</p>
                    <p>User Email: {o.User.email}</p>
                    <p>User First Name: {o.User.firstName}</p>
                    <p>User Last Name: {o.User.lastName}</p>
                    <p>User Rating: {o.User.rating}</p>
                    <div>
                      <button onClick={() => handleVerifi(o.id)}>Verify</button>
                      <button onClick={() => handleReject(o.id)}>Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div></div>
        </div>
      );
    } else {
      return <div>Loading Offers Data...</div>;
    }
  }

  // const handleTabClick = (tabName) => {
  //   setActiveTab(tabName);
  // };
  // function Tab1Content() {
  //   return <div>Содержимое вкладки 1</div>;
  // }

  // function Tab2Content() {
  //   return <div>Содержимое вкладки 2</div>;
  // }

  // function Tab3Content() {
  //   return <div>Содержимое вкладки 3</div>;
  // }
  return (
    <>
      <h1>Contest Data</h1>
      {/* {mapContestData(offerData)} */}
      {/* <div>
        <div className="tab-menu">
          <button
            onClick={() => handleTabClick('tab1')}
            className={activeTab === 'tab1' ? 'active' : ''}
          >
            Вкладка 1
          </button>
          <button
            onClick={() => handleTabClick('tab2')}
            className={activeTab === 'tab2' ? 'active' : ''}
          >
            Вкладка 2
          </button>
          <button
            onClick={() => handleTabClick('tab3')}
            className={activeTab === 'tab3' ? 'active' : ''}
          >
            Вкладка 3
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'tab1' && <Tab1Content />}
          {activeTab === 'tab2' && <Tab2Content />}
          {activeTab === 'tab3' && <Tab3Content />}
        </div>
      </div> */}
    </>
  );
}
