import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { LISTS_ROUTE } from '../../constants/routes';
import './AddList.css'

const AddList = ({ listData, setListData }) => {
    const navigate = useNavigate();
    const { listId } = useParams();
    let list = listData.find(
        (listItem) => listItem.id === parseInt(listId)
    );

    if(!list) list={name: 'Enter a list name'};

    const [selectedList, setSelectedList] = useState(list);

    const listTitleHandler = (event) => {
        setSelectedList({
            ...selectedList,
            name: event.target.value
        });
    };

    const saveButtonHandler = () => {
        if(!listId){
            const addedList = {
                id: Math.floor(Math.random() * 100),
                name: selectedList.name,
                tasks: []
            }
            setListData((prevState) =>  [...prevState, addedList]);
    
        }else{
            const updatedListData = listData.map((list) => {
                if(list.id === parseInt(listId)){
                    return {
                        ...list,
                        name: selectedList.name
                    }
                }else {
                    return list;
                }
            })
            setListData(updatedListData);
        }
        navigate(`${LISTS_ROUTE}`);
    }

    return (
        <>
            <input
                value={selectedList.name}
                onChange={listTitleHandler}
            ></input>
            <button
                onClick={saveButtonHandler}
            >Save
            </button>
            <button onClick={() => navigate(`${LISTS_ROUTE}`)}>Back</button>
        </>
    )
}

export default AddList;