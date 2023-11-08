import React, { useState } from 'react';
import style from './ContestCard.module.scss';
import constants from '../../../constants';

export default function ContestCard({ contestData, onVerify, onReject }) {
  const [visibleOffers, setVisibleOffers] = useState([]);

  const toggleOfferVisibility = (offerId) => {
    if (visibleOffers.includes(offerId)) {
      setVisibleOffers(visibleOffers.filter((id) => id !== offerId));
    } else {
      setVisibleOffers([...visibleOffers, offerId]);
    }
  };

  const mapedContestData = (contestData) => {
    const sortedContestData = contestData.slice().sort((a, b) => a.id - b.id);
    return (
      <div
        className={`${
          contestData.length === 0 ? style.displayNone : style.mpaCardContainer
        }`}
      >
        {sortedContestData.map((offer) => (
          <div key={offer.id} className={style.contestContainer}>
            <div className={style.contestInfo}>
              <p>Contest ID: {offer.id}</p>
              <p>Contest Type: {offer.contestType}</p>
              <p>Industry: {offer.industry}</p>
              <p>Status: {offer.status}</p>
              <p>Prize: {offer.prize}</p>
              <div>
                <div>
                  {offer.Offers.length !== 0 ? (
                    <div className={style.buttonOffer}>
                      <button onClick={() => toggleOfferVisibility(offer.id)}>
                        {visibleOffers.includes(offer.id)
                          ? 'Hide Offers'
                          : 'Show Offers'}
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                  {visibleOffers.includes(offer.id) && (
                    <div className={style.offerContainer}>
                      {offer.Offers.map((o) => (
                        <div key={o.id} className={style.offerInfo}>
                          <p>Offer ID: {o.id}</p>
                          <p>Offer message: {o.text}</p>
                          <p>Status: {o.status}</p>
                          {o.fileName && (
                            <div className={style.imgWrapper}>
                              {
                                <img
                                  src={`${constants.publicContestsURL}${o.fileName}`}
                                  alt="userImg"
                                />
                              }
                            </div>
                          )}

                          <p>User Display Name: {o.User.displayName}</p>
                          <p>User Email: {o.User.email}</p>
                          <p>User First Name: {o.User.firstName}</p>
                          <p>User Last Name: {o.User.lastName}</p>
                          <p>User Rating: {o.User.rating}</p>
                          <div>
                            {offer.status === constants.OFFER_STATUS_ACTIVE && (
                              <>
                                {o.status != constants.OFFER_STATUS_VERIFIED ? (
                                  o.status ===
                                    constants.OFFER_STATUS_PENDING && (
                                    <div>
                                      <button onClick={() => onVerify(o.id)}>
                                        Verify
                                      </button>
                                      <button onClick={() => onReject(o.id)}>
                                        Reject
                                      </button>
                                    </div>
                                  )
                                ) : (
                                  <div className={style.VERIFIED}>VERIFIED</div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return <div>{mapedContestData(contestData)}</div>;
}
