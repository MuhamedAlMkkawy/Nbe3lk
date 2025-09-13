<template>
  <h5>وصف المنتج بالعربية : <span>{{ props?.description_ar }}</span></h5>
  <h5>وصف المنتج بالانجليزيه : <span>{{ props?.description_en }}</span></h5>
</template>

<script setup>
  const props = defineProps({
    description_ar:{
      type:String,
      default : ''
    },
    description_en:{
      type:String,
      default : ''
    },
  })
</script>