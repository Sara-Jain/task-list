/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import { LISTS_ROUTE } from '../../constants/routes';
// import Button from '../Button/Button';
import './List.css';

function List({ listData }) {
  const navigate = useNavigate();

  const availableLists = listData.map((list) => (
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
  ));

  return (
    <div className="listContainer">
      <div className="listHeader">
        <button onClick={() => navigate(`${LISTS_ROUTE}/create`)}>Create list</button>
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
