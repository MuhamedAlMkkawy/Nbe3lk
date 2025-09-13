<template>
  <div class="page-content">
    <form action="">
      <div class="input-wrap" v-for="theme in resultGet?.data" :key="theme.id">
        <label :for="theme.id">{{ theme.feature }}</label>
        <div class="input">
          <select :id="theme.id" @change="handleSelectTheme(theme.id , $event)">
            <option>أختر {{ theme.feature }}</option>
            <option 
              v-for="option in theme.options" 
              :key="option.id" 
              :value="option.id">
                {{ option.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="inputs">
        <div class="input-wrap">
          <label for="quantity">العدد المتوفر</label>
          <div class="input">
            <input 
              type="number"
              id="quantity"
              placeholder="أدخل العدد المتوفر"
              v-model="body.variants[0].quantity"
            >
          </div>
        </div>
        <div class="input-wrap">
          <label for="is_active">أختر حالة المنتج</label>
          <div class="input">
            <select id="is_active" v-model="body.variants[0].is_active">
              <option >أختر حالة المنتج</option>
              <option :value="1">متاح</option>
              <option :value="0">غير متاح</option>
            </select>
          </div>
        </div>
    </div>
    <div class="inputs">
      <div class="input-wrap" v-if="category_type === 'rent'" >
        <label for="insurance">سعر التأمين</label>
        <div class="input">
          <input 
            type="number"
            id="insurance"
            placeholder="أدخل سعر التأمين"
            v-model="body.variants[0].insurance_amount"
          >
          <span>ر.س</span>
        </div>
      </div>
      <div class="input-wrap" :style="category_type !== 'rent' ? 'width:100%' : ''">
        <label for="price">
          {{ category_type === 'rent' ? 'سعر التأجير لليوم الواحد' : 'سعر الشراء' }}
        </label>
        <div class="input">
          <input 
            type="number"
            id="price"
            :placeholder="category_type === 'rent' ? 'سعر التأجير لليوم الواحد' : 'سعر الشراء'"
            v-model="body.variants[0].price"
          >
          <span>ر.س</span>
        </div>
      </div>
    </div>
    <div class="inputs">
      <div class="input-wrap":style="body.variants[0].saleQuestion !== true  ? 'width:100%' : ''" >
        <label for="sale?">هل يوجد خصم ؟</label>
        <div class="input">
          <select id="sale?" v-model="body.variants[0].saleQuestion">
            <option>هل يوجد خصم؟</option>
            <option :value="true">نعم</option>
            <option :value="false">لا</option>
          </select>
        </div>
      </div>
      <div v-if="body.variants[0].saleQuestion === true" class="input-wrap">
        <div class="input">
          <input 
            type="number" 
            placeholder="أدخل الخصم"
            v-model="body.variants[0].discount"
          >
          <span>ر.س</span>
        </div>
      </div>
    </div>
    <div class="inputs">
      <div class="input-wrap" v-if="body.variants[0].saleQuestion === true">
        <label for="saleDate">تاريخ الخصم</label>
        <div class="input">
          <input 
            type="date"
            id="saleDate"
            placeholder="أدخل تاريخ الخصم"
            v-model="body.variants[0].discount_end_at"
            :min="minDate"
          >
        </div>
      </div>
      <div class="input-wrap" :style="body.variants[0].saleQuestion !== true  ? 'width:100%' : ''">
        <label for="variant-file">صورة المنتج أو الفيديو</label>
        <div class="input">
          <input 
            type="file" 
            id="variant-file"
            @change="handleUploadVariantImage"
            hidden
          >
          <label for="variant-file">أضف صورة أو فيديو للمنتج</label>
          <span><i class="pi pi-upload"></i></span>
        </div>
      </div>
    </div>
    <div class="images">
      <div class="image" v-if="body?.variants[0]?.image">
        <button @click="removeMedia(0)" class="close-icon">
          <i class="pi pi-times"></i>
        </button>
        <template v-if="body.variants[0].image.type.startsWith('image/')">
          <img :src="getMediaSrc(body.variants[0].image)" alt="image" loading="lazy" />
        </template>
        <template v-else-if="body.variants[0].image.type.startsWith('video/')">
          <video :src="getMediaSrc(body.variants[0].image)" autoplay muted loop loading="lazy" />
        </template>
      </div>
    </div>
    </form>
  </div>

  <div class="page-content">
    <button class="main-btn" @click="handleSubmit">
      حفظ
    </button>
  </div>
  <!--------------------------------- Progress Popup ----------------------------------->
  <ProgressPopup
    v-if="showProgressPopup"
    :progressText="progressText"
  />
  <!----------------------------------- handle Toast ----------------------------------->
  <Toast 
    ref="toast"
    position="bottom-right"
  />
  <!------------------------------------ Loading --------------------------------------->
  <Loading v-if="loading" />

</template>

<script setup>
  import { ref , onMounted , toRaw } from 'vue';
  import Toast from 'primevue/toast'
  import Loading from '../../../../components/Loading.vue'
  import useApiMethods from '../../../../mixins/ApiMethods';
  import ProgressPopup from '../../../../components/Popups/ProgressPopup.vue'

  const {
    getMethod,
    postMethod,
    resultGet,
    loading,
    toast,
    showProgressPopup,
    progressText,
    handleToast
  } = useApiMethods()

  // to handle body 
  const body = ref({
    variants: [
      {
        quantity:'',
        is_active:'أختر حالة المنتج',
        price:'',
        insurance_amount:'',
        saleQuestion : 'هل يوجد خصم؟',
        discount : '',
        discount_end_at:'',
        image:null,
        features:[]
      }
    ]
  })


  // to handle selected Themes and Options in 3rd step of form to be posted to Api
  const handleSelectTheme = (themeId , event) =>{
    const selectedOptionId = Number(event.target.value)
    let features = body.value.variants[0].features

    // Check if the themeId already exists in the features array
    const existingFeature = features.find(feature => feature?.feature_id === themeId);
    
    // to get the index of the themeId in the features array
    const existingFeatureIndex = features.indexOf(existingFeature)


    if(existingFeature){
      features[existingFeatureIndex].option_id = selectedOptionId
    }else{ 
      features.push({
        feature_id: themeId,
        option_id: selectedOptionId,
      });

    }
  }

    // to handle upload image / video of the variant in the 3rd step of form
  const handleUploadVariantImage = (event) => {
    body.value.variants[0].image = null
    const file = event.target.files[0];
    if (file) {
      body.value.variants[0].image = file;
    }
  };

  // to handle remove media (image/video)
  const removeMedia = (mediaId) => {
    body.value.variants[0].image = null
  };

  // to render media either local or fetched
  const getMediaSrc = (media) => {
    return typeof media === 'string' ? media : URL.createObjectURL(media);
  };


  // to get product_id and category_type from session storage
  const product_id = Number(window.sessionStorage.getItem('product_id'))
  const category_type = window.sessionStorage.getItem('category_type')

  // to handle submit
  const handleSubmit = () =>{
    let productVariants = new FormData();
    const rawBody = toRaw(body.value); // Convert the ref to a raw object if using the Composition API

    // Function to append nested properties to FormData
    function appendFormData(formData, data, parentKey = '') {
      if (data && typeof data === 'object' && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
          const fullKey = parentKey ? `${parentKey}[${key}]` : key;
          appendFormData(formData, data[key], fullKey);
        });
      } else {
        formData.append(parentKey, data);
      }
    }

    // Loop through each variant and append its data to FormData
    rawBody.variants.forEach((variant, index) => {
      const variantKey = `variants[${index}]`;
      appendFormData(productVariants, variant, variantKey);
    });


    const variant = body.value.variants[0]
    if(variant.features.length === 0){
      handleToast('error' , 'يجب أن تضيف قيم للسمات')
    }else if(variant.quantity === ''){
      handleToast('error' , 'يجب أن تضيف قيمة العدد المتوفر')
    }else if (variant.is_active === 'أختر حالة المنتج'){
      handleToast('error' , 'يجب أن تضيف حالة المنتج')
    }else if(variant.insurance_amount === '' && category_type === 'rent'){
      handleToast('error' , 'يجب أن تضيف قيمة سعر التأمين')
    }else if (variant.price === '' && category_type === 'buy'){
      handleToast('error' , 'يجب أن تضيف السعر')
    }else if(variant.price === '' && category_type === 'rent'){
      handleToast('error' , 'يجب أن تضيف سعر الإيجار')
    }else if (variant.saleQuestion === 'هل يوجد خصم؟'){
      handleToast('error' , 'يجب أن تحدد هل يوجد خصم أم لا')
    }else if(variant.saleQuestion && variant.discount === ''){
      handleToast('error' , 'يجب أن تضيف قيمة الخصم')
    }else if(variant.saleQuestion && variant.discount_end_at === ''){
      handleToast('error' , 'يجب أن تضيف تاريخ الخصم')
    }else if (variant.image === null){
      handleToast('error' , 'يجب أن تضيف الصورة أو الفيديو')
    }else{
      // to post data
      postMethod(`/api/merchant/products/${product_id}/variants` , productVariants , true , '/home/products' , 'progress')
    }
  }

  // to get today date
  const minDate = ref('');


  onMounted(()=>{
    getMethod(`/api/merchant/products/${product_id}/features` , true)

    
    // to get today date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    
    minDate.value = `${year}-${month}-${day}`;
  })

</script>

<style lang="scss" scoped>
.page-content{
  &:not(:first-of-type){
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px 20px;
  }
  form{
    max-width: unset;
    .input-wrap{
      margin-block-end: 10px;
    }
    .input{
      textarea{
        min-height: 40px;
      }
      h5{
        font-size: 14px;
        font-weight: 400;
      }
    }
    button.calender-btn i{
      color: #B26FAC;
      font-size: 25px;
    }
  }
  button.main-btn{
    max-width: 420px;
    width: 100%;
    // margin: 0 auto;
  }
  &:first-of-type{
    margin-bottom: 20px;
  }
  &:nth-of-type(2){
    text-align: center;
  }
}
</style>