/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import makeRequest from '../utils/makeRequest';
import { createListEndpoint, editListEndpoint } from '../../constants/apiEndpoints';
import { LISTS_ROUTE } from '../../constants/routes';
import './AddOrEditList.css';

function AddOrEditList({ listData }) {
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
      console.log('line 33');
      makeRequest(createListEndpoint, {
        listName: selectedList.listName,
      });
      setAddList(false);
    }
  }, [addList]);

  useEffect(() => {
    if (editList) {
      console.log('reaching here');
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
      console.log('method at line 63', method);
      setEditList(true);
    }
    // navigate(`${LISTS_ROUTE}`);
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

export default AddOrEditList;
