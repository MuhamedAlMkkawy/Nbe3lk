<template>
  <div class="popup">
    <div class="content">
      <h1>هل حقا تريد حذف الحساب ؟</h1>
      <i class="pi pi-exclamation-triangle"></i>
      <div class="buttons">
        <button @click="$emit('handleDeleteAccount')">نعم</button>
        <button @click="$emit('handleShowDeleteAccountPopup')">رجوع</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineEmits(['handleShowDeleteAccountPopup' , 'handleDeleteAccount'])
</script>

<style lang="scss" scoped>

</style>