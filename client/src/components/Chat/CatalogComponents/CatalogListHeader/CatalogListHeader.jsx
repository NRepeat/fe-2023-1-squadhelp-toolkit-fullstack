import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import {
  changeShowModeCatalog,
  changeRenameCatalogMode,
  changeCatalogName,
  getCatalogList,
} from '../../../../store/slices/chatSlice';
import styles from './CatalogHeader.module.scss';
import FormInput from '../../../FormInput/FormInput';
import Schems from '../../../../utils/validators/validationSchems';

function CatalogListHeader(props) {
  const dispatch = useDispatch();
  const changeCatalogName = (values) => {
    const { changeCatalogName, id } = props;
    changeCatalogName({ catalogName: values.catalogName, catalogId: id });
  };
  const {
    catalogName,
    changeShowModeCatalog,
    changeRenameCatalogMode,
    isRenameCatalog,
  } = props;
  return (
    <div className={styles.headerContainer}>
      <i
        className="fas fa-long-arrow-alt-left"
        onClick={() => {
          changeShowModeCatalog();
          dispatch(getCatalogList());
        }}
      />
      {!isRenameCatalog && (
        <div className={styles.infoContainer}>
          <span>{catalogName}</span>
          <i
            className="fas fa-edit"
            onClick={() => changeRenameCatalogMode()}
          />
        </div>
      )}
      {isRenameCatalog && (
        <div className={styles.changeContainer}>
          <Formik
            onSubmit={changeCatalogName}
            initialValues={props.initialValues}
            validationSchema={Schems.CatalogSchema}
          >
            <Form>
              <FormInput
                name="catalogName"
                classes={{
                  container: styles.inputContainer,
                  input: styles.input,
                  warning: styles.fieldWarning,
                  notValid: styles.notValid,
                }}
                type="text"
                label="Catalog Name"
              />
              <button type="submit">Change</button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { isRenameCatalog } = state.chatStore;
  const { catalogName, id } = state.chatStore.currentCatalog;
  return {
    id,
    catalogName,
    isRenameCatalog,
    initialValues: {
      catalogName,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeShowModeCatalog: () => dispatch(changeShowModeCatalog()),
  changeRenameCatalogMode: () => dispatch(changeRenameCatalogMode()),
  changeCatalogName: (data) => dispatch(changeCatalogName(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogListHeader);
