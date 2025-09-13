<template>
  <div class="page-content">
    <h4>تعديل سمات المنتج</h4>
    <form action="">
      <VaraiantsSelect 
        :features = "body.variants[0].features"
        :can_edit="resultGet?.data[0]?.can_edit"
        @handleSelectTheme="handleSelectTheme"
      />
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
      <div class="input-wrap":style="!body.variants[0].saleQuestion ? 'width:100%' : ''" >
        <label for="sale?">هل يوجد خصم ؟</label>
        <div class="input">
          <select id="sale?" v-model="body.variants[0].saleQuestion">
            <option>هل يوجد خصم؟</option>
            <option :value="true">نعم</option>
            <option :value="false">لا</option>
          </select>
        </div>
      </div>
      <div v-if="body.variants[0].saleQuestion" class="input-wrap">
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
      <div class="input-wrap" v-if="body.variants[0].saleQuestion">
        <label for="saleDate">تاريخ الخصم</label>
        <div class="input saleDate">
          <input 
            type="date"
            id="saleDate"
            placeholder="أدخل تاريخ الخصم"
            v-model="body.variants[0].discount_end_at"
            :min="minDate"
          >
          <label for="saleDate">{{ body.variants[0].discount_end_at || 'أضف تاريخ الخصم' }}</label>
        </div>
      </div>
      <div class="input-wrap" :style="!body.variants[0].saleQuestion ? 'width:100%' : ''">
        <label for="variant-file">صورة المنتج أو الفيديو</label>
        <div class="input">
          <input 
            type="file" 
            id="variant-file"
            @change="handleUploadVariantImage"
            hidden
          >
          <label for="variant-file">أضف صورة المنتج أو الفيديو</label>
          <span><i class="pi pi-upload"></i></span>
        </div>
      </div>
    </div>
      <div class="images" v-if="body?.variants[0]?.image !== null">
        <div class="image">
          <button @click="removeMedia(0)" class="close-icon">
            <i class="pi pi-times"></i>
          </button>
          <template v-if="!imageChanged && isImage(body?.variants[0]?.image)">
            <img :src="getMediaSrc(body?.variants[0]?.image)" alt="image" loading="lazy" />
          </template>
          <template v-else-if="!imageChanged && isVideo(body.variants[0].image)">
            <video :src="getMediaSrc(body.variants[0].image)" autoplay muted loop loading="lazy" />
          </template>
          <template v-else-if="imageChanged && body.variants[0].image.type.startsWith('image/')">
            <img :src="getMediaSrc(body.variants[0].image)" alt="image" loading="lazy" />
          </template>
          <template v-else-if="imageChanged && body.variants[0].image.type?.startsWith('video/')">
            <video :src="getMediaSrc(body.variants[0].image)" autoplay muted loop loading="lazy" />
          </template>
        </div>
      </div>
    </form>
  </div>

  <div class="page-content">
    <div class="buttons">
      <!-- <button class="main-btn reversed" @click="handleEditThemes">
        تعديل السمات
      </button> -->
      <button class="main-btn" @click="handleSubmit">
        حفظ
      </button>
    </div>
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
  import { ref, onMounted, toRaw, watch } from 'vue';
  import Toast from 'primevue/toast';
  import Loading from '../../../../components/Loading.vue';
  import useApiMethods from '../../../../mixins/ApiMethods';
  import ProgressPopup from '../../../../components/Popups/ProgressPopup.vue';
  import { useRoute } from 'vue-router';
  import VaraiantsSelect from '../../../../components/SelectInputs/VaraiantsSelect.vue';

  const {
    getMethod,
    postMethod,
    resultGet,
    loading,
    toast,
    showProgressPopup,
    progressText,
    handleToast
  } = useApiMethods();

  // to handle body 
  const body = ref({
    variants: [
      {
        quantity: '',
        is_active: 'أختر حالة المنتج',
        price: '',
        saleQuestion: 'هل يوجد خصم؟',
        discount: '',
        discount_end_at: '',
        image: null,
        can_edit:false,
        features: []
      }
    ]
  });

  const imageChanged = ref(false);
  const variantsChanged = ref(false);

  // to handle upload image / video of the variant in the 3rd step of form
  const handleUploadVariantImage = (event) => {
    body.value.variants[0].image = null
    const file = event.target.files[0];
    if (file) {
      body.value.variants[0].image = file;
      imageChanged.value = true; // Set imageChanged to true when an image is uploaded
    }
  };

  // to handle remove media (image/video)
  const removeMedia = () => {
    body.value.variants[0].image = null
  };

  // Check if the source is an image
  const isImage = (media) => {
    return media && media.match(/\.(jpeg|jpg|gif|png)$/i);
  };

  // Check if the source is a video
  const isVideo = (media) => {
    return media && media.match(/\.(mp4|webm|ogg)$/i);
  };


  // to render media either local or fetched
  const getMediaSrc = (media) => {
    return typeof media === 'string' ? media : URL.createObjectURL(media);
  };

  const route = useRoute();

  // to get product_id and category_type from session storage
  const product_id =  route.params.id;
  const category_type = window.sessionStorage.getItem('category_type');

  // const router = useRouter()
  // // to handle edit themes
  // const handleEditThemes = () => {
  //   window.sessionStorage.setItem('product_id' , route.params.id)
  //   router.push('/home/select-product-themes/')
  // }

  // Handle selected Themes and Options
  const handleSelectTheme = (themeId, selectedOptionId) => {
    variantsChanged.value = true
    const features = body.value.variants[0].features;
    const existingFeatureIndex = features.findIndex(feature => feature.id === themeId);
    features[existingFeatureIndex].option_id = selectedOptionId;
  };


  // to handle submit
  const handleSubmit = () => {
    const variant = body.value.variants[0]
    console.log(variant)
    let productVariants = new FormData();
    productVariants.append('_method' , 'put')
    productVariants.append('quantity' , variant.quantity)
    productVariants.append('price' , variant.price)
    productVariants.append('is_active' , variant.is_active)
        
    if(imageChanged.value){
      productVariants.append('image' , variant.image)
    }else if(variant?.saleQuestion){
      productVariants.append('discount' , variant.discount)
      productVariants.append('discount_end_at' , variant.discount_end_at)
    }else if (category_type === 'rent'){
      productVariants.append('insurance_amount' , variant.insurance_amount)
    }
    
    if(variantsChanged.value && variant.can_edit){
      variant.features.forEach((feature, featureIndex) => {
        productVariants.append(`features[${featureIndex}][feature_id]`, feature.id);
        productVariants.append(`features[${featureIndex}][option_id]`, feature.option_id);
      });
      if(variant.features.length === 0){
        handleToast('error' , 'يجب أن تضيف قيم للسمات')
      }
    }


      if(variant.quantity === ''){
        handleToast('error' , 'يجب أن تضيف قيمة العدد المتوفر')
      }else if (variant.is_active === 'أختر حالة المنتج'){
        handleToast('error' , 'يجب أن تضيف حالة المنتج')
      }else if(variant.insurance_amount === '' && category_type === 'rent'){
        handleToast('error' , 'يجب أن تضيف قيمة سعر التأمين')
      }else if (variant.price === ''  && category_type === 'buy'){
        handleToast('error' , 'يجب أن تضيف السعر')
      }else if(variant.price === ''  && category_type === 'rent'){
        handleToast('error' , 'يجب أن تضيف سعر الإيجار')
      }else if (variant.saleQuestion === 'هل يوجد خصم؟'){
        handleToast('error' , 'يجب أن تحدد هل يوجد خصم أم لا')
      }else if(variant.saleQuestion && variant.discount < 1){
        handleToast('error' , 'يجب أن تضيف قيمة الخصم')
      }else if(variant.saleQuestion && variant.discount_end_at === ''){
        handleToast('error' , 'يجب أن تضيف تاريخ الخصم')
      }else if (variant.image === null){
        handleToast('error' , 'يجب أن تضيف الصورة أو الفيديو')
      }else{
        // to post data
        console.log(variantsChanged.value , variant.can_edit)
        postMethod(`/api/merchant/variants/${Number(route.query.variantID) || resultGet?.value?.data[0]?.id}`, productVariants, true, '/home/products', 'progress');
      }
  };
  
  watch(resultGet, (oldVal, newVal) => {
    if (oldVal !== newVal) {
      const variant = body.value.variants[0];
      const variantQueryID = Number(route.query.variantID)
      const fetchedVariantData = variantQueryID ? resultGet?.value?.data?.filter(item => item.id === variantQueryID)[0] : resultGet?.value?.data[0]

      variant.quantity = fetchedVariantData?.quantity;
      variant.price = fetchedVariantData?.price;
      variant.insurance_amount = fetchedVariantData?.insurance_amount;
      variant.discount = fetchedVariantData?.discount;
      variant.discount_end_at = fetchedVariantData?.discount_end_at;
      variant.image = fetchedVariantData?.image;
      variant.is_active = fetchedVariantData?.is_active;
      variant.features = fetchedVariantData?.features;
      variant.can_edit = fetchedVariantData?.can_edit
      variant.saleQuestion = Number(fetchedVariantData?.discount) === 0.00 ? false : true;
    }
  });

  // to get today date
  const minDate = ref('');

  onMounted(() => {
    getMethod( `/api/merchant/products/${product_id}/variants`, true);

    // to get today date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');

    minDate.value = `${year}-${month}-${day}`;
  });
</script>


<style lang="scss" scoped>
.page-content{
  .buttons{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 30px;
    max-width: 990px;
    width: 100%;
    margin: 0 auto;
    button{
      max-width: 450px;
    }
  }
  &:not(:first-of-type){
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px 20px;
  }
  form{
    max-width: unset;
    input::-webkit-datetime-edit {
      display: none !important;
    }
    
    .input-wrap{
      margin-block-end: 10px;
    }
    .input{
      &.saleDate{
        display: flex;
        flex-direction: row-reverse;
        width: 100%;
        label{
          width: 100%;
        }
      }
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