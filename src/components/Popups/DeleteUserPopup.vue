<template>
  <div class="popup">
    <div class="content">
      <h1>هل حقا تريد حذف المستخدم ؟ </h1>
      <i class="pi pi-exclamation-triangle"></i>
      <div class="buttons">
        <button @click="$emit('handleDeleteUser')">نعم</button>
        <button @click="$emit('handleShowDeleteUserPopup')">رجوع</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineEmits(['handleDeleteUser' , 'handleShowDeleteUserPopup'])

</script>
