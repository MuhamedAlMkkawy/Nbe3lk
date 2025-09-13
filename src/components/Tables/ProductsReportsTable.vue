<template>
  <div>
  <!-- Loading State with Skeletons -->
  <template v-if="loading && resultGet?.key !== 'success' && data?.length === 0">
      <DataTable :value="[{}, {}, {}, {}, {}]" tableStyle="width:100%; overflow-x:scroll;" class="table centered-table products-table">
        <Column v-for="i in 7" :key="i" :field="`skeleton-${i}`" header=" " :style="{ minWidth: '120px' }">
          <template #body>
            <Skeleton width="100%" height="40px" />
          </template>
        </Column>
      </DataTable>
    </template>
    
    <DataTable
      v-else-if="!loading && data.length !== 0" 
      :value="data" 
      tableStyle="width:100%;overflow-x:scroll;" 
      class="table centered-table products-table reports-table">
      <Column field="id" header="رقم المنتج" :style="{minWidth: '120px'}"></Column>
      <Column field="name" header="اسم المنتج" :style="{minWidth: '120px'}"></Column>
      <Column field="image" header="الصوره" :style="{minWidth: '120px'}">
        <template #body="slotProps">
          <div class="image product-image">
            <img :src="slotProps.data.image" alt="img" loading="lazy">
          </div>
        </template>
      </Column>
      <Column field="created_at" header="تاريخ الإضافه" :style="{minWidth: '120px'}"></Column>
      <Column field="total_orders" header="مرات البيع" :style="{minWidth: '120px'}"></Column>
      <Column field="total_sales" header="الأرباح" :style="{minWidth: '120px'}"></Column>
      <Column field="avg_rate" header="التقييم" :style="{minWidth: '120px'}">
        <template #body="slotProps">
          <Rating v-model="slotProps.data.avg_rate" readonly :cancel="false" />
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <RouterLink :to="'/home/product/' + slotProps.data.id" class="image">
            <img src="../../assets/images/scale.png" alt="img" loading="lazy">
          </RouterLink>
        </template>
      </Column>
    </DataTable>

    <Empty v-else emptyText="تقارير"/>
  </div>
    <!------------------- to handle Prime Vue Toast Error ------------------>
  <Toast 
    ref="toast"
    position="bottom-right"
  />
</template>

<script setup>
  import { ref, watchEffect, onMounted } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Rating from 'primevue/rating';
  import Skeleton from 'primevue/skeleton';
  import useApiMethods from '../../mixins/ApiMethods';
  import Empty from '../Empty.vue';
  import Toast from 'primevue/toast';
  // To handle data fetched
  const data = ref([]);

  // Import methods from API Methods
  const { getMethod, resultGet , loading , toast } = useApiMethods();

  // Define Props
  const props = defineProps({
    filterReports: {
      type: String,
      required: false,
      default: ''
    }
  });

  // To handle filter Table
  const handleFetchData = () => {
    if (!props.filterReports) {
      data.value = resultGet.value?.data || [];
    } else {
      data.value = resultGet.value?.data.filter(item => 
        item.name.startsWith(props.filterReports)
      );
    }
  };

  // Watch for changes in resultGet or filterReports and update data
  watchEffect(() => {
    handleFetchData();
  });

  onMounted(() => {
    getMethod('/api/merchant/products-reports', true)
  });
</script>

<style lang="scss" scoped>
.p-rating.p-readonly {
  gap: 0;
  margin-bottom: 0;
}
svg.p-icon.p-rating-icon {
  width: 18px !important;
}
.skeleton-table {
  display: flex;
  flex-direction: column;
}
.skeleton-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.skeleton-cell {
  margin-right: 10px;
}
</style>
