import { createStore } from 'vuex';
import { getLeads, getPipelines, getUsers, getContacts } from '@/api/leads';

export default createStore({
  state: {
    leads: [],
    pipelines: [],
    users: [],
    contacts: []
  },
  
  mutations: {
    setLeads(state, leads) {
      state.leads = leads;
    },
    getPipelines(state, pipelines) {
      state.pipelines = pipelines;
    },
    getUsers(state, users) {
      state.users = users;
    },
    getContacts(state, contacts) {
      state.contacts = contacts;
    },
    
  },
  actions: {
    async fetchLeads({ commit }, query) {
      try {
        const response = await getLeads(query);
        commit('setLeads', response.data._embedded.leads);
      } catch (error) {
        console.error(error);
        commit('setLeads', []);
      }
    },
    async fetchPipelines({ commit }) {
      try {
        const response = await getPipelines();
        commit('getPipelines', response.data._embedded.pipelines);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchUsers({ commit }) {
      try {
        const response = await getUsers();
        commit('getUsers', response.data._embedded.users);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchContacts({ commit }) {
      try {
        const response = await getContacts();
        commit('getContacts', response.data._embedded.contacts);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    leads: (state) => state.leads,
    pipelines: (state) => state.pipelines,
    users: (state) => state.users,
    contacts: (state) => state.contacts,
  },
});
