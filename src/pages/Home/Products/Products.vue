<template>
  <div class="page-content">
    <div class="upper-bar">
      <h4>جميع المنتجات</h4>
      <div class="bar">
        <button @click="handleShowAddProductOptions">
          <i class="pi pi-plus"></i>
          <span>إضافه منتج</span>
        </button>
        <ul v-if="showAddProductOptions">
          <li>
            <RouterLink 
              to="/home/add-simple-product/">
              بسيط
            </RouterLink>
          </li>
          <li>
            <RouterLink 
              to="/home/add-multi-theme-product/">
              متعدد السمات
            </RouterLink>
          </li>
        </ul>
        <div class="input">
          <input 
            type="text" 
            v-model="filterProducts" 
            placeholder="إبحث عن منتج معين"
          >
          <i class="pi pi-search"></i>
        </div>
      </div>
    </div>
    <ProductsTable 
      :filterProducts="filterProducts"
    />
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  import { RouterLink } from 'vue-router';
  import ProductsTable from '../../../components/Tables/ProductsTable.vue'

  // to handle filter products
  const filterProducts = ref(null)


  // to handle show add product options
  const showAddProductOptions = ref(false);
  const handleShowAddProductOptions = () =>{
    showAddProductOptions.value= !showAddProductOptions.value
  }
</script>

<style lang="scss" scoped>

</style>