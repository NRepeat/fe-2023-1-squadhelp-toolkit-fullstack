import React, { useEffect, useState } from 'react';
import { changeOferrStatus, getOffers } from '../../store/slices/offerSlice';
import { useDispatch } from 'react-redux';
import constants from '../../constants';
import ContestCard from './contestCard';
import Footer from '../../components/Footer/Footer';
import style from './ModeratorPage.module.scss';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContestData = categorizedContestsData[activeTab].slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className={style.formContainer}>
      <h1>Contests </h1>

      <div className={style.formWrapper}>
        <div className={style.buttonWrapper}>
          <div className={style.tabContainer}>
            <button
              className={`${style.tabButton} ${
                activeTab === 'ACTIVEcontest' ? `${style.active}` : ''
              }`}
              onClick={() => handleTabChange('ACTIVEcontest')}
            >
              Active
            </button>
            <button
              className={`${style.tabButton} ${
                activeTab === 'PENDINGcontest' ? `${style.active}` : ''
              }`}
              onClick={() => handleTabChange('PENDINGcontest')}
            >
              Pending
            </button>
            <button
              className={`${style.tabButton} ${
                activeTab === 'FINISHEDcontest' ? `${style.active}` : ''
              }`}
              onClick={() => handleTabChange('FINISHEDcontest')}
            >
              Finished
            </button>
          </div>
        </div>
        <div className={style.cardWrapper}>
          {loadingError ? (
            <div>{loadingError}</div>
          ) : (
            <div>
              <div>
                {activeTab === 'ACTIVEcontest' && (
                  <ContestCard
                    contestData={currentContestData}
                    onVerify={handleVerify}
                    onReject={handleReject}
                  />
                )}
              </div>
              <div>
                {activeTab === 'PENDINGcontest' && (
                  <ContestCard
                    contestData={currentContestData}
                    onVerify={handleVerify}
                    onReject={handleReject}
                  />
                )}
              </div>
              <div>
                {activeTab === 'FINISHEDcontest' && (
                  <ContestCard
                    contestData={currentContestData}
                    onVerify={handleVerify}
                    onReject={handleReject}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <ul className={style.pagination}>
          {Array.from({
            length: Math.ceil(
              categorizedContestsData[activeTab].length / itemsPerPage
            ),
          }).map((_, index) => (
            <li
              key={index}
              className={`${style.pageItem} ${
                index + 1 === currentPage ? `${style.active}` : ''
              }`}
            >
              <button onClick={() => paginate(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
