import React,{useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import { LISTS_ROUTE , TASKS_ROUTE ,NOT_FOUND_ROUTE } from '../../constants/routes';
import './ListDetails.css'


const ListDetails = ({listData}) => {
   const navigate = useNavigate();
   const {listId} = useParams();
   const list = listData.find(
    (listItem) => listItem.id === parseInt(listId)
  );

    return (
        <>
            <div>
                <h1>{list.name}</h1>
                <button
                    onClick={() => navigate(`${LISTS_ROUTE}/${list.id}${TASKS_ROUTE}/create`)}>
                    Add new Task</button>
            </div>
            <ul>
                {list.tasks.map((task) => {
                    return <li key={task.id}>
                        {task.title}
                        <button
                            onClick={() => navigate(`${LISTS_ROUTE}/${list.id}${TASKS_ROUTE}/${task.id}`)}>
                            Edit
                        </button>
                    </li>
                })}
            </ul>
            <button onClick={() =>  navigate(`${LISTS_ROUTE}`)}>Back</button>
        </>
    )
}

export default ListDetails;