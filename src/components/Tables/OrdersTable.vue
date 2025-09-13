<template>
  <div>
    <template v-if="loading && resultGet?.key !== 'success' && resultGet?.data?.data?.length === 0">
      <DataTable :value="[{}, {}, {}, {}, {}]" tableStyle="width:100%;overflow-x:scroll;" class="table centered-table statistics-table">
        <Column v-for="i in 7" :key="i" :field="`skeleton-${i}`" header=" " :style="{ minWidth: '120px' }">
          <template #body>
            <Skeleton width="100%" height="1rem" />
          </template>
        </Column>
      </DataTable>
    </template>
    <template v-else-if="!loading && resultGet?.key === 'success' && resultGet?.data?.data?.length !== 0">
      <DataTable 
        :value="resultGet?.data.data" 
        tableStyle="width:100%;overflow-x:scroll;" 
        class="table centered-table statistics-table">
        <Column field="order_num" header="رقم الطلب" :style="{ minWidth: '120px' }"></Column>
        <Column field="creation_date" header="تاريخ الطلب" :style="{ minWidth: '120px' }"></Column>
        <Column field="order_type" header="القسم الرئيسي" :style="{ minWidth: '120px' }"></Column>
        <Column field="payment_method" header="طريقة الدفع" :style="{ minWidth: '120px' }"></Column>
        <Column field="status" header="حالة الطلب" :style="{ minWidth: '120px' }"></Column>
        <Column field="app_commission" header="نسبة الإدارة" :style="{ minWidth: '120px' }"></Column>
        <Column field="user" header="إسم العميل" :style="{ minWidth: '120px' }"></Column>
        <Column>
          <template #body="slotProps">
            <RouterLink :to="'/home/orders-details/' + slotProps.data.id" class="image">
              <img src="../../assets/images/scale.png" alt="img" loading="lazy">
            </RouterLink>
          </template>
        </Column>
      </DataTable>
      <!----------------------------- to handle pagination ----------------------------->
      <Pagination 
        :data="resultGet?.data.pagination" 
        @handlePagination="handlePaginationData"
      />
    </template>
    <!----------------------------- to handle Empty Content ----------------------------->
    <Empty 
      v-else
      emptyText="طلبات"
    />
  </div>
  
  <!-------------------------- to handle Prime Vue Toast Error -------------------------->
  <Toast 
    ref="toast"
    position="bottom-right"
  />
</template>

<script setup>
  import { ref , onMounted } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import { RouterLink } from 'vue-router';
  import Skeleton from 'primevue/skeleton';
  import useApiMethods from '../../mixins/ApiMethods';
  import Pagination from '../Pagination.vue';
  import usePagination from '../../mixins/Pagination';
  import Toast from 'primevue/toast';
  import Empty from '../Empty.vue';


  // To handle Api Methods.
  const { toast } = useApiMethods();


  // to import pagination from its mixin
  const { 
    handlePagination , 
    handleFilteredPagination, 
    resultGet , 
    loading
  } = usePagination()


  // to handle changes with pagination page and data fetched
  const activeSecTab = window.sessionStorage.getItem('activeSecTab');
  const handlePaginationData = (pageNum)=>{
    handleFilteredPagination('/api/merchant/orders?page=' , pageNum , activeSecTab)
  }
  
  onMounted(() => {
    handlePaginationData(1)
    // handlePagination('/api/merchant/orders?page=' , 1)
  });
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
}
.table {
  overflow-x: auto;
}
</style>
