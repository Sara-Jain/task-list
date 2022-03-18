import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillPlusCircle } from 'react-icons/ai';
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

  const availableLists = responseData.map((list) => (
    <li key={list.id} className="eachListItem">
      <p>{list.listName}</p>
      <button
        className="listButton"
        type="button"
        onClick={() => {
          navigate(`${LISTS_ROUTE}/${list.id}`);
        }}
      >
        View Tasks
      </button>
      <button
        className="listButton"
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
        <button
          className="createButton"
          type="button"
          onClick={() => navigate(`${LISTS_ROUTE}/create`)}
        >
          <AiFillPlusCircle />
          Create list
        </button>
      </div>
      <div className="main">
        <p className="availableLists"><b>Available Lists</b></p>
        <ul className="listOfItems">
          {availableLists}
        </ul>

      </div>
    </div>
  // <div className="listContainer">
  //   <div className="listHeader">
  //     <button
  //       type="button"
  //       onClick={() => navigate(`${LISTS_ROUTE}/create`)}
  //     >
  //       Create list
  //     </button>
  //   </div>
  //   <main>
  //     <div className="listHeading">Lists</div>
  //     <div className="listItemContainer">
  //       {availableLists}
  //     </div>
  //   </main>
  // </div>
  );
}

export default List;
