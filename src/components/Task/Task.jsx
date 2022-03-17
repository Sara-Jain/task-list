/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LISTS_ROUTE } from '../../constants/routes';
import Button from '../Button/Button';
import './Task.css';

function Task({ listData, setListData }) {
  const navigate = useNavigate();
  const { listId, taskId } = useParams();
  const list = listData.find(
    (listItem) => listItem.id === parseInt(listId, 10),
  );
  let task = list.tasks.find(
    (taskItem) => taskItem.id === parseInt(taskId, 10),
  );

  if (!task) {
    task = { title: 'Enter a task' };
  }

  const [selectedTask, setSelectedTask] = useState(task);

  const taskTitleHandler = (event) => {
    setSelectedTask({
      ...selectedTask,
      title: event.target.value,
    });
  };

  const saveButtonHandler = () => {
    const updatedListData = listData.map((list) => {
      if (list.id === parseInt(listId, 10)) {
        if (!taskId) {
          selectedTask.id = Math.floor(Math.random() * 100);
          return {
            ...list,
            tasks: [...list.tasks, selectedTask],
          };
        }
        return {
          ...list,
          tasks: list.tasks.map((task) => (task.id === parseInt(taskId, 10) ? selectedTask : task)),
        };
      }
      return list;
    });
    setListData(updatedListData);
    navigate(`${LISTS_ROUTE}/${list.id}`);
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
      <Button type="submit" onClick={() => navigate(`${LISTS_ROUTE}/${list.id}`)} buttonText="Back" />
      {/* <button type="submit" onClick={() => navigate(`${LISTS_ROUTE}/${list.id}`)}>Back</button> */}
    </>
  );
}

Task.propTypes = {
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

export default Task;
