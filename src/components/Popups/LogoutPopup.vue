<template>
  <div class="popup">
    <div class="content">
      <h1>هل حقا تريد تسجيل الخروج ؟ </h1>
      <i class="pi pi-exclamation-triangle"></i>
      <div class="buttons">
        <button @click="$emit('handleLogOut')" class="logout">نعم</button>
        <button @click="$emit('handleShowLogoutPopUp')" class="hidePopup">رجوع</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineEmits(['handleShowLogoutPopUp', 'handleLogOut']);
</script>

<style lang="scss" scoped>

</style>