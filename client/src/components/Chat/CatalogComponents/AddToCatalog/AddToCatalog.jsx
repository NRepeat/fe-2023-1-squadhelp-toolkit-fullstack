import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import SelectInput from '../../../SelectInput/SelectInput';
import {
  addChatToCatalog,
  getCatalogList,
} from '../../../../store/slices/chatSlice';
import styles from './AddToCatalog.module.scss';

function AddToCatalog(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCatalogList());
  }, [dispatch]);
  const getCatalogsNames = () => {
    const { catalogList } = props;

    const namesArray = [];
    catalogList.forEach((catalog) => {
      namesArray.push(catalog.catalogName);
    });
    return namesArray;
  };

  const getValueArray = () => {
    const { catalogList } = props;
    const valueArray = [];
    catalogList.forEach((catalog) => {
      valueArray.push(catalog.id);
    });

    return valueArray;
  };

  const click = (values) => {
    const { addChatId, catalogList } = props;
    const catalogId = Number(values.catalogId);
    const catalog = catalogList.filter((data) => data.id === catalogId);
    props.addChatToCatalog({
      chatId: addChatId,
      catalogId: catalogId,
      userId: catalog[0].userId,
    });
  };

  const selectArray = getCatalogsNames();
  return (
    <>
      {selectArray.length !== 0 ? (
        <Formik onSubmit={click} initialValues={{ user: '' }}>
          <Form className={styles.form}>
            <SelectInput
              name="catalogId"
              header="name of catalog"
              classes={{
                inputContainer: styles.selectInputContainer,
                inputHeader: styles.selectHeader,
                selectInput: styles.select,
              }}
              optionsArray={selectArray}
              valueArray={getValueArray()}
            />
            <button type="submit">Add</button>
          </Form>
        </Formik>
      ) : (
        <div className={styles.notFound}>
          You have not created any directories.
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  addChatToCatalog: (data) => dispatch(addChatToCatalog(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCatalog);
