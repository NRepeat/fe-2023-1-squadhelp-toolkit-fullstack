import React from 'react';
import styles from './Catalog.module.sass';

const Catalog = (props) => {
  const { deleteCatalog, goToCatalog } = props;
  const chats = [];
  const { id } = props.catalog;
  chats.push(props.catalog.Conversation);
  return (
    <div
      className={styles.catalogContainer}
      onClick={(event) => goToCatalog(event, props.catalog,chats)}
    >
      <span className={styles.catalogName}>{props.catalog.catalogName}</span>
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
