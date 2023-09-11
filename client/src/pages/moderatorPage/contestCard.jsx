import React from 'react';

export default function ContestCard({ contestData, onVerify, onReject }) {
  console.log("🚀 ~ file: contestCard.jsx:4 ~ ContestCard ~ contestData:", contestData);

  const mapedContestData = (contestData) => {
    return (
      <>
        {contestData.map((offer) => (
          <div key={offer.id}>
            <p>Contest ID: {offer.id}</p>
            <p>Contest Type: {offer.contestType}</p>
            <p>Industry: {offer.industry}</p>
            <p>Status: {offer.status}</p>
            <p>Prize: {offer.prize}</p>
            <div>
              Offer
              {offer.Offers.map((o) => (
                <div key={o.id}>
                  <p>Offer ID: {o.id}</p>
                  <p>Offer message: {o.text}</p>
                  <p>Status: {o.status}</p>
                  <p>User Display Name: {o.User.displayName}</p>
                  <p>User Email: {o.User.email}</p>
                  <p>User First Name: {o.User.firstName}</p>
                  <p>User Last Name: {o.User.lastName}</p>
                  <p>User Rating: {o.User.rating}</p>
                  <div>
                    {/* Включите кнопки Verify и Reject */}
                    <button onClick={() => onVerify(o.id)}>Verify</button>
                    <button onClick={() => onReject(o.id)}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      {mapedContestData(contestData)}
    </div>
  );
}
