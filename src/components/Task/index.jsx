import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LISTS_ROUTE } from '../../constants/routes';
import makeRequest from '../utils/makeRequest';
import { editTaskEndpoint, createTaskEndpoint, getTasksOfListEndpoint } from '../../constants/apiEndpoints';
import Button from '../Button/Button';
import './Task.css';

function Task() {
  const navigate = useNavigate();
  const { listId, taskId } = useParams();
  const [method, setMethod] = useState('add');
  const [responseData, setResponseData] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState({ title: '' });

  useEffect(() => {
    makeRequest(getTasksOfListEndpoint(listId)).then((res) => {
      setResponseData(res);
    }).then(() => {
      let task = responseData?.find(
        (taskItem) => taskItem.id === parseInt(taskId, 10),
      );
      if (!task) task = { title: 'Enter Title' };
      setSelectedTask(task);
    });
  }, []);

  useEffect(() => {
    if (taskId) {
      setMethod('edit');
    }
  }, []);

  useEffect(() => {
    if (addTask) {
      makeRequest(createTaskEndpoint(listId), {
        title: selectedTask.title,
      }).then(() => {
        setAddTask(false);
        navigate(`${LISTS_ROUTE}/${listId}`);
      });
    }
  }, [addTask]);

  useEffect(() => {
    if (editTask) {
      makeRequest(editTaskEndpoint(listId, taskId), {
        title: selectedTask.title,
      }).then(() => {
        setEditTask(false);
        navigate(`${LISTS_ROUTE}/${listId}`);
      });
    }
  }, [editTask]);

  const taskTitleHandler = (event) => {
    setSelectedTask(
      {
        ...selectedTask,
        title: event.target.value,
      },
    );
  };

  const saveButtonHandler = () => {
    if (method === 'add') {
      setAddTask(true);
    } else {
      setEditTask(true);
    }
  };

  return (
    <>
      <input
        value={selectedTask.title}
        onChange={taskTitleHandler}
      />
      <Button type="button" onClick={saveButtonHandler} buttonText="Save" />
      {/* <button
        onClick={saveButtonHandler}
        type="button"
      >
        Save
      </button> */}
      <Button type="submit" onClick={() => navigate(`${LISTS_ROUTE}/${listId}`)} buttonText="Back" />
      {/* <button
      type="submit"
      onClick={() => navigate(`${LISTS_ROUTE}/${list.id}`)}>Back</button> */}
    </>
  );
}

export default Task;
