import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://amo-crm-api.onrender.com/api',
  headers: {
    'Content-type': 'application/json',
  },
});

export const getLeads = (query?: string) => {
  const params = query ? { query } : {};
  return apiClient.get('/leads', { params });
};
export const getPipelines = (query?: string) => {
  const params = query ? { query } : {};
  return apiClient.get('/pipelines', { params });
};
export const getUsers = (query?: string) => {
  const params = query ? { query } : {};
  return apiClient.get('/users', { params });
};
export const getContacts = (query?: string) => {
  const params = query ? { query } : {};
  return apiClient.get('/contacts', { params });
};