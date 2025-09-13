<template>
  <label for="city">المدينة <span v-if="props?.showStrick">*</span></label>
  <div class="input">
    <span v-if="chosenCity === ''">{{ props?.city }}</span>
    <select 
      id="city" 
      v-model="chosenCity" 
      @change="$emit('updateCity' , chosenCity)"
    >
      <option 
        v-for="(index , value) in resultGet?.data" 
        :key="index" 
        :value="value"
      >
        {{index}}
      </option>
    </select>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import useApiMethods from '../../mixins/ApiMethods'; 

  // to import api methods
  const {
    getMethod,
    resultGet
  } = useApiMethods()

  // to define emits
  defineEmits(['updateCity'])

  // to define props
  const props = defineProps({
    city:{
      type:String,
      default : null
    },
    showStrick :{
      type :Boolean,
      default : false
    }
  })
  
  const chosenCity = ref('')

  onMounted(()=>{
    getMethod('/api/merchant/cities' , false)
  })

</script>

<style lang="scss" scoped>
label span{
  color: red;
}
.input span{
  font-size: 16px;
  font-weight: 300;
  color: #AEAEAE;
}
</style>