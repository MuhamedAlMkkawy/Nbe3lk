<template>
  <div class="popup">
    <div class="content">
      <h1>هل حقا تريد حذف الإشعار ؟ </h1>
      <i class="pi pi-exclamation-triangle"></i>
      <div class="buttons">
        <button @click="$emit('handleConfirmDeleteNotification')">نعم</button>
        <button @click="$emit('handleShowDeleteNotification')">رجوع</button>
      </div>
    </div>
  </div>
  <!-- {{ console.log(props.notificationId) }} -->
</template>

<script setup>
import { defineEmits } from 'vue';

// Define the emits
const emit = defineEmits(['handleProgressPopup', 'handleShowDeleteNotification' ,'handleConfirmDeleteNotification']);

</script>
