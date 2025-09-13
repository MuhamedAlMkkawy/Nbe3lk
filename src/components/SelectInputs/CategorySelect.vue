<template>
  <div class="input-wrap">
    <label for="category">القسم الفرعي</label>
    <div class="input">
      <select id="category" v-model="selectedCategory" @change="emit('handleCategory', $event.target.value)">
        <option value="0">أختر القسم الفرعي</option>
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

  const props = defineProps({
    category: {
      type: Number,
      default: 0
    }
  });

  // Define Emits
  const emit = defineEmits(['handleCategory']);

  // Local state for selected category
  const selectedCategory = ref(props.category);

  // Watch for changes in the prop and update local state
  watch(() => props.category, (newVal) => {
    selectedCategory.value = newVal;
  });

  // Fetch categories on mount
  onMounted(() => {
    getMethod('/api/merchant/categories', true);
  });
</script>
