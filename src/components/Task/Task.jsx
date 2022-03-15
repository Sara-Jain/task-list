import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { LISTS_ROUTE, NOT_FOUND_ROUTE_ } from '../../constants/routes';
import './Task.css'

const Task = ({ listData, setListData }) => {
    const navigate = useNavigate();
    const { listId, taskId } = useParams();
    const list = listData.find(
        (listItem) => listItem.id === parseInt(listId)
    );
    const task = list.tasks.find(
        (taskItem) => taskItem.id === parseInt(taskId)
    );

    const [selectedTask, setSelectedTask] = useState(task);

    const taskTitleHandler = (event) => {
        setSelectedTask({
            ...selectedTask,
            title: event.target.value
        });
    };



    const saveButtonHandler = () => {
        const updatedListData = listData.map((list) => {
            if (list.id === parseInt(listId)) {
                return {
                    id:list.id,
                    name: list.name,
                    tasks: list.tasks.map((task) =>
                        task.id === parseInt(taskId) ? selectedTask : task
                    )
                }
            } else {
                return list;
            }
        })
        setListData(updatedListData);
        navigate(`${LISTS_ROUTE}/${list.id}`);
    }

    return (
        <>
            <input
                value={selectedTask.title}
                onChange={taskTitleHandler}
            ></input>
            <button
                onClick={saveButtonHandler}
            >Save
            </button>
            <button onClick={() =>  navigate(`${LISTS_ROUTE}/${list.id}`)}>Back</button>
        </>
    )
}

export default Task;