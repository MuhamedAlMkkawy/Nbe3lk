<template>
  <div class="page-content">
    <h4>طلبات التسوية</h4>
    <SettlementsOrdersTable
      :Data = "resultGet?.data?.data?.filter(item => item.id === Number(route.query.id))[0]?.orders"
      :loading="loading"
    />
  </div>

</template>

<script setup>
  import { onMounted } from 'vue';
  import SettlementsOrdersTable from '../../../components/Tables/SettlementsOrdersTable.vue';
  import useApiMethods from '../../../mixins/ApiMethods';
  import { useRoute } from 'vue-router';
  
  const route = useRoute()
  
  const {
    getMethod,
    resultGet,
    loading
  } = useApiMethods()
  
  onMounted(()=>{
    getMethod(`/api/merchant/settlement-request?type=${route.query.type}&perPage=${100}` , true)
  })
</script>

<style lang="scss" scoped>

</style>