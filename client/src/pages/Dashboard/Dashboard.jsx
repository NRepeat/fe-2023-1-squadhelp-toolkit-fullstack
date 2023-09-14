import React from 'react';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';
import ModeratorPage from '../moderatorPage/ModeratorPage';

const Dashboard = (props) => {
  const { role, history } = props;
  return (
    <div>
      <Header />
      {role === CONSTANTS.CUSTOMER ? (
        <CustomerDashboard history={history} match={props.match} />
      ) : role === CONSTANTS.CREATOR ? (
        <CreatorDashboard history={history} match={props.match} />
      ) : (
        <ModeratorPage />
      )}
    </div>
  );
};

const mapStateToProps = (state) => state.userStore.data;

export default connect(mapStateToProps)(Dashboard);
