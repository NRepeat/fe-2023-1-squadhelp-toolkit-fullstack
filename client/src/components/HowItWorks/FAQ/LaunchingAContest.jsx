import React, { useEffect, useRef, useState } from 'react';
import styles from '../style.module.scss';

const launchingAContestsdata = [
  {
    question: 'How long does it take to start receiving submissions?',
    answer:
      'For Naming contests, you will start receiving your submissions within few minutes of launching your contest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase.',
  },
  {
    question: 'How long does it take to start receiving submissions?',
    answer:
      'For Naming contests, you will start receiving your submissions within few minutes of launching your contest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase.',
  },
  {
    question: 'How long does it take to start receiving submissions?',
    answer:
      'For Naming contests, you will start receiving your submissions within few minutes of launching your contest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase.ontest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase.ontest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase.',
  },
  {
    question: 'How long does it take to start receiving submissions?',
    answer:
      'For Naming contests, you will start receiving your submissions within few minutes of launching your contest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase.',
  },
];
function MapedList({ data, contentRef }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const handleClick = (index) => {
    if (!isAnimating) {
      setIsAnimating(true);

      if (index === expandedIndex) {
        setExpandedIndex(null);
      } else {
        setExpandedIndex(index);
      }
      requestAnimationFrame(() => {
        setIsAnimating(false);
      });
    }
  };
  return (
    <div className={styles.pading}>
      {' '}
      {data.map((item, index) => (
        <span
          key={index}
          className={`${styles.FaQspan} ${
            expandedIndex === index ? styles.hidden : ''
          }`}
          onClick={() => handleClick(index)}
        >
          <p className={styles.question}> {item.question}</p>
          <p
            ref={contentRef}
            className={`${styles.answer} ${
              expandedIndex === index ? styles.expanded : ''
            }`}
            style={{
              maxHeight:
                expandedIndex === index
                  ? `${contentRef.current.scrollHeight+260}px`
                  : '0',
            }}
          >
            {item.answer}
          </p>
        </span>
      ))}
    </div>
  );
}
function LaunchingAContestsList({ data, contentRef }) {
  return <MapedList data={data} contentRef={contentRef} />;
}
function BuyingFromMarketplaceList({ data, contentRef }) {
  return <MapedList data={data} contentRef={contentRef} />;
}
function ManagedContestsList({ data, contentRef }) {
  return <MapedList data={data} contentRef={contentRef} />;
}
function ForCreativesList({ data, contentRef }) {
  return <MapedList  data={data} contentRef={contentRef} />;
}
export default function LaunchingAContest() {
  const contentRef = useRef(null);
  return (
    <div className={styles.FaQwrapperr}>
      <p  id="Launching A Contest"className={styles.p}>Launching A Contest</p>
      <LaunchingAContestsList
			
        data={launchingAContestsdata}
        contentRef={contentRef}
      />
      <p id="Buying From Marketplace" className={styles.p}>Buying From Marketplace</p>
      <BuyingFromMarketplaceList
        data={launchingAContestsdata}
        contentRef={contentRef}
      />
      <p id="Managed Contests" className={styles.p}>Managed Contests</p>
      <ManagedContestsList
        data={launchingAContestsdata}
        contentRef={contentRef}
      />
      <p id="For Creatives" className={styles.p}>For Creatives</p>
      <ForCreativesList  data={launchingAContestsdata} contentRef={contentRef} />
    </div>
  );
}
