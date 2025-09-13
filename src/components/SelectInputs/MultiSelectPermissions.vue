<!-- MultiSelectExample.vue -->
<template>
  <div class="multiselect-demo">
    <MultiSelect 
      v-model="selectedValids" 
      :options="resultGet?.data" 
      optionLabel="permission" 
      placeholder="الصلاحيات" 
    />
    <div class="selected-items" v-if="selectedValids !== null">
      <span class="selected-valid" v-for="valid in selectedValids" :key="valid.id">
        {{ valid.permission }}
        <i class="pi pi-times close-multiselect-icon" @click="deselectValid(valid)"></i>
      </span>
    </div>
    <h6 class="placeholder-text" v-else>إختر الصلاحيات</h6>
  </div>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  import MultiSelect from 'primevue/multiselect';
  import 'primevue/resources/themes/saga-blue/theme.css'; 
  import useApiMethods from '../../mixins/ApiMethods';

  const { getMethod, resultGet } = useApiMethods();

  // define Emits
  const emit = defineEmits(['handleValids']);

  // define Props
  const props = defineProps({
    chosenPermissions :{
      type:Object,
      default:()=> null
    }
  })

  
  // to handle selected valids
  const selectedValids = ref(props.chosenPermissions || null);

  // watch selected valids to emit changes
  watch(selectedValids, (newVal, oldVal) => {
    if (oldVal !== newVal) {
      emit('handleValids', selectedValids);
    }
  });

  // to handle deselect valids
  const deselectValid = (valid) => {
    selectedValids.value = selectedValids.value.filter(v => v.id !== valid.id);
  };

  // fetch data on mounted
  onMounted(() => {
    getMethod('/api/merchant/employees/permissions', true);
  });
</script>
