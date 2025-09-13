<template>
  <div>
    <DataTable 
      :value="!loading && resultGet?.data" 
      tableStyle="width:100%;overflow-x:scroll;" 
      class="table centered-table"
      v-if="!loading && resultGet?.data?.length !== 0"
    >
      <Column field="id" header="رقم الطلب" :style="{minWidth: '120px'}"></Column>
      <Column field="available_quantity" header="العدد المتوفر" :style="{minWidth: '120px'}"></Column>
      
      <!-- Render unique feature headers -->
      <template v-if="resultGet?.data.length">
        <template v-for="(feature, index) in uniqueFeatures" :key="index">
          <Column :header="feature" :style="{minWidth: '120px'}">
            <template #body="slotProps">
              <span>{{ getFeatureOption(slotProps.data.features, feature) }}</span>
            </template>
          </Column>
        </template>
      </template>
      <template v-if="category === 'rent'">
        <Column field="insurance_amount" header="سعر التأمين" :style="{minWidth: '120px'}"></Column>
      </template>
      <Column field="price" header="الإجمالي" :style="{minWidth: '120px'}"></Column>
      <Column header="هل يوجد طلب جاري ؟" :style="{minWidth: '120px'}">
        <template #body="slotProps">
          {{ slotProps.data.has_running_order ? 'يوجد' : 'لايوجد' }}
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <RouterLink :to="'/home/edit-variants/' + props.ordersID + '?variantID=' + slotProps.data.id" class="image">
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

    <Empty v-else-if="resultGet?.data?.length === 0" empty-text="سمات للمنتج" />
  </div>
</template>

<script setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Skeleton from 'primevue/skeleton';
  import Empty from '../Empty.vue';
  import useApiMethods from '../../mixins/ApiMethods';
  import { onMounted, computed } from 'vue';  
  import { useRoute } from 'vue-router';

  const {
    getMethod,
    resultGet,
    loading
  } = useApiMethods();

  const route = useRoute();

  const category = window.sessionStorage.getItem('category_type')

  const props = defineProps({
    ordersID: {
      type: String,
      default: ''
    }
  });

  // Extract unique feature headers from the data
  const uniqueFeatures = computed(() => {
    if (!resultGet?.value?.data) return [];
    const featuresSet = new Set();
    resultGet?.value.data.forEach(variant => {
      variant.features.forEach(feature => {
        featuresSet.add(feature.feature);
      });
    });
    return Array.from(featuresSet);
  });

  // Get feature option based on feature name
  const getFeatureOption = (features, featureName) => {
    const feature = features.find(f => f.feature === featureName);
    return feature ? feature.option : '';
  };

  onMounted(() => {
    getMethod(`/api/merchant/products/${route.params.id}/variants`, true);
  });
</script>
