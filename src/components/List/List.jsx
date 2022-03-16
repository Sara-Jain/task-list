/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LISTS_ROUTE } from '../../constants/routes';
import './List.css';

function List({ listData }) {
  const navigate = useNavigate();

  return (
    <div className="listContainer">
      <div className="listHeader">
        <button id="newListButton" onClick={() => navigate(`${LISTS_ROUTE}/create`)}>Create list</button>
      </div>
      <ul>
        <div>Lists</div>
        {
        listData.map((list) => (
          <div className="listItemContainer">
            <li key={list.id}>
              {list.name}
              <button
                onClick={() => {
                  navigate(`${LISTS_ROUTE}/${list.id}`);
                }}
              >
                View Tasks
              </button>
              <button
                onClick={() => {
                  navigate(`${LISTS_ROUTE}/${list.id}/edit`);
                }}
              >
                Edit
              </button>
            </li>
          </div>
        ))
}
      </ul>
    </div>
  );
}
List.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })),
  })).isRequired,
};

export default List;
