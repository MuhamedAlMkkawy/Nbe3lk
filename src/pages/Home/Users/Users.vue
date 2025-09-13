<template>
<div class="page-content">
  <div class="upper-bar">
    <h4>جميع المستخدمين</h4>
    <div class="bar">
      <RouterLink to="/home/add-user">
        <button>
          <i class="pi pi-plus"></i>
          <span>إضافه مستخدم</span>
        </button>
      </RouterLink>
      <div class="input">
        <input 
          type="text" 
          placeholder="إبحث عن مستخدم معين"
          v-model="filterUsers"
        >
        <i class="pi pi-search"></i>
      </div>
    </div>
  </div>
  <UsersTable 
    :filterUsers="filterUsers"
  />

</div>
</template>

<script setup>
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import UsersTable from '../../../components/Tables/UsersTable.vue';

  // to handle filter Users------------------------------------------
  const filterUsers = ref('')

</script>

<style lang="scss" scoped>
.bar{
  align-items: center;
}
</style>