import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { LISTS_ROUTE, NOT_FOUND_ROUTE_ } from '../../constants/routes';
import './Task.css'

const Task = ({ listData, setListData }) => {
    const navigate = useNavigate();
    const { listId, taskId } = useParams();
    const list = listData.find(
        (listItem) => listItem.id === parseInt(listId)
    );
    let task = list.tasks.find(
        (taskItem) => taskItem.id === parseInt(taskId)
    );

    if(!task) {
        task={}; 
    }

    const [selectedTask, setSelectedTask] = useState(task);
   // const [method, setMethod] = useState('edit');

    const taskTitleHandler = (event) => {
        setSelectedTask({
            ...selectedTask,
            title: event.target.value
        });
    };

    const saveButtonHandler = () => {
        const updatedListData = listData.map((list) => {
            if (list.id === parseInt(listId)) {
                if (!taskId) {
                    selectedTask.id = Math.floor(Math.random() * 100)
                    return {
                        ...list,
                        tasks: [...list.tasks,selectedTask]
                    }
                }else{
                    return {
                        ...list,
                        tasks: list.tasks.map((task) =>
                            task.id === parseInt(taskId) ? selectedTask : task
                        )
                    }
                }
            } else {
                return list;
            }
        })
        //console.log(updatedListData);
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
            <button onClick={() => navigate(`${LISTS_ROUTE}/${list.id}`)}>Back</button>
        </>
    )
}

export default Task;