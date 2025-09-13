<template>
  <div class="page-content">
    <h4>المنتجات متعددة السمات</h4>
    <MultiThemeVariantsTable 
      :ordersID="route.params.id"
    />
  </div>
</template>

<script setup>
import MultiThemeVariantsTable from '../../../../components/Tables/MultiThemeVariantsTable.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<style lang="scss" scoped>

</style>