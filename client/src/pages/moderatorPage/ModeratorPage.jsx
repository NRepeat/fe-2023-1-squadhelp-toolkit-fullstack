import React, { useEffect, useState } from 'react';
import { changeOferrStatus, getOffers } from '../../store/slices/offerSlice';
import { useDispatch } from 'react-redux';
import constants from '../../constants';
import ContestCard from './contestCard';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function ModeratorPage(props) {
  const dispatch = useDispatch();
  const [contestData, setContestData] = useState([]);
  const [categorizedContestsData, setCategorizedContests] = useState({
    ACTIVEcontest: [],
    PENDINGcontest: [],
    FINISHEDcontest: [],
  });
  const [loadingError, setLoadingError] = useState(null);
  const [rerenderFlag, setRerenderFlag] = useState(false);
  const [activeTab, setActiveTab] = useState('ACTIVEcontest');

  const fetchOffers = async () => {
    try {
      const response = await dispatch(getOffers());
      const offers = response.payload.data;

      setContestData(offers);
    } catch (error) {
      console.error('Error fetching offers:', error);
      setLoadingError('Error fetching offers');
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [rerenderFlag]);

  useEffect(() => {
    if (contestData.length > 0) {
      setCategorizedContests(filterContestData(contestData));
    }
  }, [contestData, rerenderFlag]);

  function handleVerify(id) {
    const status = 'verified';
    dispatch(changeOferrStatus({ id, status }));
    fetchOffers();
    setRerenderFlag(!rerenderFlag);
  }

  function handleReject(id) {
    const status = 'rejected';
    dispatch(changeOferrStatus({ id, status }));
    fetchOffers();
    setRerenderFlag(!rerenderFlag);
  }

  function filterContestData(contestData) {
    const categorizedContests = contestData.reduce(
      (acc, contest) => {
        if (contest.status === constants.CONTEST_STATUS_ACTIVE) {
          acc.ACTIVEcontest.push(contest);
        } else if (contest.status === constants.CONTEST_STATUS_PENDING) {
          acc.PENDINGcontest.push(contest);
        } else if (contest.status === constants.CONTEST_STATUS_FINISHED) {
          acc.FINISHEDcontest.push(contest);
        }
        return acc;
      },
      { ACTIVEcontest: [], PENDINGcontest: [], FINISHEDcontest: [] }
    );
    return categorizedContests;
  }


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <h1>Contest Data</h1>
      <div className="tab-container">
        <button
          className={`tab-button ${
            activeTab === 'ACTIVEcontest' ? 'active' : ''
          }`}
          onClick={() => handleTabChange('ACTIVEcontest')}
        >
          Active
        </button>
        <button
          className={`tab-button ${
            activeTab === 'PENDINGcontest' ? 'active' : ''
          }`}
          onClick={() => handleTabChange('PENDINGcontest')}
        >
          Pending
        </button>
        <button
          className={`tab-button ${
            activeTab === 'FINISHEDcontest' ? 'active' : ''
          }`}
          onClick={() => handleTabChange('FINISHEDcontest')}
        >
          Finished
        </button>
      </div>

      {loadingError ? (
        <div>{loadingError}</div>
      ) : (
        <div>
          {activeTab === 'ACTIVEcontest' && (
            <ContestCard
              contestData={categorizedContestsData.ACTIVEcontest}
              onVerify={handleVerify}
              onReject={handleReject}
            />
          )}
          {activeTab === 'PENDINGcontest' && (
            <ContestCard
              contestData={categorizedContestsData.PENDINGcontest}
              onVerify={handleVerify}
              onReject={handleReject}
            />
          )}
          {activeTab === 'FINISHEDcontest' && (
            <ContestCard
              contestData={categorizedContestsData.FINISHEDcontest}
              onVerify={handleVerify}
              onReject={handleReject}
            />
          )}
        </div>
      )}
			<Footer/>
    </>
  );
}
