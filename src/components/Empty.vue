<template>
  <div class="empty">
    <i class="pi pi-box"></i>
    <h3>لايوجد {{props.emptyText}} حتي الآن</h3>
  </div>
</template>

<script setup>
  const props = defineProps(['emptyText'])
</script>

<style lang="scss" scoped>

</style>