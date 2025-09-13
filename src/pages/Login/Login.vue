<template>
  <div class="page sign-page">
    <div class="content">
      <div class="image">
        <img src="../../assets/images/logo.png" alt="logo image" loading="lazy">
      </div>
      <h1>تسجيل الدخول</h1>
      <form action="">
        <div class="users-type">
          <h4 
            :class="{ 'active': formInputs.type === 'merchant_employee' }" 
            @click="handleUserType('merchant_employee')">
            عامل
          </h4>
          <h4 
            :class="{ 'active': formInputs.type === 'merchant' }"
            @click="handleUserType('merchant')">
            صاحب متجر
          </h4>
        </div>
        <label for="phone">رقم الجوال</label>
        <div class="input">
          <input 
            type="tel" 
            placeholder="أدخل رقم الجوال"
            v-model="formInputs.phone"  
          >
          <div class="text">
            <span>+{{ formInputs.country_code }}</span>
            <div class="image">
              <img src="../../assets/images/saudi.png" alt="img" loading="lazy">
            </div>
          </div>
        </div>
        <label for="phone">كلمه المرور</label>
        <div class="input">
          <input 
            :type="passwordVision? 'text' : 'password'"
            placeholder="أدخل كلمه المرور"
            v-model="formInputs.password"  
          >
          <button type="button" class="image vision-btn" @click="controlPasswordVision">
            <i v-if="passwordVision" class="pi pi-eye-slash"></i>
            <i v-else class="pi pi-eye"></i>
          </button>
        </div>
        <RouterLink to="/password-recover">هل نسيت كلمه المرور؟</RouterLink>
        <button type="submit" @click="handleSubmit" class="main-btn">
          تسجيل الدخول
        </button>
        <h4>ليس لديك حساب ؟ <routerLink to="/create-account">إنشاء حساب جديد</routerLink></h4>
      </form>
    </div>
  </div>
  <!-------------------------- to handle Prime Vue Toast Error -------------------------->
  <Toast 
    ref="toast"
    position="bottom-right"
  />
  <!-------------------------------------- Loading -------------------------------------->
  <Loading v-if="loading"/>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue';
  import getDeviceInfo from '../../deviceInfo';
  import Toast from 'primevue/toast';
  import useApiMethods from '../../mixins/ApiMethods';
  import Loading from '../../components/Loading.vue';
  import { useRouter } from 'vue-router';


  // to handle post method from api methods file
  const {postMethod , resultPost , loading , toast} = useApiMethods()

  // to get device information
  const deviceInfo = ref(null);

  onMounted(async () => {
    deviceInfo.value = await getDeviceInfo();
  });


  // to handle password vision
  const passwordVision = ref(false);
  function controlPasswordVision(){
    passwordVision.value = !passwordVision.value;
  }
  
  // to handle formInputs
  const formInputs = ref({
    phone : '',
    country_code : '966',
    password : '',
    device_id : deviceInfo?.deviceId,
    type:'merchant'
  })

  // to handle the logging user if merchant / employee
  const handleUserType = (user) =>{
    formInputs.value.type = user
  }

  // to handle submit form
  const handleSubmit = () => {
    const body = {
      phone :formInputs.value.phone,
      country_code : formInputs.value.country_code ,
      password : formInputs.value.password,
      device_id : deviceInfo?.value?.deviceId,
      device_type : 'web',
      lang : 'ar',
      type : formInputs.value.type
    }

    // to handle post data to endpoint
    postMethod('/api/merchant/login' , body , false , '/home/last-orders' , 'toast')
    window.sessionStorage.setItem('customer_phone' , formInputs.value.phone)
    
    // to handle router
    const router = useRouter()

    // to watch result data after logged in
    watch(resultPost , (oldVal , newVal)=>{
      if(oldVal !== newVal){
        window.localStorage.setItem('userInfo' , JSON.stringify(resultPost.value.data.data))
      }
      else if(!resultPost?.value?.data?.data?.is_profile_complete){
        router.push('/store-details')
      }
    })
  }
</script>

<style lang="scss" scoped>
form {
  .users-type{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-end: 30px;
    h4{
      font-size: clamp(16px , 2.5vw , 20px);
      font-weight: 400;
      cursor: pointer;
      &.active{
        color: #293E79;
        font-weight: 600;
        border-bottom: 2px solid;
      }
    }
  }
  .input span{
    direction: ltr;
  }
}
</style>