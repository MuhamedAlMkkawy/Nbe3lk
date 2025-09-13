<template>
  <div class="sign-page page">
    <div class="content">
      <div class="image">
        <img src="../../assets/images/logo.png" alt="logo image" loading="lazy">
      </div>
      <h1>إنشاء حساب</h1>
      <form @submit.prevent="handleSubmit" >
        <div class="upload">
          <label for="store-photo">صوره شعار المتجر <span>*</span></label>
          <input 
            type="file" 
            id="store-photo" 
            hidden
            @change="handleFileChange" 
            accept="image/*"
          > 
          <label v-if="previewUrl" for="store-photo" class="image-preview">
            <img :src="previewUrl" alt="Image Preview" />
          </label>
          <label v-else class="store-photo" for="store-photo">
            <i class="pi pi-cloud-upload"></i>
            <h3>إرفاق صورة</h3>
          </label>
        </div>
        <label for="name">إسم المتجر <span>*</span></label>
        <div class="input">
          <input 
            id="name" 
            type="text" 
            placeholder="أدخل اسم المتجر"
            v-model="body.name"
          >
        </div>
        <label for="description">وصف المتجر <span>*</span></label>
        <div class="input">
          <textarea 
            id="description" 
            placeholder="أدخل وصف المتجر" 
            v-model="body.description"
          />
        </div>
        <CitiesSelect
          showStrick = true
          :city="body.city_id" 
          @updateCity="updateCity"
        />
        <label for="location" @click="handleShowMap">الموقع <span>*</span></label>
        <div class="input map_desc" @click="handleShowMap">
          <!-- <input 
            type="text" 
            placeholder="أدخل الموقع" 
            v-model="body.map_desc" 
            id="location"
            disabled
            @click="handleShowMap"
          > -->
          <span>
            {{ 
              selectedPosition?.map_desc?.city === '' ?
              'أدخل الموقع' : 
              selectedPosition?.map_desc?.city 
            }}
          </span>
          <i class="pi pi-map-marker"></i>
        </div>
        <label for="commerce">السجل التجاري</label>
        <div class="input">
          <input 
            type="text" 
            id="commerce" 
            placeholder="أدخل السجل التجاري"
            v-model="body.commercial_register"
          >
        </div>
        <label for="identity">الهويه الوطنيه لممثل الجهه <span>*</span></label>
        <div class="input">
          <input 
            type="text" 
            id="identity" 
            placeholder="أدخل الهويه الوطنيه لممثل الجهه"
            v-model="body.identity_num"
          >
        </div>
        <label for="bank">اسم البنك <span>*</span></label>
        <div class="input">
          <input 
            type="text" 
            id="bank" 
            placeholder="أدخل إسم البنك"
            v-model="body.bank_name"
          >
        </div>
        <label for="bank-number">رقم الحساب البنكي <span>*</span></label>
        <div class="input">
          <input 
            type="text" 
            id="bank-number" 
            placeholder="أدخل رقم الحساب البنكي"
            v-model="body.account_number"
          >
        </div>
        <label for="email">البريد الالكتروني <span>*</span></label>
        <div class="input">
          <input 
            type="text" 
            id="email" 
            placeholder="أدخل البريد الالكتروني"
            v-model="body.email"
          >
        </div>
        <button type="submit" class="main-btn">
          إنشاء الحساب
        </button>
        <h4>لديك بالفعل حساب ؟ <routerLink to="/login">تسجيل الدخول</routerLink></h4>
      </form>
    </div>
  </div>
  <!-------------------------- to handle Prime Vue Toast Error -------------------------->
  <Toast 
    ref="toast"
    position="bottom-right"
  />
  <!----------------------------------- Google Map ------------------------------------->
  <MapPopup 
    v-if="showMap"
    :selectedPosition="selectedPosition"
    :lat="Number(selectedPosition?.lat)"
    :lng="Number(selectedPosition?.lng)"
    @handleShowMap="handleShowMap"
    @handleMapClick="handleMapClick"
  />
  <!-------------------------------------- Loading -------------------------------------->
  <Loading v-if="loading"/>
</template>

<script setup>
  import { ref } from 'vue';
  import Toast from 'primevue/toast';
  import useApiMethods from '../../mixins/ApiMethods';
  import Loading from '../../components/Loading.vue';
  import MapPopup from '../../components/Popups/MapPopup.vue';
  import CitiesSelect from '../../components/SelectInputs/CitiesSelect.vue';
  import useFawmiMap from '../../mixins/handleMap';

  const { postMethod, toast, loading, handleToast } = useApiMethods();
  const previewUrl = ref(null); // To hold the image preview URL

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    body.value.image = file;

    // Create a URL for the image preview
    if (file) {
      previewUrl.value = URL.createObjectURL(file);
    } else {
      previewUrl.value = null; // Reset if no file is selected
    }
  };

  // to handle update city
  const updateCity = (newCity) =>{
    body.value.city_id = newCity
  }


  // to handle fawmi google maps popup
  const {
    showMap,
    handleShowMap,
    selectedPosition,
    handleMapClick
  } = useFawmiMap() 

  // handle store details inputs
  const body = ref({
    name : '',
    description : '',
    city_id:'أختر المدينة',
    address : '',
    commercial_register : '',
    identity_num : '',
    bank_name : '',
    account_number : '',
    email : '',
    image : null,
    lat : '',
    lng :'',
    map_desc : selectedPosition?.value?.map_desc?.city || ''
  }) 

  const handleSubmit = () =>{
    if(body.value.image === null){
      handleToast('error' , 'يجب إضافة صورة شعار المتجر')
    }else if(body.value.name.length < 2 ){
      handleToast('error' , 'يجب ألا يقل إسم المتجر عن حرفين')
    }else if(body.value.description.length < 2){
      handleToast('error' , 'يجب ألا يقل وصف المتجر عن حرفين')
    }else if(selectedPosition?.value?.lat === undefined || selectedPosition?.value?.lng === undefined){
      handleToast('error' , 'يجب أن تحدد موقع المتجر')
    }else{
      let storeDetails = new FormData();
      storeDetails.append('image', body.value.image);
      storeDetails.append('email', body.value.email);
      storeDetails.append('identity_num', body.value.identity_num);
      storeDetails.append('commercial_register', body.value.commercial_register);
      storeDetails.append('market_name', body.value.name);
      storeDetails.append('market_description', body.value.description);
      storeDetails.append('city_id', body.value.city_id);
      storeDetails.append('bank_name', body.value.bank_name);
      storeDetails.append('account_number', body.value.account_number);
      //---------- handle fawmi map location ----------
      storeDetails.append('lat' , selectedPosition?.value?.lat)
      storeDetails.append('lng' , selectedPosition?.value?.lng)
      storeDetails.append('map_desc' , selectedPosition?.value?.map_desc?.city)

      postMethod('/api/merchant/complete-profile' , storeDetails , true , '/login' , 'toast')
    }
  }
</script>




<style lang="scss" scoped>
  .sign-page {
    form {
      label:not(.store-photo) {
        font-size: 18px;
        font-weight: 400;
        color: #1E1E1E;
        span {
          color: #DB3740;
        }
      }
      .upload {
        display: flex;
        align-items: center;
        label.store-photo {
          margin-inline-start: 30px;
          border: 1px dashed #B26FAC;
          border-radius: 6px;
          text-align: center;
          padding: 20px;
          cursor: pointer;
          i {
            font-size: 40px;
            color: #3368B1;
          }
          h3 {
            font-size: 16px;
            font-weight: 300;
            color: #979797;
          }
        }
      }
      .image-preview {
        cursor: pointer;
        img {
          width: 120px; // Adjust the width as necessary
          max-height: 120px; // Adjust the height as necessary
          border-radius: 6px;
          border: 1px solid #d9d9d9;
        }
      }
    }
  }
</style>
