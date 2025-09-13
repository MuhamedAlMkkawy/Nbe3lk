<template>
  <div class="finished-settlement-table">
    <DataTable 
        v-if="!props?.loading" 
        :value="props?.Data" 
        tableStyle="width:100%;overflow-x:scroll;" 
        class="table centered-table"
      >
      <Column field="id" header="رقم الطلب" :style="{minWidth: '120px'}"></Column>
      <Column field="total" header="إجمالي الطلبات" :style="{minWidth: '120px'}"></Column>
      <Column field="app_commission" header="إجمالي العموله" :style="{minWidth: '120px'}"></Column>
      <Column field="creation_date" header="تاريخ الإنشاء" :style="{minWidth: '120px'}"></Column>
      <Column field="user_name" header="إسم المستخدم" :style="{minWidth: '120px'}"></Column>
      <Column field="provider_total" header="المستحق" :style="{minWidth: '120px'}"></Column>
      <Column>
        <template #body="slotProps">
          <RouterLink :to="'/home/orders-details/' + slotProps.data.id" class="image">
            <img src="../../assets/images/scale.png" alt="img" loading="lazy">
          </RouterLink>
        </template>
      </Column>
    </DataTable>
    <!-- Loading Skeleton Table -->
    <DataTable v-else-if="props.loading" :value="[{}, {}, {}, {}, {}]" tableStyle="width:100%;overflow-x:scroll;" class="table centered-table statistics-table">
      <Column v-for="i in 7" :key="i" :field="`skeleton-${i}`" header=" " :style="{ minWidth: '120px' }">
        <template #body>
          <Skeleton width="100%" height="1rem" />
        </template>
      </Column>
    </DataTable>
    <Empty v-else-if="props?.Data.length === 0" empty-text="طلبات لـ التسوية" />
  </div>
</template>

<script setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Skeleton from 'primevue/skeleton';
  import Empty from '../Empty.vue';


  const props = defineProps({
    Data:{
      type:Object,
      default:null
    },
    loading:{
      type:Boolean,
      default:false
    }
  })


</script>
