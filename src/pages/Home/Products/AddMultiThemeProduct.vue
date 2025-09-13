<template>
  <div class="page-content">
    <h4>إضافة منتج - متعدد السمات</h4>
    <form action="">
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
              <select id="main-section" @change="handleCategoryType($event.target.value)">
                <option>أختر القسم الرئيسي</option>
                <option value="rent">إيجار</option>
                <option value="buy">شراء</option>
              </select>
            </div>
          </div>
          <CategorySelect 
            @handleCategory="handleCategory"
          />
        </div>
        <div class="inputs">
          <ClassificationSelect 
            @handleClassification="handleClassification"
          />
          <BrandSelect 
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
            <label for="product-file">صور أو فيديوهات المنتج</label>
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
            <button @click="removeMedia(index)" class="close-icon">
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
    </form>
  </div>
  <div class="page-content">
    <button class="main-btn" @click="handleSubmit">حفظ</button>
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
  import { ref , toRaw } from 'vue';
  import ProgressPopup from '../../../components/Popups/ProgressPopup.vue';
  import CategorySelect from '../../../components/SelectInputs/CategorySelect.vue';
  import ClassificationSelect from '../../../components/SelectInputs/ClassificationSelect.vue';
  import BrandSelect from '../../../components/SelectInputs/BrandSelect.vue';
  import useApiMethods from '../../../mixins/ApiMethods';
  import Toast from 'primevue/toast'
  import Loading from '../../../components/Loading.vue'



  // to control api methods
  const {
    postMethod,
    loading,
    toast,
    progressText , 
    showProgressPopup 
  } = useApiMethods()



  // to handle body 
  const body = ref({
    name_ar : '',
    name_en : '',
    type:'features',
    category_type : 'أختر القسم الرئيسي' ,
    category_id : 'null',
    classification_id : null,
    brand_id : null ,
    description_ar : '',
    description_en : '',
    images : null,
    is_available : 'أختر حالة التوافر',
    product_protection_instruction_ar : '',
    product_protection_instruction_en : '',
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
  };

  // to render media either local or fetched
  const getMediaSrc = (media) => {
    return typeof media === 'string' ? media : URL.createObjectURL(media);
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
  
  const handleCategoryType = (category_type) =>{
    body.value.category_type = category_type
    window.sessionStorage.setItem('category_type' , category_type)
  }

  const handleCategory = (category) =>{
    body.value.category_id = category
    window.sessionStorage.setItem('category_id' , category)
  }

  // to handle the classification from its select
  const handleClassification = (classification) =>{
    body.value.classification_id = classification
  }

  // to handle the brand from its select
  const handleBrand = (brand) =>{
    body.value.brand_id = brand
  }


  // to handle submit
  const handleSubmit = async () =>{
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


    postMethod('/api/merchant/products' , productDetails , true , '/home/select-product-themes/' , 'progress')
  }

</script>



<style lang="scss" scoped>
.page-content{
  form{
    max-width: unset;
    .input{
      textarea{
        min-height: 70px;
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
    margin: 0 auto;
  }
  &:first-of-type{
    margin-bottom: 20px;
  }
  &:nth-of-type(2){
    text-align: center;
  }
}
</style>