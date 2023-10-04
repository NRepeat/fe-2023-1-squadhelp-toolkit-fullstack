import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUser } from '../../store/slices/userSlice';
import Spinner from '../Spinner/Spinner';

const PrivateHoc = (Component, props) => {
  const Hoc = (ownProps) => {
    useEffect(() => {
      if (!ownProps.data) {
        ownProps.getUser();
      }
    }, []);

    return (
      <>
        {ownProps.isFetching ? (
          <Spinner />
        ) : ownProps.data ? (
          <Component
            history={ownProps.history}
            match={ownProps.match}
            {...props}
          />
        ) : (
          <Redirect to="/login" />
        )}
      </>
    );
  };

  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default PrivateHoc;
