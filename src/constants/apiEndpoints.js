export const BACKEND_URL = 'http://localhost:4000/lists';

export const GET_LIST_ENDPOINT = {
  method: 'get',
  url: '/',
};

export const getTasksOfListEndpoint = (listId) => ({
  method: 'get',
  url: `/${listId}`,
});

export const createListEndpoint = {
  method: 'post',
  url: '/create',
};

export const editListEndpoint = (listId) => ({
  method: 'patch',
  url: `/${listId}/edit`,
});

export const editTaskEndpoint = (listId, taskId) => ({
  method: 'put',
  url: `/${listId}/tasks/${taskId}/edit`,
});

export const createTaskEndpoint = (listId) => ({
  method: 'post',
  url: `/${listId}/tasks/create`,
});
