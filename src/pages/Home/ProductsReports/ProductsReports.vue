<template>
  <div class="page-content">
    <div class="upper-bar">
      <h4>تقارير المنتجات</h4>
      <div class="bar">
        <div class="input">
          <input 
            type="text" 
            v-model="filterReports" 
            placeholder="إبحث عن منتج معين"
          >
          <i class="pi pi-search"></i>
        </div>
      </div>
    </div>
    <ProductsReportsTable 
      :filterReports="filterReports"
    />
  </div>

</template>

<script setup>
  import {ref} from 'vue'
  import ProductsReportsTable from '../../../components/Tables/ProductsReportsTable.vue'

  
  const filterReports = ref(null)

  // const showAddProductOptions = ref(false);
  // const handleShowAddProductOptions = () =>{
  //   showAddProductOptions.value= !showAddProductOptions.value
  // }
</script>

<style lang="scss" scoped>

</style>