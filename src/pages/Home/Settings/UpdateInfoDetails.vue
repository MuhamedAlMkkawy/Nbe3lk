<template>
  <div class="page-content">
    <h4>تغيير معلوماتي الشخصيه</h4>
    <form  @submit.prevent="handleSubmit">
      <div class="file-input">
        <label for="image">صورة شعار المتجر</label>
        <label for="image" class="image">
          <img 
            :src='disableEdit === true ? body.image : localImage' 
            alt="image" 
            loading="lazy"
          >
        </label>
        <input 
          type="file" 
          id="image" 
          hidden
          accept="image/*"
          @change="handleFileChange"
        >
      </div>
      <label for="name">إسم المتجر</label>
      <div class="input">
        <input 
          type="text" 
          id="name" 
          placeholder="أدخل إسم المتجر" 
          v-model="body.name"
        >
      </div>
      <label for="description">وصف المتجر</label>
      <div class="input">
        <input 
          type="text" 
          id="description" 
          placeholder="أدخل وصف المتجر" 
          v-model="body.description"
        >
      </div>
      <CitiesSelect
        :city="body.city" 
        @updateCity="updateCity"
      />
      <label for="map_desc" @click="handleShowMap">الموقع</label>
      <div class="input location" id="map_desc" @click="handleShowMap">
        <!-- <input 
          type="text" 
          placeholder="أدخل الموقع" 
          v-model="body.map_desc" 
          id="map_desc"
          disabled
        > -->
        <span>
            {{ 
              selectedPosition?.map_desc?.city ?? body?.map_desc
            }}
          </span>
        <i class="pi pi-map-marker"></i>
      </div>
      <label for="commercial-register">السجل التجاري</label>
      <div class="input">
        <input 
          type="text" 
          placeholder="أدخل السجل التجاري" 
          v-model="body.commercial_register" 
          id="commercial-register"
        >
      </div>
      <label for="identity_num">الهوية الوطنية لممثل الجهة</label>
      <div class="input">
        <input 
          type="text" 
          placeholder="أدخل الهوية الوطنية لممثل الجهة" 
          v-model="body.identity_num" 
          id="identity_num"
        >
      </div>
      <label for="bank_name">إسم البنك</label>
      <div class="input">
        <input 
          type="text" 
          placeholder="أدخل إسم البنك" 
          v-model="body.bank_name" 
          id="bank_name"
        >
      </div>
      <label for="bank-account">رقم الحساب البنكي</label>
      <div class="input">
        <input 
          type="text" 
          placeholder="أدخل رقم الحساب البنكي" 
          v-model="body.account_number" 
          id="bank-account"
        >
      </div>
      <label for="email">البريد الالكتروني</label>
      <div class="input">
        <input 
          type="email" 
          placeholder="أدخل البريد الالكتروني" 
          v-model="body.email" 
          id="email"
        >
      </div>
      <button class="main-btn">حفظ التعديلات</button>
    </form>
  </div>
  <!----------------------------------- Google Map ------------------------------------->
  <MapPopup 
    v-if="showMap"
    :selectedPosition="selectedPosition"
    :lat="Number(selectedPosition?.lat)"
    :lng="Number(selectedPosition?.lng)"
    @handleShowMap="handleShowMap"
    @handleMapClick="handleMapClick"
  />
  <!--------------------------------- Progress Popup ----------------------------------->
  <ProgressPopup
    v-if="showProgressPopup"
    :progressText="progressText"
  />
  <!-------------------------- to handle Prime Vue Toast Error -------------------------->
  <Toast 
    ref="toast"
    position="bottom-right"
  />
  <!-------------------------------------- Loading -------------------------------------->
  <Loading 
    v-if="loading"
  />  
  <!-- {{ Number(resultGet?.data?.lat) }} -->
</template>

<script setup>
  import {onMounted, ref, watch} from 'vue'
  import ProgressPopup from '../../../components/Popups/ProgressPopup.vue'
  import useApiMethods from '../../../mixins/ApiMethods';
  import MapPopup from '../../../components/Popups/MapPopup.vue';
  import CitiesSelect from '../../../components/SelectInputs/CitiesSelect.vue';
  import Toast from 'primevue/toast'
  import useFawmiMap from '../../../mixins/handleMap';
  import Loading from '../../../components/Loading.vue'


  // // to handle disable edit btn if there is no edit exists
  const disableEdit = ref(true)

  // to handle api methods from its file
  const {
    getMethod,
    resultGet,
    postMethod,
    toast,
    progressText,
    showProgressPopup, 
    loading
  } = useApiMethods()

    // to handle fawmi google maps popup
    const {
    showMap,
    handleShowMap,
    selectedPosition,
    handleMapClick
  } = useFawmiMap() 


  // to handle Store Info 
  const body = ref({
    image : '',
    name : '',
    description : '',
    city : '',
    city_id : '',
    map_desc : '',
    commercial_register : '',
    identity_num:'', 
    bank_name:'',
    account_number : '',
    email : '',
    lat : '',
    lng :'',
    map_desc : selectedPosition?.value?.map_desc?.city || ''
  })

  // to handle show uploaded local image
  const localImage = ref('')

  // to check if the image changed to be sent to the backend
  const imageChanged = ref(false)


  // to handle upload image
  const handleFileChange = (event) => {
    imageChanged.value=true
    disableEdit.value = false
    const file = event.target.files[0];
    body.value.image = file;
    if(file){
      localImage.value = URL.createObjectURL(file)
    }
  };


  // to handle submit form
  const handleSubmit = () =>{
    let userDetails = new FormData();
    if(imageChanged.value){
      userDetails.append('image', body.value.image);
    }
    userDetails.append('market_name', body.value.name);
    userDetails.append('market_description', body.value.description);
    // userDetails.append('location', body.value.location);
    userDetails.append('commercial_register', body.value.commercial_register);
    userDetails.append('identity_num', body.value.identity_num);
    userDetails.append('city_id', body.value.city_id);
    userDetails.append('bank_name', body.value.bank_name);
    userDetails.append('account_number', body.value.account_number);
    userDetails.append('email', body.value.email);
    //---------- handle fawmi map location ----------
    userDetails.append('lat' , Number(selectedPosition?.value?.lat) || body.value.lat)
    userDetails.append('lng' , Number(selectedPosition?.value?.lng) || body.value.lng)
    userDetails.append('map_desc' , selectedPosition?.value?.map_desc?.city || body.value.map_desc)
    postMethod('/api/merchant/update-request' , userDetails , true , '/home/settings' , 'toast')
  }


  // to handle update city from cities select
  const updateCity = (newCity) =>{
    body.value.city_id = newCity
  }


  watch(resultGet, (newVal) => {
    if (newVal) {
      body.value.image = newVal.data.image;
      body.value.name = newVal.data.market_name;
      body.value.description = newVal.data.market_description;
      body.value.city = newVal.data.city;
      body.value.city_id = newVal.data.city_id;
      body.value.commercial_register = newVal.data.commercial_register;
      body.value.identity_num = newVal.data.identity_num;
      body.value.bank_name = newVal.data.banks?.bank_name;
      body.value.account_number = newVal.data.banks?.account_number;
      body.value.email = newVal.data.email;
      body.value.map_desc = newVal.data.map_desc;
      body.value.lat = Number(newVal.data.lat);
      body.value.lng = Number(newVal.data.lng);
    }
  });



  onMounted(()=>{
    getMethod('/api/merchant/profile' , true)
  })

</script>

<style lang="scss" scoped>
  .page-content{
    h4{
      font-size: 20px;
    }
    form{
      max-width: unset;
      .file-input{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        .image{
          width: 100px;
          height: 100px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
        }
      }
    }
  }
</style>