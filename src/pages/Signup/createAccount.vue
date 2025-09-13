<template>
  <div class="sign-page page">
    <div class="content">
      <div class="image">
        <img src="../../assets/images/logo.png" alt="logo image" loading="lazy">
      </div>
      <h1>إنشاء حساب</h1>
      <form action="" @submit.prevent="handleSubmit">
        <label for="name">إسم المستخدم</label>
        <div class="input">
          <input 
            id="name" 
            type="text" 
            placeholder="أدخل اسم المستخدم" 
            v-model="formInputs.username"
          >
        </div>
        <label for="phone">رقم الجوال</label>
        <div class="input">
          <input 
            id="phone" 
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
        <label for="password">كلمه المرور</label>
        <div class="input">
          <input id="password" :type="passwordVision? 'text' : 'password'" placeholder="أدخل كلمه المرور"  v-model="formInputs.password">
          <button type="button" class="image vision-btn" @click="controlPasswordVision">
            <i v-if="passwordVision" class="pi pi-eye-slash"></i>
            <i v-else class="pi pi-eye"></i>
          </button>
        </div>
        <label for="passwordConfirmation">تأكيد كلمه المرور</label>
        <div class="input">
          <input id="passwordConfirmation" :type="passwordVisionConfirmation? 'text' : 'password'" placeholder="أدخل كلمه المرور"  v-model="formInputs.passwordConfirmation">
          <button type="button" class="image vision-btn" @click="controlPasswordVisionConfirmation">
            <i v-if="passwordVisionConfirmation" class="pi pi-eye-slash"></i>
            <i v-else class="pi pi-eye"></i>
          </button>
        </div>
        <button type="submit" class="main-btn">
          التالي
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


  <!-------------------------------------- Loading -------------------------------------->
  <Loading v-if="loading"/>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import 'primeicons/primeicons.css'
  import getDeviceInfo from '../../deviceInfo';
  import Toast from 'primevue/toast';
  import Loading from '../../components/Loading.vue';
  import useApiMethods from '../../mixins/ApiMethods';

  // to handle Post Method
  const {postMethod , toast , loading , handleToast} = useApiMethods()


  // to get device information
  const deviceInfo = ref(null);

  onMounted(async () => {
    deviceInfo.value = await getDeviceInfo();
  });


  // to handle input vision of password
  const passwordVision = ref(false);
  function controlPasswordVision(){
    passwordVision.value = !passwordVision.value;
  }

  // to handle input vision of password Confirmationation 
  const passwordVisionConfirmation = ref(false);
  function controlPasswordVisionConfirmation(){
    passwordVisionConfirmation.value = !passwordVisionConfirmation.value;
  }

  
  // to handle form inputs
  let formInputs = ref(
    {
      username : '' ,
      phone : '' ,
      country_code : '966', 
      password : '' , 
      passwordConfirmation:''
    }
  );


  
  const handleSubmit = () => {
    const body = {
      name : formInputs.value.username,
      country_code : formInputs.value.country_code ,
      phone :formInputs.value.phone,
      password : formInputs.value.password,
      password_confirmation : formInputs.value.passwordConfirmation,
      device_id : deviceInfo.value.deviceId,
      device_type : 'web',
      identifier_type : 'phone'
    }
    if(formInputs.value.password !== formInputs.value.passwordConfirmation){
      handleToast('error' , 'يجب أن تكون كلمات المرور متطابقه')
    }
    else if(formInputs.value.username.length < 2){
      handleToast('error' , 'يجب ألا يقل الاسم عن حرفين')
    }
    else{
      window.sessionStorage.setItem('customer_phone' , formInputs.value.phone)
      loading.value = true
      postMethod('/api/merchant/register' , body , false ,'/activation-code' , 'toast')
    }
  }

</script>

<style lang="scss" scoped>
  form .input span{
    direction: ltr;
  }
</style>