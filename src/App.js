import './App.css';
import { useState } from 'react';
import ListDetails from './components/ListDetails/ListDetails';
import Task from './components/Task/Task';
import List from './components/List/List';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const mockLists = [{
  id: 1,
  name: 'Self Learning',
  tasks: [{
    id: 1,
    title: "walk"
  }, {
    id: 2,
    title: "prep your meals"
  }, {
    id: 3,
    title: "meditate"
  }]
},
{
  id: 2,
  name: 'Self Learning 2',
  tasks: [{
    id: 1,
    title: "walk 2"
  }, {
    id: 2,
    title: "prep your meals 2"
  }, {
    id: 3,
    title: "meditate 2"
  }]
},]


function App() {
  const [page, setPage] = useState('list');
  const [listData, setListData] = useState(mockLists);
  const [selectedList, setSelectedList] = useState({});
  const [selectedTask, setSelectedTask] = useState({});
  const [method, setMethod] = useState('add');

  const onEditTask = (task) => {
    // console.log('task', task)
    setPage('task');
    setSelectedTask(task);
    setMethod('edit');
  }

  const onSubmitting = (task) => {
    const updatedMockList = {
      name: selectedList.name,
      tasks: selectedList.tasks.map((item) => {
        if (item.id === task.id) {
          return task;
        } else {
          return item;
        }
      })
    };
    if (method === 'add') {
      task.id = Math.floor(Math.random() * 100)
      updatedMockList.tasks = [...updatedMockList.tasks, task]
    }
    setSelectedList(updatedMockList);
    setPage('listDetails');
  }

  const onListChangeHandler = (addedList) => {
    setListData((prevState) => [...prevState, addedList])
  }

  const onViewTasks = (list) => {
    // console.log('view task clicked' , list);
    setPage('listDetails');
    setSelectedList(list);
  }

  const backButtonHandler = () => {
    if (page === 'listDetails') setPage('list');
    else if (page === 'task') setPage('listDetails');
  }

  const onAddNewTask = () => {
    setPage('task');
    setSelectedTask({});
    setMethod('add');
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/lists' element={ <List listData={listData} onListChangeHandler={onListChangeHandler} onViewTasks={onViewTasks} />}></Route>
          <Route path='/list/:listId' element={<ListDetails selectedList={selectedList} onEditTask={onEditTask} onClickBack={backButtonHandler} onAddNewTask={onAddNewTask} />}></Route>
          <Route path='/task/:taskId' element={<Task selectedTask={selectedTask} onSave={onSubmitting} onClickBack={backButtonHandler} />}></Route>
          <Route path='*' element={<div>404!Error. Page not found</div>}></Route>
        </Routes>
      </BrowserRouter>
      {/* {
        (page === 'listDetails') ? (
          <ListDetails selectedList={selectedList} onEditTask={onEditTask} onClickBack={backButtonHandler} onAddNewTask={onAddNewTask} />
        ) : (page === 'task') ? (
          <Task selectedTask={selectedTask} onSave={onSubmitting} onClickBack={backButtonHandler} />
        ) : <List listData={listData} onListChangeHandler={onListChangeHandler} onViewTasks={onViewTasks} />
      } */}
    </div>)
}

export default App;
