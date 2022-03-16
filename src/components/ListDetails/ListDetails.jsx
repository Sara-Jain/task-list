/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LISTS_ROUTE, TASKS_ROUTE } from '../../constants/routes';
import './ListDetails.css';

function ListDetails({ listData }) {
  const navigate = useNavigate();
  const { listId } = useParams();
  const list = listData.find(
    (listItem) => listItem.id === parseInt(listId, 10),
  );

  return (
    <>
      <div>
        <h1>{list.name}</h1>
        <button
          type="submit"
          onClick={() => navigate(`${LISTS_ROUTE}/${list.id}${TASKS_ROUTE}/create`)}
        >
          Add new Task
        </button>
      </div>
      <ul>
        {list.tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button
              type="submit"
              onClick={() => navigate(`${LISTS_ROUTE}/${list.id}${TASKS_ROUTE}/${task.id}`)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <button type="submit" onClick={() => navigate(`${LISTS_ROUTE}`)}>Back</button>
    </>
  );
}

ListDetails.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })),
  })).isRequired,
};

export default ListDetails;
