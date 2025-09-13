<template>
  <h5>إرشادات الحفاظ علي المنتج بالعربيه : <span>{{ props?.product_protection_instruction_ar }}</span></h5>
  <h5>إرشادات الحفاظ علي المنتج بالانجليزيه : <span>{{ props?.product_protection_instruction_en }}</span></h5>
</template>

<script setup>
  const props = defineProps({
    product_protection_instruction_ar:{
      type:String,
      default : ''
    },
    product_protection_instruction_en:{
      type:String,
      default : ''
    },
  })
</script>
