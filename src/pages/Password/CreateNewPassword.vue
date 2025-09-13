<template>
  <div class="sign-page page">
    <div class="content">
      <div class="image">
        <img src="../../assets/images/logo.png" alt="logo image" loading="lazy">
      </div>
      <h1>كلمة المرور الجديدة</h1>
      <form action="">
        <label for="password">كلمه المرور</label>
        <div class="input">
          <input 
            id="password" 
            :type="passwordVision? 'text' : 'password'" 
            placeholder="أدخل كلمه المرور"  
            v-model="body.password"
          >
          <button type="button" class="image vision-btn" @click="controlPasswordVision">
            <i v-if="passwordVision" class="pi pi-eye-slash"></i>
            <i v-else class="pi pi-eye"></i>
          </button>
        </div>
        <label for="password_confirmation">تأكيد كلمه المرور</label>
        <div class="input">
          <input 
            id="password_confirmation" 
            :type="passwordVisionConfirm? 'text' : 'password'" 
            placeholder="أدخل كلمه المرور"  
            v-model="body.password_confirmation"
          >
          <button type="button" class="image vision-btn" @click="controlPasswordVisionConfirm">
            <i v-if="passwordVisionConfirm" class="pi pi-eye-slash"></i>
            <i v-else class="pi pi-eye"></i>
          </button>
        </div>
        <button @click="handleSubmit" type="submit" class="main-btn">
          حفظ
        </button>
      </form>
    </div>
  </div>
  <!---------------------------------- to handle Toast ---------------------------------->
  <Toast 
    ref="toast"
    position="bottom-right"
  />
  <!--------------------------------- to handle Loading --------------------------------->
  <Loading v-if="loading" />
</template>

<script setup>
  import {ref} from 'vue'
  import 'primeicons/primeicons.css'
  import useApiMethods from '../../mixins/ApiMethods';
  import Toast from 'primevue/toast'
  import Loading from '../../components/Loading.vue'



  // to handle api methods
  const {
    postMethod,
    loading,
    toast
  } = useApiMethods()
  // to handle password vision
  const passwordVision = ref(false);
  function controlPasswordVision(){
    passwordVision.value = !passwordVision.value;
  }

  // to handle password confirm vision
  const passwordVisionConfirm = ref(false);
  function controlPasswordVisionConfirm(){
    passwordVisionConfirm.value = !passwordVisionConfirm.value;
  }

  // to handle body
  let body = ref({
    country_code : '966' , 
    phone : window.sessionStorage.getItem('customer_phone') , 
    code : window.sessionStorage.getItem('activation_code') ,
    password : '' , 
    password_confirmation:''
  });


  const handleSubmit = () => {
    postMethod('/api/merchant/reset-password' , body.value , true , '/login' , 'toast') 
  }
</script>

<style lang="scss" scoped>

</style>