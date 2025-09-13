<template>
  <div class="page-content">
    <h4>تعديل المنتج</h4>
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
              <select id="main-section" v-model="body.category_type" @change="handleCategoryType($event.target.value)">
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
            :brand = "body.brand_id"
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
                @change="handleUploadProductImages"
                hidden
              >
              <label for="product-file">أدخل صور أو فيديوهات المنتج</label>
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
        <!-- <div class="images" v-if="body?.images !== null">
          <div 
            class="image" 
            v-for="(image, index) in body?.images" 
            :key="index"
          >
            <button @click="removeImage(image.id)" >
              <i class="pi pi-times"></i>
            </button>
            <img :src="getImageSrc(image.image)" alt="image" loading="lazy" />
          </div>
        </div> -->
        <div class="images">
          <div 
            class="image" 
            v-if="body?.images !== null"
            v-for="(media, index) in body?.images" 
            :key="index"
          >
            <button @click="removeImage(media.id)" class="close-icon">
              <i class="pi pi-times"></i>
            </button>
            <template v-if="isImage(media)">
              <img :src="media.image" alt="image" loading="lazy" />
            </template>
            <template v-else-if="isVideo(media)">
              <video :src="media.image" autoplay muted loop loading="lazy" />
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
</template>

<script setup>
  import { onMounted, ref , toRaw , watch } from 'vue';
  import ProgressPopup from '../../../../components/Popups/ProgressPopup.vue';
  import CategorySelect from '../../../../components/SelectInputs/CategorySelect.vue';
  import ClassificationSelect from '../../../../components/SelectInputs/ClassificationSelect.vue';
  import BrandSelect from '../../../../components/SelectInputs/BrandSelect.vue';
  import useApiMethods from '../../../../mixins/ApiMethods';
  import Toast from 'primevue/toast'
  import Loading from '../../../../components/Loading.vue'
  import { useRoute } from 'vue-router';



  // to control api methods
  const {
    getMethod,
    postMethod,
    deleteMethod,
    resultGet,
    loading,
    toast,
    progressText , 
    showProgressPopup,
    handleToast
  } = useApiMethods()


  // to handle body 
  const body = ref({
    _method : 'put',
    name_ar : '',
    name_en : '',
    type:'features',
    category_type : 'أختر القسم الرئيسي' ,
    category_id : null,
    classification_id : null,
    brand_id : null ,
    description_ar : '',
    description_en : '',
    images : [],
    is_available : 'أختر حالة التوافر',
    product_protection_instruction_ar : '',
    product_protection_instruction_en : '',
  })

  // to check if the images changed to be posted with edits
  const imageChanged = ref(false)
  
  // to handle upload image / video of the product in 1st step of form 
  const handleUploadProductImages = (event) => {
    imageChanged.value = true;
    const files = event.target.files;

    if (files && files.length > 0) {
      // Initialize FormData to hold the files
      const formData = new FormData();

      // Loop through the uploaded files and append them to the FormData
      for (let i = 0; i < files.length; i++) {
          formData.append(`images[${i}]`, files[i]); // Use 'images' as the key (change if necessary)
      }

      // Upload the FormData to the endpoint
      postMethod(`/api/merchant/products/${route.params.id}/image`, formData, true, 'reload_page', 'toast');
    }
};




  const handleCategoryType = (category_type) =>{
    body.value.category_type = category_type
    window.sessionStorage.setItem('category_type' , category_type)
  }

  const handleCategory = (category) =>{
    body.value.category_id = Number(category)
    window.sessionStorage.setItem('category_id' , Number(category))
  }

  // to handle the classification from its select
  const handleClassification = (classification) =>{
    body.value.classification_id = Number(classification)
  }

  // to handle the brand from its select
  const handleBrand = (brand) =>{
    body.value.brand_id = Number(brand)
  }


  // to handle remove image
  const removeImage = (imageId) => {
    // imageChanged.value= true
    body.value.images.splice(imageId, 1);
    deleteMethod(`/api/merchant/products/image/${imageId}` , true , 'toast' ,`/api/merchant/products/${route.params.id}` , '')
  };

  // to render images either local of fetched
  const getImageSrc = (image) => {
    return typeof image === 'string' ? image : URL.createObjectURL(image);
  };

  // Check if the source is an image
  const isImage = (media) => {
    return media.image && media.image.match(/\.(jpeg|jpg|gif|png)$/i);
  };

  // Check if the source is a video
  const isVideo = (media) => {
    return media.image && media.image.match(/\.(mp4|webm|ogg)$/i);
  };



  // to handle submit
  const route = useRoute()
  const handleSubmit = async () => {
    let productDetails = new FormData();

    // If images have changed, append each image individually
    if (imageChanged.value && body.value.images) {
      for (let i = 0; i < body.value.images.length; i++) {
        productDetails.append(`images[${i}]`, body.value.images[i]);
      }
    }

    productDetails.append('_method', body.value._method);
    productDetails.append('name_ar', body.value.name_ar);
    productDetails.append('name_en', body.value.name_en);
    productDetails.append('type', body.value.type);
    productDetails.append('category_type', body.value.category_type);
    productDetails.append('category_id', body.value.category_id);
    productDetails.append('classification_id', body.value.classification_id);
    productDetails.append('brand_id', body.value.brand_id);
    productDetails.append('description_ar', body.value.description_ar);
    productDetails.append('description_en', body.value.description_en);
    productDetails.append('product_protection_instruction_ar', body.value.product_protection_instruction_ar);
    productDetails.append('product_protection_instruction_en', body.value.product_protection_instruction_en);
    productDetails.append('is_available', body.value.is_available ? '1' : '0');

    if(body.value.images.length === 0){
      handleToast('error' , 'يجب إضافة صور أو فيديوهات للمنتج')
    }else{
      postMethod(`/api/merchant/products/${route.params.id}`, productDetails, true,  resultGet?.value?.data?.type === 'features' ? `/home/show-product-variants/${route.params.id}` : `/home/edit-variants/${route.params.id}`, 'progress');
    }
    console.clear()
  };



  watch(resultGet , (oldVal , newVal)=>{
    if(oldVal !== newVal){
      body.value.name_ar = resultGet?.value?.data?.name_ar
      body.value.name_en = resultGet?.value?.data?.name_en
      body.value.category_type = resultGet?.value?.data?.category_type
      body.value.category_id = resultGet?.value?.data?.category_id
      body.value.classification_id = resultGet?.value?.data?.classification_id
      body.value.brand_id = resultGet?.value?.data?.brand_id
      body.value.description_ar = resultGet?.value?.data?.description_ar
      body.value.description_en = resultGet?.value?.data?.description_en
      body.value.images = resultGet?.value?.data?.images
      body.value.product_protection_instruction_ar = resultGet?.value?.data?.product_protection_instruction_ar
      body.value.product_protection_instruction_en = resultGet?.value?.data?.product_protection_instruction_en
      body.value.is_available = resultGet?.value?.data?.is_available ? '1' : '0'
    }
  })

  onMounted(()=>{
    getMethod(`/api/merchant/products/${route.params.id}` , true)
  })
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