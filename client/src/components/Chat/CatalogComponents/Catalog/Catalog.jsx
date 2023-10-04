import React from 'react';
import styles from './Catalog.module.scss';

function Catalog  (props) {
  const { deleteCatalog, goToCatalog } = props;
  const chats = [];
  const { id } = props.catalog.catalog;
  for (let i = 0; i < props.catalog.catalogToChats.length; i++) {
    if (props.catalog.catalogToChats[i].catalogId === id) {
      chats.push(props.catalog.catalogToChats[i].Conversation);
    }
  }
  return (
    <div
      className={styles.catalogContainer}
      onClick={(event) => goToCatalog(event, props.catalog.catalog, chats)}
    >
      <span className={styles.catalogName}>
        {props.catalog.catalog.catalogName}
      </span>
      <div className={styles.infoContainer}>
        <span>Chats number: </span>
        <span className={styles.numbers}>{chats.length}</span>
        <i
          className="fas fa-trash-alt"
          onClick={(event) => deleteCatalog(event, id)}
        />
      </div>
    </div>
  );
};

export default Catalog;
