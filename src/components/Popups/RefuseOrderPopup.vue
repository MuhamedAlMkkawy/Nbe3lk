<template>
  <div class="popup">
    <div class="content">
      <h1>هل حقا تريد رفض الطلب ؟ </h1>
      <i class="pi pi-exclamation-triangle"></i>
      <div class="buttons">
        <button @click="handleRefuseOrder">نعم</button>
        <button @click="$emit('handleShowRefusePopUp')">رجوع</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  const emit = defineEmits(['handleProgressPopup' , 'handleShowRefusePopUp' , 'handleRefuseOrder' ])
  const handleRefuseOrder = () =>{
    emit('handleRefuseOrder')
  }
</script>

<style lang="scss" scoped>

</style>