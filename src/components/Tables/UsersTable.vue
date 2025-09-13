<template>
  <div>
    <!-- Loading Skeleton Table -->
    <DataTable v-if="loading && users.length === 0"  :value="[{}, {}, {}, {}, {}]" tableStyle="width:100%;overflow-x:scroll;" class="table centered-table statistics-table">
      <Column v-for="i in 3" :key="i" :field="`skeleton-${i}`" header=" " :style="{ minWidth: '120px' }">
        <template #body>
          <Skeleton width="100%" height="1rem" />
        </template>
      </Column>
    </DataTable>
    <DataTable 
      v-else-if="!loading && users.length !== 0" 
      :value="users" 
      tableStyle="width:100%;overflow-x:scroll;" 
      class="table centered-table users-table">
      <Column field="name" header="إسم المستخدم" :style="{minWidth: '120px'}"></Column>
      <Column field="permissions" header="الصلاحيات" :style="{minWidth: '120px'}">
        <template #body="slotProps">
          <span v-for="item in slotProps?.data?.permissions" class="permission-item" :key="item.id">
            {{ item.permission }} 
          </span>
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <div class="buttons">
            <button class="edit">
              <RouterLink :to="`/home/edit-user/${slotProps.data.id}`">
                <i class="pi pi-pen-to-square"></i>
              </RouterLink>
            </button>
            <button class="delete" @click="handleShowDeleteUserPopup(slotProps.data.id)">
              <i class="pi pi-trash"></i>
            </button>
          </div>
        </template>
      </Column>
    </DataTable>
    <!-- to handle empty users table -->
    <Empty v-else emptyText="مستخدمين"/>
  </div>

  <!-- ------------------ Show Delete User Popup ----------------------- -->
  <DeleteUserPopup
    v-if="showDeleteUserPopup"
    @handleDeleteUser="handleDeleteUser"
    @handleShowDeleteUserPopup="handleShowDeleteUserPopup"
  />
  
  <!--------------------------------- Progress Popup ----------------------------------->
  <ProgressPopup
    v-if="showProgressPopup"
    :progressText="progressText"
  />
  <!-------------------------- to handle Prime Vue Toast Error -------------------------->
  <Toast 
    ref="toast"
    position="bottom-right"
  />
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DeleteUserPopup from '../Popups/DeleteUserPopup.vue';
import useApiMethods from '../../mixins/ApiMethods';
import Skeleton from 'primevue/skeleton';
import ProgressPopup from '../Popups/ProgressPopup.vue'
import Toast from 'primevue/toast';
import Empty from '../Empty.vue';



// to handle fetched data
const users = ref([]);

// to handle used methods from api methods file
const { 
  getMethod, 
  resultGet, 
  toast, 
  loading , 
  deleteMethod,
  showProgressPopup, 
  progressText, 
} = useApiMethods();

// to define Emits
defineEmits(['handleProgressPopup']);

// to define Props
const props = defineProps({
  filterUsers: {
    type: String,
    default: '',
    required: false
  }
});


// To handle filter Table
const handleFetchData = () => {
  if (!props.filterUsers) {
    users.value = resultGet.value?.data || [];
  } else {
    users.value = resultGet.value?.data.filter(item =>
      item.name.startsWith(props.filterUsers)
    );
  }
};

// Watch for changes in resultGet or filterUsers and update data
watchEffect(() => {
  handleFetchData();
});

// handle delete user popup -------------------------------------------------
const showDeleteUserPopup = ref(false);
const selectedUser = ref(null);

const handleShowDeleteUserPopup = (user) => {
  selectedUser.value = user;
  showDeleteUserPopup.value = !showDeleteUserPopup.value;
};

// to handle delete user
const handleDeleteUser = () => {
  deleteMethod(`/api/merchant/employees/${selectedUser.value}` , true , 'progress' , '/api/merchant/employees')
  handleShowDeleteUserPopup();
};

onMounted(() => {
  getMethod('/api/merchant/employees', true);
});
</script>

<style lang="scss" scoped>
.permission-item{
  &:not(:last-of-type){
    position: relative;
    &::after{
      content: '-';
      margin-inline: 5px;
    }
  }
}
.buttons {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: flex-end;
  button {
    width: 35px;
    height: 35px;
    border-radius: 8px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.6s;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:first-of-type {
      background: #3368b1;
      &:hover {
        color: #3368b1;
        border: 1px solid #3368b1;
        background: #fff;
      }
    }
    &:last-of-type {
      background: #db3740;
      &:hover {
        color: #db3740;
        border: 1px solid #db3740;
        background: #fff;
      }
    }
  }
}
</style>
