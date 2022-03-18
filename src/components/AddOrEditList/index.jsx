import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import makeRequest from '../utils/makeRequest';
import { createListEndpoint, editListEndpoint } from '../../constants/apiEndpoints';
import { LISTS_ROUTE } from '../../constants/routes';
import './AddOrEditList.css';

function AddOrEditList({ listData }) {
  console.log(listData);
  const navigate = useNavigate();
  const { listId } = useParams();
  const [method, setMethod] = useState('add');

  const [addList, setAddList] = useState(false);
  const [editList, setEditList] = useState(false);

  let list = listData.find(
    (listItem) => listItem.id === parseInt(listId, 10),
  );

  if (!list) list = { name: 'Enter a list name' };
  const [selectedList, setSelectedList] = useState(list);

  useEffect(() => {
    if (listId) {
      setMethod('edit');
    }
  }, []);

  useEffect(() => {
    if (addList) {
      makeRequest(createListEndpoint, {
        listName: selectedList.listName,
      }).then(() => {
        setAddList(false);
        navigate(`${LISTS_ROUTE}`);
      });
    }
  }, [addList]);

  useEffect(() => {
    if (editList) {
      makeRequest(editListEndpoint(listId), {
        listName: selectedList.listName,
      }).then(() => {
        setEditList(false);
        navigate(`${LISTS_ROUTE}`);
      });
    }
  }, [editList]);

  const listTitleHandler = (event) => {
    setSelectedList(
      {
        ...selectedList,
        listName: event.target.value,
      },
    );
  };

  const saveButtonHandler = () => {
    if (method === 'add') {
      setAddList(true);
    } else {
      setEditList(true);
    }
  };

  return (
    <>
      <input
        value={selectedList.listName}
        onChange={listTitleHandler}
      />
      <button
        type="button"
        onClick={saveButtonHandler}
      >
        Save
      </button>
      <button type="submit" onClick={() => navigate(`${LISTS_ROUTE}`)}>Back</button>
    </>
  );
}

AddOrEditList.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    listName: PropTypes.string.isRequired,
  })).isRequired,
};

export default AddOrEditList;
