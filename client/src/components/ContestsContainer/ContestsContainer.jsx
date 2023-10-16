import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import styles from './ContestContainer.module.sass';
import Spinner from '../Spinner/Spinner';

const ContestsContainer = (props) => {
  const { isFetching, haveMore, children, loadMore } = props;

  const scrollHandler = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (haveMore) {
        loadMore(children.length);
      }
    }
  },[haveMore,children.length,loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
  }, [haveMore, children.length,scrollHandler]);

  if (!isFetching && children.length === 0) {
    return <div className={styles.notFound}>Nothing not found</div>;
  }

  return (
    <div>
      {children}
      {isFetching && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default withRouter(ContestsContainer);
