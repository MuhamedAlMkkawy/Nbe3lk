<template>
  <div class="popup">
    <div class="content">
      <button class="close_icon" @click="emit('handleShowAddOptionPopup')">
        <i class="pi pi-times"></i>
      </button>
      <form @submit.prevent="handleAddOption">
        <label for="themeOption">{{ resultGet?.data.filter((feature => feature.id === props.themeId))[0].feature }}</label>
        <div class="input">
          <select id="themeOption" v-model="body.option_id" name="themeOption">
            <option value="">أختر {{ resultGet?.data.filter((feature => feature.id === props.themeId))[0].feature }}</option>
            <option 
              v-for="option in filteredOptions(props.themeId)" 
              :key="option.id" 
              :value="option.id"
            >     
              {{ option.name }}
            </option>
          </select>
        </div>
        <button class="main-btn">
          إضافة
        </button>
      </form>
    </div>
  </div>
  <Toast 
    ref="toast"
    position="bottom-right"
  />
</template>

<script setup>
  import { ref , onMounted } from 'vue';
  import useApiMethods from '../../mixins/ApiMethods';
  import Toast from 'primevue/toast';
  
  const {
    getMethod,
    postMethod,
    resultGet,
    handleToast,
    toast
  } = useApiMethods()

  // Computed function to filter options based on the theme feature
  const filteredOptions = (featureID) => {
    if (!resultGet.value || !resultGet.value.data) return [];
    return resultGet.value.data
      .filter(item => item.id === featureID) // Adjust based on actual structure
      .flatMap(item => item.options || []); // Adjust based on actual structure
  };


  //  define props
  const props = defineProps({
    themeId : {
      type : Number,
      default : ''
    }
  })

  // define Emits
  const emit = defineEmits(['handleShowAddOptionPopup'])


  const body = ref({
    product_id: window.sessionStorage.getItem('product_id'),
    feature_id : props.themeId,
    option_id : ''
  })

  const handleAddOption = () =>{
    if(body.value.option_id === ''){
      handleToast('error' , 'يرجي اختيار أحد الخيارات للإضافة للسمة')
    }else{
      postMethod('/api/merchant/products/features/options' ,body.value , true , '' , 'toast' )
      setTimeout(()=>{
        location.reload()
      } , 1000)
    }
  }

  onMounted(()=>{
    getMethod('/api/merchant/features' , true)
  })
</script>

<style lang="scss" scoped>
  .popup{
    .close_icon{
      position: absolute;
      inset-inline-end: -8px;
      top:-8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #B82828;
      i.pi{
        color: #fff;
        margin-bottom: 0;
        font-size: 15px;
      }
      &:hover{
        background: #fff;
        border: 1px solid #B82828;
        i.pi{
          color: #B82828;
        }
      }
    }
    form{
      text-align: start;
      label{
        margin-bottom: 5px;
      }
    }
  }
</style>