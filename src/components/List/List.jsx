import React, { useState } from "react";
import { LISTS_ROUTE } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import './List.css';

const List = ({ listData, setListData }) => {
    const navigate = useNavigate();


    return (
        <>
            <button onClick={()=> navigate(`${LISTS_ROUTE}/create`)}>Add new list</button>
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
                        <button
                            onClick={() => {
                                navigate(`${LISTS_ROUTE}/${list.id}/edit`);
                            }}>
                            Edit
                        </button>
                    </li>);
                })}
            </ul>
        </>
    )
}

export default List;