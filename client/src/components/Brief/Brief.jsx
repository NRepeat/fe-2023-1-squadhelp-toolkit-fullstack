import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  updateContest,
  clearContestUpdationStore,
} from '../../store/slices/contestUpdationSlice';
import { changeEditContest } from '../../store/slices/contestByIdSlice';
import ContestForm from '../ContestForm/ContestForm';
import styles from './Brief.module.scss';
import ContestInfo from '../Contest/ContestInfo/ContestInfo';
import Error from '../Error/Error';

function Brief(props) {
  const dispatch = useDispatch();

  const isEditContest = useSelector(
    (state) => state.contestByIdStore.isEditContest
  );
  const user = useSelector((state) => state.userStore.data);
  const contestUpdationStore = useSelector(
    (state) => state.contestUpdationStore
  );

  useEffect(() => {
    dispatch(clearContestUpdationStore());
  }, [dispatch]);

  const setNewContestData = (values) => {
    const data = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== 'file' && values[key]) data.append(key, values[key]);
    });
    if (values.file instanceof File) {
      data.append('file', values.file);
    }
    data.append('contestId', props.contestData.id);
    dispatch(updateContest(data));
  };

  const getContestObjInfo = () => {
    const {
      focusOfWork,
      industry,
      nameVenture,
      styleName,
      targetCustomer,
      title,
      brandStyle,
      typeOfName,
      typeOfTagline,
      originalFileName,
      contestType,
    } = props.contestData;
    const data = {
      focusOfWork,
      industry,
      nameVenture,
      styleName,
      targetCustomer,
      title,
      brandStyle,
      typeOfName,
      typeOfTagline,
      originalFileName,
      contestType,
    };
    const defaultData = {};
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        if (key === 'originalFileName') {
          defaultData.file = { name: data[key] };
        } else {
          defaultData[key] = data[key];
        }
      }
    });
    return defaultData;
  };

  return (
    <div className={styles.contestForm}>
      {contestUpdationStore.error && (
        <Error
          data={contestUpdationStore.error.data}
          status={contestUpdationStore.error.status}
          clearError={() => dispatch(clearContestUpdationStore())}
        />
      )}
      {!isEditContest ? (
        <ContestInfo
          userId={user.id}
          contestData={props.contestData}
          changeEditContest={(data) => dispatch(changeEditContest(data))}
          role={props.role}
          goChat={props.goChat}
        />
      ) : (
        <ContestForm
          contestType={props.contestData.contestType}
          defaultData={getContestObjInfo()}
          handleSubmit={setNewContestData}
        />
      )}
    </div>
  );
}

export default withRouter(Brief);
