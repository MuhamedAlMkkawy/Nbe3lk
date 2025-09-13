<template>
  <div class="popup">
    <div class="content">
      <h1>هل حقا تريد حذف المنتج ؟</h1>
      <i class="pi pi-exclamation-triangle"></i>
      <div class="buttons">
        <button @click="$emit('handleDeleteProduct')">نعم</button>
        <button @click="$emit('handleShowDeleteProductPopup')">رجوع</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineEmits(['handleShowDeleteProductPopup' , 'handleDeleteProduct'])
</script>

<style lang="scss" scoped>

</style>