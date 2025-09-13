<template>
  <div class="input-wrap">
    <label for="classification">التصنيف</label>
    <div class="input">
      <select id="classification" v-model="selectedClassification" @change="emit('handleClassification', $event.target.value)">
        <option value="0">أختر التصنيف</option>
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
  const emit = defineEmits(['handleClassification']);

  // Define Props
  const props = defineProps({
    classification: {
      type: Number,
      default: 0
    }
  });

  // Local state for selected classification
  const selectedClassification = ref(props.classification);

  // Watch for changes in the prop and update local state
  watch(() => props.classification, (newVal) => {
    selectedClassification.value = newVal;
  });

  // Fetch classifications on mount
  onMounted(() => {
    getMethod('/api/merchant/classifications', true);
  });
</script>

