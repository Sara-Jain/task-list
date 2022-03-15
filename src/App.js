import { useState } from 'react';
import ListDetails from './components/ListDetails/ListDetails';
import Task from './components/Task/Task';
import List from './components/List/List';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {LISTS} from './constants/list';
import { LISTS_ROUTE , TASKS_ROUTE } from './constants/routes';


function App() {
 
  const [listData, setListData] = useState(LISTS);
   return (
   <div>
      <BrowserRouter>
        <Routes>
          {/* get all lists */}
          <Route path={LISTS_ROUTE} element={ <List listData={listData} setListData={setListData} />}></Route>
          {/* get all tasks of a list */}
          <Route path={`${LISTS_ROUTE}/:listId`} element={<ListDetails listData={listData} />}></Route>
          {/* create a new task */}
          <Route path={`${LISTS_ROUTE}/:listId${TASKS_ROUTE}/create`} element={<Task listData={listData} setListData={setListData}   />}></Route>
           {/* edit a task */}
          <Route path={`${LISTS_ROUTE}/:listId${TASKS_ROUTE}/:taskId`} element={<Task listData={listData} setListData={setListData}  />}></Route>

          <Route path='*' element={<div>404!Error. Page not found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>)
}

export default App;
