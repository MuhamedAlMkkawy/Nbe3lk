<template>
  <div class="input-wrap" v-for="theme in props?.features" :key="theme.id">
    <label :for="theme.id">{{ theme.feature }}</label>
    <div class="input">
      <select 
        :id="theme.id" 
        :value="theme.option_id"
        @change="emit('handleSelectTheme', theme.id, Number($event.target.value))"
        :disabled="!props?.can_edit"
      >
        <option>أختر {{ theme.feature }}</option>
        <!-- <option v-if="filteredOptions(theme.feature).length === 0" :value="theme.option_id">
          {{ theme.option }}
        </option> -->
        <option 
          v-for="option in filteredOptions(theme.feature)" 
          :key="option.id" 
          :value="option.id"
        >     
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import useApiMethods from '../../mixins/ApiMethods';
import { useRoute } from 'vue-router';


const {
  getMethod,
  resultGet
} = useApiMethods();

const route = useRoute()

const emit = defineEmits(['handleSelectTheme'])

const props = defineProps({
  features: {
    type: Array,
    default: () => []
  },
  can_edit :{
    type : Boolean,
    default : false
  }
});

const product_type = window.sessionStorage.getItem('product_type');
const category_id = window.sessionStorage.getItem('category_id');


// Fetch features data
onMounted(() => {
  getMethod(product_type === 'features' ? `/api/merchant/products/${route.params.id}/features` : `/api/merchant/features?searchArray[category_id]=${category_id}`, true);
});

// Computed function to filter options based on the theme feature
const filteredOptions = (featureName) => {
  if (!resultGet.value || !resultGet.value.data) return [];
  return resultGet.value.data
    .filter(item => item.name || item.feature === featureName) // Adjust based on actual structure
    .flatMap(item => item.options || []); // Adjust based on actual structure
};


</script>

<style lang="scss" scoped>
.input-wrap{
  margin-bottom: 20px;
}
</style>
