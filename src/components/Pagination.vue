<template>
  <div class="pagination" v-if="props.data && props.data?.total_pages !== 1">
    <div class="card">
      <Paginator 
        :rows="Number(props.data.per_page)" 
        :totalRecords="props.data.total_items"
        :page="Number(props.data.current_page)"
        @page="onPageChange"
      />
    </div>
  </div>
</template>

<script setup>
  import Paginator from 'primevue/paginator';

  // Define emits
  const emit = defineEmits(['handlePagination']);

  // Define props
  const props = defineProps({
    data: {
      type: Object,
      default: () => null,
    }
  });

  // Handle changes in page number of pagination
  const onPageChange = (event) => {
    emit('handlePagination', event.page + 1);
  };
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: clamp(14px, 4vw, 18px);
    color: #434343;
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5px;

    li {
      border: 1px solid #B26FAC;
      padding: 2px 8px;
      color: #B26FAC;
      font-size: 16px;
      cursor: pointer;
      transition: 0.3s;

      &:hover,
      &.active {
        background: #B26FAC;
        color: #fff;
      }
    }
  }
}
</style>
