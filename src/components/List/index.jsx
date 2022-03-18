import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LISTS_ROUTE } from '../../constants/routes';
import makeRequest from '../utils/makeRequest';
import { GET_LIST_ENDPOINT } from '../../constants/apiEndpoints';
// import Button from '../Button/Button';
import './List.css';

function List() {
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    makeRequest(GET_LIST_ENDPOINT).then((res) => {
      setResponseData(res);
    });
  }, []);
  console.log(responseData);

  const availableLists = responseData.map((list) => (
    <li key={list.id}>
      {list.listName}
      <button
        type="button"
        onClick={() => {
          navigate(`${LISTS_ROUTE}/${list.id}`);
        }}
      >
        View Tasks
      </button>
      <button
        type="button"
        onClick={() => {
          navigate(`${LISTS_ROUTE}/${list.id}/edit`);
        }}
      >
        Edit
      </button>
    </li>
  ));

  return (
    <div className="listContainer">
      <div className="listHeader">
        <button type="button" onClick={() => navigate(`${LISTS_ROUTE}/create`)}>Create list</button>
      </div>
      <main>
        <div className="listHeading">Lists</div>
        <div className="listItemContainer">
          {availableLists}
        </div>
      </main>
    </div>
  );
}

export default List;
