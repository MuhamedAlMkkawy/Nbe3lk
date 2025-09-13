<template>
  <div class="popup">
    <div class="content">
      <h1>هل حقا تريد حذف قيمة التوصيل ؟ </h1>
      <i class="pi pi-exclamation-triangle"></i>
      <div class="buttons">
        <button @click="$emit('handleDeleteDelivery' , 'تم حذف قيمة التوصيل بنجاح')">نعم</button>
        <button @click="$emit('handleshowDeleteDeliveryPopup')">رجوع</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name : 'DeleteDeliveryPopup',
    emits:['handleDeleteDelivery' , 'handleshowDeleteDeliveryPopup']
  }
</script>
