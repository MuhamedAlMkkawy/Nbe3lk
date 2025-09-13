<template>
  <div class="page-content">
    <h4>إضافة منتج - بسيط</h4>
    <form action="">
      <!------------------------------------- 1st step form ------------------------------------->
      <div v-if="formStep === 1">
        <div class="inputs">
          <div class="input-wrap">
            <label for="ar-name">إسم المنتج باللغة العربيه</label>
            <div class="input">
              <input 
                type="text" 
                id="ar-name" 
                placeholder="أضف إسم المنتج باللغة العربيه"
                v-model="body.name_ar"
              >
            </div>
          </div>
          <div class="input-wrap">
            <label for="en-name">إسم المنتج باللغة الإنجليزية</label>
            <div class="input">
              <input 
                type="text" 
                id="en-name" 
                placeholder="أضف إسم المنتج باللغة الإنجليزية"
                v-model="body.name_en"
              >
            </div>
          </div>
        </div>
        <div class="inputs">
          <div class="input-wrap">
            <label for="main-section">القسم الرئيسي</label>
            <div class="input">
              <select id="main-section" v-model="body.category_type">
                <option>أختر القسم الرئيسي</option>
                <option value="rent">إيجار</option>
                <option value="buy">شراء</option>
              </select>
            </div>
          </div>
          <CategorySelect 
            :category="body.category_id"
            @handleCategory="handleCategory"
            />
          </div>
          <div class="inputs">
            <ClassificationSelect 
            :classification="body.classification_id"
            @handleClassification="handleClassification"
            />
            <BrandSelect 
            :brand="body.brand_id"
            @handleBrand="handleBrand"
          />
        </div>
        <div class="inputs">
          <div class="input-wrap">
            <label for="ar-description">تفاصيل المنتج باللغه العربيه</label>
            <div class="input">
              <textarea 
                id="ar-description" 
                placeholder="أدخل تفاصيل المنتج باللغه العربيه" 
                v-model="body.description_ar"
              />
            </div>
          </div>
          <div class="input-wrap">
            <label for="en-description">تفاصيل المنتج باللغه الإنجليزيه</label>
            <div class="input">
              <textarea 
                id="en-description" 
                placeholder="أدخل تفاصيل المنتج باللغه الإنجليزيه"
                v-model="body.description_en"
              />
            </div>
          </div>
        </div>
        <div class="inputs">
          <div class="input-wrap">
            <label for="product-file">صور / فيديوهات المنتج</label>
            <div class="input">
              <input 
                type="file" 
                id="product-file"
                multiple
                hidden
                @change="handleUploadProductImages"
              >
              <label for="product-file">أختر صور / فيديوهات المنتج</label>
              <span><i class="pi pi-upload"></i></span>
            </div>
          </div>
          <div class="input-wrap">
            <label for="available-status">حالة التوافر</label>
            <div class="input">
              <select id="available-status" v-model="body.is_available">
                <option>أختر حالة التوافر</option>
                <option :value="1">متوفر</option>
                <option :value="0">غير متوفر</option>
              </select>
            </div>
          </div>
        </div>
        <div class="images" v-if="body?.images?.length > 0">
          <div class="image" v-for="(media, index) in body.images" :key="index">
            <button @click="removeMedia(index)"  class="close-icon">
              <i class="pi pi-times"></i>
            </button>
            <template v-if="media.type.startsWith('image/')">
              <img :src="getMediaSrc(media)" alt="image" loading="lazy" />
            </template>
            <template v-else-if="media.type.startsWith('video/')">
              <video :src="getMediaSrc(media)" autoplay muted loop loading="lazy" />
            </template>
          </div>
        </div>

        <div class="inputs">
          <div class="input-wrap">
            <label for="ar-instructions">الإرشادات للحفاظ علي المنتج باللغه العربيه</label>
            <div class="input">
              <textarea 
                id="ar-instructions" 
                placeholder="أدخل الإرشادات للحفاظ علي المنتج باللغه العربيه"
                v-model="body.product_protection_instruction_ar"
              />
            </div>
          </div>
          <div class="input-wrap">
            <label for="en-instructions">الإرشادات للحفاظ علي المنتج باللغه الانجليزيه</label>
            <div class="input">
              <textarea 
                id="en-instructions" 
                placeholder="أدخل الإرشادات للحفاظ علي المنتج باللغه الانجليزيه"
                v-model="body.product_protection_instruction_en"
              />
            </div>
          </div>
        </div>
        <!-- <label for="is_available-rent">الأيام المتاحه للإيجار</label>
        <div class="input">
          <h5>أختر الأيام المتاحه للإيجار</h5>
          <button class="calender-btn" @click="handleShowDatePicker">
            <i class="pi pi-calendar"></i>
          </button>
        </div> -->
      </div>
      <!------------------------------------- 2nd step form ------------------------------------->
      <div v-if="formStep === 2">
        <MultiSelectThemes 
          :category_id="body.category_id"
          @handleThemes="handleThemes"
        />
      </div>
      <!------------------------------------- 3rd step form ------------------------------------->
      <div v-if="formStep === 3">
        <!-- {{ console.table(themes) }} -->
        <div class="input-wrap" v-for="theme in themes" :key="theme.id">
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
                min="1"
                required
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
          <div class="input-wrap" v-if="body.category_type === 'rent'" >
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
          <div class="input-wrap" :style="body.category_type !== 'rent' ? 'width:100%' : ''">
            <label for="price">
              {{ body.category_type === 'rent' ? 'سعر التأجير لليوم الواحد' : 'سعر الشراء' }}
            </label>
            <div class="input">
              <input 
                type="number"
                id="price"
                :placeholder="body.category_type === 'rent' ? 'سعر التأجير لليوم الواحد' : 'سعر الشراء'"
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
                <option :value="'هل يوجد خصم؟'">هل يوجد خصم؟</option>
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
            <template v-else-if="body.variants[0].image.type?.startsWith('video/')">
              <video :src="getMediaSrc(body.variants[0].image)" autoplay muted loop loading="lazy" />
            </template>
          </div>
        </div>
      </div>
    </form>
  </div>


  <div class="page-content">
    <button class="main-btn" @click="handleSubmit">
      {{formStep !== 3 ? 'التالي' : 'حفظ'}}
    </button>
    <button v-if="formStep !== 1" class="main-btn reversed" @click="formStep--">رجوع</button>
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
  <!-- -------------------------------- Date Picker -----------------------------------
  <DatePickerExample 
    v-if="showDatePicker === true"
    @handleShowDatePicker = "handleShowDatePicker"
    @handleDatePicker="handleDatePicker"
  /> -->
</template>

<script setup>
  // import DatePickerExample from '../../../components/DatePicker.vue';
  // import useProgressPopup from '../../../mixins/ProgressPopupMixin';
  import { onMounted, ref , toRaw } from 'vue';
  import ProgressPopup from '../../../components/Popups/ProgressPopup.vue';
  import CategorySelect from '../../../components/SelectInputs/CategorySelect.vue';
  import ClassificationSelect from '../../../components/SelectInputs/ClassificationSelect.vue';
  import BrandSelect from '../../../components/SelectInputs/BrandSelect.vue';
  import useApiMethods from '../../../mixins/ApiMethods';
  import MultiSelectThemes from '../../../components/SelectInputs/MultiSelectThemes.vue';
  import Toast from 'primevue/toast'
  import Loading from '../../../components/Loading.vue'



  // to control api methods
  const {
    postMethod,
    loading,
    toast,
    handleToast,
    progressText , 
    showProgressPopup 
  } = useApiMethods()


  // to control the form steps
  const formStep = ref(1)


  // to handle selected themes
  const themes = ref([])


  // to handle body 
  const body = ref({
    name_ar : '',
    name_en : '',
    type:'simple',
    category_type : 'أختر القسم الرئيسي' ,
    category_id : 0,
    classification_id :0,
    brand_id : 0 ,
    description_ar : '',
    description_en : '',
    images : [],
    is_available : 'أختر حالة التوافر',
    product_protection_instruction_ar : '',
    product_protection_instruction_en : '',
    // --------------- 3rd step of form ----------------
    variants: [
      {
        quantity:'',
        is_active:'أختر حالة المنتج',
        price:'',
        insurance_amount :'',
        saleQuestion : 'هل يوجد خصم؟',
        discount : '',
        discount_end_at:'',
        image:null,
        features:[]
      }
    ]
  })
  

  // to handle upload image / video of the product in 1st step of form 
  const handleUploadProductImages = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      body.value.images = []; // Initialize the images array if not already done

      for (let i = 0; i < files.length; i++) {
        body.value.images.push(files[i]); // Push the file directly
      }
    }
  };

  // to handle remove media (image/video)
  const removeMedia = (mediaId) => {
    body.value.images.splice(mediaId, 1);
    body.value.variants[0].image = null
  };

  // to render media either local or fetched
  const getMediaSrc = (media) => {
    return typeof media === 'string' ? media : URL.createObjectURL(media);
  };




  // to handle upload image / video of the variant in the 3rd step of form
  const handleUploadVariantImage = (event) => {
    body.value.variants[0].image = null
    const file = event.target.files[0];
    if (file) {
      body.value.variants[0].image = file;
    }
  };

  // // to handle date picker
  // const showDatePicker = ref(false)
  // const handleShowDatePicker = (dateValue) =>{
  //   showDatePicker.value = !showDatePicker.value
  // }
  // const handleDatePicker = (dateValue) =>{
  //   body.value.rentDate = dateValue
  // }

  // to handle the second section from its select
  const handleCategory = (category) =>{
    body.value.category_id = Number(category)
  }
  
  // to handle the classification from its select
  const handleClassification = (classification) =>{
    body.value.classification_id = Number(classification)
    window.sessionStorage.setItem('classification' , Number(classification))
  }
  
  // to handle the brand from its select
  const handleBrand = (brand) =>{
    body.value.brand_id = Number(brand)
    window.sessionStorage.setItem('brand' , Number(brand))
  }

  // to handle select themes in 2nd step of form
  const handleThemes = (selectedThemes) =>{
    themes.value=[]
    selectedThemes.value.forEach((selectedTheme, index) => {
      // Use push to selected items to the themes array
      themes.value.push(selectedTheme);
    });
  }


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


  // to handle submit
  const handleSubmit = () =>{
    if(formStep.value === 1){
      if(body.value.name_ar === ''){
        handleToast('error' , 'يجب إضافة اسم المنتج باللغه العربيه')
      }else if (body.value.name_en === ''){
        handleToast('error' , 'يجب إضافة اسم المنتج باللغه الإنجليزيه')
      }else if(body.value.category_type === 'أختر القسم الرئيسي'){
        handleToast('error' , 'يجب أن تختار القسم الرئيسي')
      }else if(body.value.category_id === 0){
        handleToast('error' , 'يجب أن تختار القسم الفرعي')
      }else if(body.value.classification_id === 0){
        handleToast('error' , 'يجب أن تختار التصنيف')
      }else if(body.value.brand_id === 0){
        handleToast('error' , 'يجب أن تختار الماركة')
      }else if (body.value.description_ar === ''){
        handleToast('error' , 'يجب أن تضيف الوصف باللغه العربيه')
      }else if (body.value.description_en === ''){
        handleToast('error' , 'يجب أن تضيف الوصف باللغه الإنجليزية')
      }else if (body.value.images.length === 0){
        handleToast('error' , 'يجب أن تضيف صور المنتج')
      }else if (body.value.is_available === 'أختر حالة التوافر'){
        handleToast('error' , 'يجب أن تحدد حالة توافر المنتج')
      }else if (body.value.product_protection_instruction_ar === ''){
        handleToast('error' , 'يجب أن تضيف ارشادات الحفاظ علي المنتج باللغه العربيه')
      }else if(body.value.product_protection_instruction_en === ''){
        handleToast('error' , 'يجب أن تضيف ارشادات الحفاظ علي المنتج باللغه الإنجليزيه')
      }else{
        window.sessionStorage.setItem('category_id' , body.value.category_id)
        window.sessionStorage.setItem('category_type' , body.value.category_type)
        formStep.value++
      }
    }
    else if (formStep.value === 2){
      if(themes.value.length === 0){
        handleToast('error' , 'يجب أن تختار سمة أو أكثر')
      }else{
        formStep.value++ 
      }
    }
    else if(formStep.value === 3 ){
      let productDetails = new FormData();
      const rawBody = toRaw(body.value); // Convert the ref to a raw object if using Composition API

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

      appendFormData(productDetails, rawBody);

      const variant = body.value.variants[0]
      if(variant.features.length === 0){
        handleToast('error' , 'يجب أن تضيف قيم للسمات')
      }else if(variant.quantity === ''){
        handleToast('error' , 'يجب أن تضيف قيمة العدد المتوفر')
      }else if (variant.is_active === 'أختر حالة المنتج'){
        handleToast('error' , 'يجب أن تضيف حالة المنتج')
      }else if(variant.insurance_amount === '' && body.value.category_type === 'rent'){
        handleToast('error' , 'يجب أن تضيف قيمة سعر التأمين')
      }else if (variant.price === ''  && body.value.category_type === 'buy'){
        handleToast('error' , 'يجب أن تضيف السعر')
      }else if(variant.price === ''  && body.value.category_type === 'rent'){
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
        postMethod('/api/merchant/products' , productDetails , true , '/home/products' , 'progress')
        window.sessionStorage.clear()
      }
    }
  }


  // to get today date
  const minDate = ref('');

  onMounted(()=>{
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    
    minDate.value = `${year}-${month}-${day}`;
  })
</script>

<style lang="scss" scoped>
.page-content{
  overflow-x: hidden;
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
      >label{
        margin-bottom: 0;
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