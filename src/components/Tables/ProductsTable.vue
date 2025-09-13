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

    <!-- Data Table -->
    <template v-else-if="!loading && resultGet?.key === 'success' && data?.length !== 0">
      <DataTable 
        :value="data" 
        tableStyle="width:100%; overflow-x:scroll;" 
        class="table centered-table products-table"
      >
        <Column field="id" header="رقم المنتج" :style="{ minWidth: '120px' }"></Column>
        <Column field="name" header="اسم المنتج" :style="{ minWidth: '120px' }"></Column>
        <Column field="image" header="الفيديو / الصوره" :style="{ minWidth: '120px' }">
          <template #body="slotProps">
            <div class="image product-image">
              <template v-if="isVideo(slotProps.data?.image?.image)">
                <video  :src="slotProps.data.image.image" autoplay loop muted loading="lazy"></video>
              </template>
              <template v-else>
                <img :src="slotProps.data.image.image || slotProps.data.image" alt="img" loading="lazy" />
              </template>
            </div>
          </template>
        </Column>
        <Column field="type" header="السمة" :style="{ minWidth: '120px' }"></Column>
        <Column field="price" header="السعر" :style="{ minWidth: '120px' }"></Column>
        <Column field="classification" header="القسم" :style="{ minWidth: '120px' }"></Column>
        <Column field="is_available" header="الحاله" :style="{ minWidth: '120px' }">
          <template #body="slotProps">
            <span :style="getStatusStyle(Boolean(slotProps.data?.is_available))">
              {{ slotProps.data?.is_available ? 'متوفر' : 'غير متوفر' }}
            </span>
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <RouterLink :to="'/home/product/' + slotProps.data.id" class="image">
              <img src="../../assets/images/scale.png" alt="img" loading="lazy" />
            </RouterLink>
          </template>
        </Column>
      </DataTable>

      <!-- Pagination -->
      <Pagination 
        :data="resultGet?.data.pagination" 
        @handlePagination="handlePaginationData"
      />
    </template>

    <!-- Empty State -->
    <Empty v-else emptyText="منتجات" />

    <!-- Toast for notifications -->
    <Toast ref="toast" position="bottom-right" />
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';
import Empty from '../Empty.vue';
import Toast from 'primevue/toast';
import Pagination from '../Pagination.vue';
import useApiMethods from '../../mixins/ApiMethods';
import usePagination from '../../mixins/Pagination';

// To handle fetched data
const data = ref([]);

// Import methods from API Methods and Pagination mixins
const { getMethod, loading, toast } = useApiMethods();
const { handlePagination, resultGet } = usePagination();

// Define Props
const props = defineProps({
  filterProducts: {
    type: String,
    required: false,
    default: ''
  }
});

// Handle data fetching with or without filtering
const handleFetchData = () => {
  const allData = resultGet.value?.data?.data || [];
  data.value = props.filterProducts
    ? allData.filter(item => item.name.startsWith(props.filterProducts))
    : allData;
};

// Watch for changes in resultGet or filterProducts and update data
watchEffect(() => {
  handleFetchData();
});

// Handle pagination
const handlePaginationData = (pageNum) => {
  handlePagination('/api/merchant/products?page=', pageNum);
};

// Fetch initial data on mount
onMounted(() => {
  handlePagination('/api/merchant/products?page=', 1);
});

// Define a method for getting the status style
const getStatusStyle = (status) => ({
  minWidth: '120px',
  color: status ? '#293E79' : '#DB3740',
  fontWeight: '500'
});

// Utility method to check if the source is a video
const isVideo = (source) => {
  return source && (source.endsWith('.mp4') || source.endsWith('.webm') || source.endsWith('.ogg'));
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
