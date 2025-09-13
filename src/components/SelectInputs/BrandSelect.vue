<template>
  <div class="input-wrap">
    <label for="brand">الماركة</label>
    <div class="input">
      <select id="brand" v-model="selectedBrand" @change="emit('handleBrand', $event.target.value)">
        <option value="0">أختر الماركة</option>
        <option v-for="(item, index) in resultGet?.data" :key="index" :value="index">{{ item }}</option>
      </select>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted } from 'vue';
  import useApiMethods from '../../mixins/ApiMethods';

  const {
    getMethod,
    resultGet
  } = useApiMethods();

  // Define Emits
  const emit = defineEmits(['handleBrand']);

  // Define Props
  const props = defineProps({
    brand: {
      type: Number,
      default: 0
    }
  });

  // Local state for selected brand
  const selectedBrand = ref(props.brand);

  // Watch for changes in the prop and update local state
  watch(() => props.brand, (newVal) => {
    selectedBrand.value = newVal;
  });

  // Fetch brands on mount
  onMounted(() => {
    getMethod('/api/merchant/brands', true);
  });
</script>

