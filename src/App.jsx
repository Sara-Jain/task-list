/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListDetails from './components/ListDetails';
import Task from './components/Task';
import List from './components/List';
import Root from './components/Root';
import AddOrEditList from './components/AddOrEditList';
import LISTS from './constants/list';
import { LISTS_ROUTE, TASKS_ROUTE, ROOT_ROUTE } from './constants/routes';

function App() {
  const [listData, setListData] = useState(LISTS);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* root route */}
          <Route path={ROOT_ROUTE} element={<Root />} />
          {/* get all lists */}
          <Route path={LISTS_ROUTE} element={<List listData={listData} />} />
          {/* create a list */}
          <Route path={`${LISTS_ROUTE}/create`} element={<AddOrEditList listData={listData} setListData={setListData} />} />
          {/* edit a list */}
          <Route path={`${LISTS_ROUTE}/:listId/edit`} element={<AddOrEditList listData={listData} setListData={setListData} />} />
          {/* get all tasks of a list */}
          <Route path={`${LISTS_ROUTE}/:listId`} element={<ListDetails listData={listData} />} />
          {/* create a new task */}
          <Route path={`${LISTS_ROUTE}/:listId${TASKS_ROUTE}/create`} element={<Task listData={listData} setListData={setListData} />} />
          {/* edit a task */}
          <Route path={`${LISTS_ROUTE}/:listId${TASKS_ROUTE}/:taskId/edit`} element={<Task listData={listData} setListData={setListData} />} />

          <Route path="*" element={<div>404!Error. Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
