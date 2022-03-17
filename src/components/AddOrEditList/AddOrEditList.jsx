/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LISTS_ROUTE } from '../../constants/routes';
import './AddOrEditList.css';

function AddOrEditList({ listData, setListData }) {
  const navigate = useNavigate();
  const { listId } = useParams();
  let list = listData.find(
    (listItem) => listItem.id === parseInt(listId, 10),
  );

  if (!list) list = { name: 'Enter a list name' };

  const
    [selectedList, setSelectedList] = useState(list);

  const listTitleHandler = (event) => {
    setSelectedList(
      {
        ...selectedList,
        name: event.target.value,
      },
    );
  };

  const saveButtonHandler = () => {
    if (!listId) {
      const addedList = {
        id: Math.floor(Math.random() * 100),
        name: selectedList.name,
        tasks: [],
      };
      setListData((prevState) => [...prevState, addedList]);
    } else {
      const updatedListData = listData.map((listItem) => {
        if (listItem.id === parseInt(listId, 10)) {
          return {
            ...listItem,
            name: selectedList.name,
          };
        }
        return listItem;
      });
      setListData(updatedListData);
    }
    navigate(`${LISTS_ROUTE}`);
  };

  return (
    <>
      <input
        value={selectedList.name}
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
    name: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })),
  })).isRequired,
  setListData: PropTypes.func.isRequired,
};

export default AddOrEditList;
