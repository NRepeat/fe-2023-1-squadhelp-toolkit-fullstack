import React, { useEffect, useRef, useState } from 'react';
import styles from '../style.module.scss';

const data = [
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
      'For Naming contests, you will start receiving your submissions within few minutes of launching your contest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase.',
  },
  {
    question: 'How long does it take to start receiving submissions?',
    answer:
      'For Naming contests, you will start receiving your submissions within few minutes of launching your contest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase.',
  },
];

export default function LaunchingAContest() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef(null);

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
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = expandedIndex !== null ? `${contentRef.current.scrollHeight}px` : '0';
    }
  }, [expandedIndex]);
  return (
    <div className={styles.FaQwrapperr}>
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
                  ? `${contentRef.current.scrollHeight}px`
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
