<template>
  <div class="finanicial-transiction-table">
    <template v-if="loading">
      <DataTable :value="[{}, {}, {}, {}, {}]" tableStyle="width:100%;overflow-x:scroll;" class="table centered-table">
        <Column v-for="i in 6" :key="i" :field="`skeleton-${i}`" header=" " :style="{ minWidth: '120px' }">
          <template #body>
            <Skeleton width="100%" height="1rem" />
          </template>
        </Column>
      </DataTable>
    </template>
    <template v-else>
      <DataTable :value="props?.transictionalData" tableStyle="width:100%;overflow-x:scroll;" class="table centered-table">
        <Column field="order_number" header="رقم الطلب" :style="{minWidth: '120px'}"></Column>
        <Column field="user_name" header="إسم العميل" :style="{minWidth: '120px'}"></Column>
        <Column field="provider_total" header="قيمة الحجز" :style="{minWidth: '120px'}"></Column>
        <Column field="app_commission" header="العموله" :style="{minWidth: '120px'}"></Column>
        <Column field="total" header="الإجمالي" :style="{minWidth: '120px'}"></Column>
        <Column>
          <template #body="slotProps">
            <RouterLink :to="props?.singlePageUrl + slotProps.data.id" class="image">
              <img src="../../assets/images/scale.png" alt="img" loading="lazy">
            </RouterLink>
          </template>
        </Column>
      </DataTable>
    </template>
  </div>
</template>

<script setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Skeleton from 'primevue/skeleton'


  const props = defineProps({
    transictionalData:{
      type :Object,
      default : null
    },
    loading:{
      type:Boolean,
      default:false
    },
    singlePageUrl:{
      type:String,
      default:null
    }
  })

</script>

