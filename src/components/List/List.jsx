import React, { useState } from "react";
import { LISTS_ROUTE } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import './List.css';

const List = ({ listData, setListData }) => {
    const [newListName, setNewListName] = useState('');
    const navigate = useNavigate();

    const listChangeHandler = (event) => {
        setNewListName(event.target.value);
    }

    const addListHandler = () => {
        const addedList = {
            id: Math.floor(Math.random() * 100),
            name: newListName,
            tasks: []
        }
        setListData((prevState) => [...prevState, addedList])
        setNewListName('');
    }

    return (
        <>
            <input value={newListName} onChange={listChangeHandler}></input>
            <button onClick={addListHandler}>Add new list</button>
            <div>Lists</div>
            <ul>
                {listData.map((list) => {
                    return (<li key={list.id}>
                        {list.name}
                        <button
                            onClick={() => {
                                navigate(`${LISTS_ROUTE}/${list.id}`);
                            }}>
                            View Tasks
                        </button>
                    </li>);
                })}
            </ul>
        </>
    )
}

export default List;