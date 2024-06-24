<template>
    <a-table :dataSource="formattedLeads" :columns="columns" rowKey="id" :expandedRowRender="expandedRowRender">
      <template #userIcon="{ text }">
        <span>
          <svg focusable="false" class="" data-icon="user" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896">
            <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
          </svg>
          {{text}}
        </span>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';


export default defineComponent({
  name: 'LeadList',
  setup() {
    const store = useStore();
    const leads = computed(() => store.getters.leads);
    const contacts = computed(() => store.getters.contacts);
    const pipelines = computed(() => store.getters.pipelines);
    const users = computed(() => store.getters.users);

    const formattedLeads = computed(() => {
      return leads.value.map((lead: any) => {
        const pipeline = pipelines.value.map((pipel: any) => pipel._embedded.statuses.find((statuses: any) => statuses.id === lead.status_id))[0];
        const user = users.value.find((u: any) => u.id === lead.responsible_user_id);
        const contact = lead._embedded.companies.map((contact: any) => {
          const foundContact = contacts.value.find((c: any) => c._embedded.companies[0] ? c._embedded.companies[0].id === contact.id : undefined);
          return foundContact && foundContact.name ;
        }).join(', ');

        const createdAt = new Date(lead.created_at * 1000);
        const formattedCreatedAt = createdAt.toISOString().slice(0, 19).replace('T', ' ');

        return {
          ...lead,
          status: pipeline ? pipeline.name : 'Неизвестно',
          responsible_user: user ? user.name : 'Неизвестно',
          created_at: formattedCreatedAt,
          contact: contact 
        };
      });
    });

    const expandedRowRender = (record: any) => {
      
    return ` ${record.record.contact ? record.record.contact :  'Без контакта'}`;
    };

    onMounted(() => {
      store.dispatch('fetchLeads');
      store.dispatch('fetchPipelines');
      store.dispatch('fetchUsers');
      store.dispatch('fetchContacts');
    });

    return {
      formattedLeads,
      expandedRowRender,
      columns: [
        { title: 'Название', dataIndex: 'name', key: 'name' },
        { title: 'Бюджет', dataIndex: 'price', key: 'price' },
        { title: 'Статус', dataIndex: 'status', key: 'status' },
        { 
          title: 'Ответственный', 
          dataIndex: 'responsible_user', 
          key: 'responsible_user',
          slots: { customRender: 'userIcon' } 
        },
        { title: 'Дата создания', dataIndex: 'created_at', key: 'created_at' },
      ],
    };
  },
});
</script>


<style scoped>
.ant-table-wrapper{
  margin: 0px auto;
  width: 80%;
}



</style>
