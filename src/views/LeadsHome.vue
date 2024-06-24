<template>
  <div>
    <a-input-search
      placeholder="Поиск сделок"
      enterButton="Search"
      @search="onSearch"
      style="margin-bottom: 20px;"
    />
    <LeadList />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import LeadList from '@/components/LeadList.vue';

export default defineComponent({
  name: 'LeadsHome',
  components: {
    LeadList,
  },
  setup() {
    const store = useStore();

    const onSearch = (query: string) => {
      store.dispatch('fetchLeads', query);
    };

    onMounted(() => {
      store.dispatch('fetchLeads');
      store.dispatch('fetchPipelines');
      store.dispatch('fetchUsers');
      store.dispatch('fetchContacts');
    });

    return {
      onSearch,
    };
  },
});
</script>


<style scoped>
.ant-input-group-wrapper {
  display: block;
  margin: 0px auto;
  width: 80%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

</style>