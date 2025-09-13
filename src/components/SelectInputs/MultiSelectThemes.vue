<!-- MultiSelectExample.vue -->
<template>
  <div class="multiselect-demo">
    <MultiSelect 
      v-model="selectedThemes" 
      :options="resultGet?.data" 
      optionLabel="feature" 
      placeholder="السمات" 
    />
    <div class="selected-items" v-if="selectedThemes !== null">
      <span class="selected-valid" v-for="valid in selectedThemes" :key="valid.id">
        {{ valid.feature }}
        <i class="pi pi-times close-multiselect-icon" @click="deselectTheme(valid)"></i>
      </span>
    </div>
    <h6 class="placeholder-text" v-else>إختر السمات</h6>
  </div>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  import MultiSelect from 'primevue/multiselect';
  import 'primevue/resources/themes/saga-blue/theme.css'; 
  import useApiMethods from '../../mixins/ApiMethods';

  const { 
    getMethod, 
    resultGet 
  } = useApiMethods();

  // define Emits
  const emit = defineEmits(['handleThemes']);


  
  // to handle selected themes
  const selectedThemes = ref(null);

  // watch selected valids to emit changes
  watch(selectedThemes, (newVal, oldVal) => {
    if (oldVal !== newVal) {
      emit('handleThemes', selectedThemes);
    }
  });

  // to handle deselect valids
  const deselectTheme = (valid) => {
    selectedThemes.value = selectedThemes.value.filter(v => v.id !== valid.id);
  };

  const productCategory = Number(window.sessionStorage.getItem('category_id'))

  // fetch data on mounted
  onMounted(() => {
    getMethod(`/api/merchant/features?searchArray[category_id]=${productCategory}`, true);
  });
</script>
