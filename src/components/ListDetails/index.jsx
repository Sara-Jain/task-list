/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LISTS_ROUTE, TASKS_ROUTE } from '../../constants/routes';
import './ListDetails.css';
import { getTasksOfListEndpoint, GET_LIST_ENDPOINT } from '../../constants/apiEndpoints';
import makeRequest from '../utils/makeRequest';

function ListDetails({ listData }) {
  const navigate = useNavigate();
  const { listId } = useParams();
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    makeRequest(getTasksOfListEndpoint(listId)).then((res) => {
      console.log(res);
      setResponseData(res);
    });
  }, []);

  const availableTasks = responseData.map((task) => (
    <li key={task.id}>
      {task.title}
      <button
        type="submit"
        onClick={() => navigate(`${LISTS_ROUTE}/${listId}${TASKS_ROUTE}/${task.id}/edit`)}
      >
        Edit
      </button>
    </li>
  ));

  return (
    <>
      <div>Lists</div>
      <div>
        {/* <h1>{list.name}</h1> */}
        <button
          type="submit"
          onClick={() => navigate(`${LISTS_ROUTE}/${listId}${TASKS_ROUTE}/create`)}
        >
          Add new Task
        </button>
      </div>
      <ul>
        {availableTasks}
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
