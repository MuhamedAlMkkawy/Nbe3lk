<template>
  <div class="finished-settlement-table">
    <DataTable 
        v-if="!loading && resultGet?.data?.data.length !== 0" 
        :value="resultGet?.data?.data" 
        tableStyle="width:100%;overflow-x:scroll;" 
        class="table centered-table"
      >
      <Column field="id" header="رقم الطلب" :style="{minWidth: '120px'}"></Column>
      <Column field="total" header="إجمالي الطلبات" :style="{minWidth: '120px'}"></Column>
      <Column field="app_commission" header="إجمالي العموله" :style="{minWidth: '120px'}"></Column>
      <Column field="tax" header="إجمالي القيمه المضافه" :style="{minWidth: '120px'}"></Column>
      <Column field="provider_total" header="المستحق" :style="{minWidth: '120px'}"></Column>
      <Column header="حالة الطلب">
        <template #body="slotProps">
          <span :style="getStatusStyle(slotProps.data.status)">
            {{ slotProps.data.status }}
          </span>
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <RouterLink :to="'/home/settlement-orders?type=finished&id=' + slotProps.data.id" class="image">
            <img src="../../assets/images/scale.png" alt="img" loading="lazy">
          </RouterLink>
        </template>
      </Column>
    </DataTable>
    <!-- Loading Skeleton Table -->
    <DataTable v-else-if="loading" :value="[{}, {}, {}, {}, {}]" tableStyle="width:100%;overflow-x:scroll;" class="table centered-table statistics-table">
      <Column v-for="i in 7" :key="i" :field="`skeleton-${i}`" header=" " :style="{ minWidth: '120px' }">
        <template #body>
          <Skeleton width="100%" height="1rem" />
        </template>
      </Column>
    </DataTable>
    <Empty v-else-if="resultGet?.data?.data.length === 0" empty-text="طلبات منتهة التسوية" />
  </div>
  <!------------------------- to handle Pagination ------------------------->
  <Pagination
    :data="resultGet?.data?.pagination"
    @handlePagination="handlePaginationData"
  />
</template>

<script setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Pagination from '../Pagination.vue';
  import Skeleton from 'primevue/skeleton';
  import Empty from '../Empty.vue';
  import useApiMethods from '../../mixins/ApiMethods';
  import { onMounted } from 'vue';  

  const {
    getMethod,
    resultGet,
    loading
  } = useApiMethods()

  const getStatusStyle = (status) => {
    return {
      minWidth: '120px',
      color: status === 'مرفوض' ? '#DB3740' : '#293E79',
      fontWeight:'500'
    };
  };

  const handlePaginationData = (pageNum) =>{
    getMethod(`/api/merchant/settlement-request?type='finished&page=${pageNum}` , true)
  }

  onMounted(()=>{
    getMethod(`/api/merchant/settlement-request?type=finished&page=1` , true)
  })
</script>

