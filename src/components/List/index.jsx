import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import { LISTS_ROUTE } from '../../constants/routes';
import makeRequest from '../utils/makeRequest';
import { GET_LIST_ENDPOINT } from '../../constants/apiEndpoints';
// import Button from '../Button/Button';
import './List.css';

// eslint-disable-next-line no-unused-vars
function List({ listData }) {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    makeRequest(GET_LIST_ENDPOINT).then((res) => {
      console.log(res);
      setResponseData(res);
    });
  }, []);

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
List.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      tasks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      })),
    },
  )).isRequired,
};

export default List;
