/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { LISTS_ROUTE, TASKS_ROUTE } from '../../constants/routes';
import './ListDetails.css';
import { getTasksOfListEndpoint, GET_LIST_ENDPOINT } from '../../constants/apiEndpoints';
import makeRequest from '../utils/makeRequest';

function ListDetails({ listData }) {
  const navigate = useNavigate();
  const { listId } = useParams();
  const [responseData, setResponseData] = useState([]);

  const list = listData.find(
    (listItem) => listItem.id === parseInt(listId, 10),
  );

  useEffect(() => {
    makeRequest(getTasksOfListEndpoint(listId)).then((res) => {
      setResponseData(res);
    });
  }, []);

  const availableTasks = responseData.map((task) => (
    <li className="eachTask" key={task.id}>
      {task.title}
      <button
        type="submit"
        onClick={() => navigate(`${LISTS_ROUTE}/${listId}${TASKS_ROUTE}/${task.id}/edit`)}
      >
        <BsPencil />
      </button>
    </li>
  ));

  return (
    <div className="main-container">
      <div className="top-color">
        <button
          className="createButton"
          type="button"
          onClick={() => navigate(`${LISTS_ROUTE}/${listId}${TASKS_ROUTE}/create`)}
        >
          <AiFillPlusCircle />
          Add New Task
        </button>

      </div>
      <div className="bottom-color" />
      <div className="display-container">
        <h1>{list.listName}</h1>
        <ul className="allTasks">
          {availableTasks}
        </ul>
      </div>
    </div>
  /* <>
   <div>
    <h1>{list.listName}</h1>
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
  </> */
  );
}

ListDetails.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    listName: PropTypes.string.isRequired,
  })).isRequired,
};

export default ListDetails;
