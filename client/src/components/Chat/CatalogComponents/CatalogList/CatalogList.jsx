import React from 'react';
import { connect } from 'react-redux';
import Catalog from '../Catalog/Catalog';
import styles from '../CatalogListContainer/CatalogListContainer.module.scss';
import {
  changeShowModeCatalog,
  deleteCatalog,
} from '../../../../store/slices/chatSlice';

function CatalogList(props) {
  const goToCatalog = (event, catalog, chats) => {
    props.changeShowModeCatalog(catalog);
    event.stopPropagation();
  };

  const deleteCatalog = (event, catalogId) => {
    props.deleteCatalog({ catalogId });
    event.stopPropagation();
  };

  const getListCatalog = () => {
    const {
      catalogList: { catalogList, catalogToChats },
    } = props;
    const elementList = [];
    catalogList.forEach((catalog) => {
      elementList.push(
        <Catalog
          catalog={{ catalog, catalogToChats }}
          key={catalog.id}
          deleteCatalog={deleteCatalog}
          goToCatalog={goToCatalog}
        />
      );
    });
    return elementList.length ? (
      elementList
    ) : (
      <span className={styles.notFound}>Not found</span>
    );
  };

  return <div className={styles.listContainer}>{getListCatalog()}</div>;
}

const mapDispatchToProps = (dispatch) => ({
  changeShowModeCatalog: (data) => dispatch(changeShowModeCatalog(data)),
  deleteCatalog: (data) => dispatch(deleteCatalog(data)),
});

export default connect(null, mapDispatchToProps)(CatalogList);
