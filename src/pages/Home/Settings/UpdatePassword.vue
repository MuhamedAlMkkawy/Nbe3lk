<template>
  <div class="page-content">
    <h4>تغيير كلمة المرور</h4>
    <div class="content">
      <form action="">
        <label for="old_password">كلمه المرور القديمه</label>
        <div class="input">
          <input 
            id="old_password" 
            :type="oldPasswordVision? 'text' : 'password'" 
            placeholder="أدخل كلمه المرور"  
            v-model="body.old_password"
          >
          <button type="button" class="image vision-btn" @click="controlOldPasswordVision">
            <i v-if="oldPasswordVision" class="pi pi-eye-slash"></i>
            <i v-else class="pi pi-eye"></i>
          </button>
        </div>
        <label for="password">كلمه المرور الجديده</label>
        <div class="input">
          <input 
            id="password"  
            :type="newPasswordVision? 'text' : 'password'" 
            placeholder="أدخل كلمه المرور"  
            v-model="body.password"
          >
          <button type="button" class="image vision-btn" @click="controlNewPasswordVision">
            <i v-if="newPasswordVision" class="pi pi-eye-slash"></i>
            <i v-else class="pi pi-eye"></i>
          </button>
        </div>
        <label for="password_confirmation">تأكيد كلمه المرور الجديدة</label>
        <div class="input">
          <input 
            id="password_confirmation" 
            :type="confirmPasswordVision? 'text' : 'password'" 
            placeholder="أدخل كلمه المرور"  
            v-model="body.password_confirmation"
          >
          <button type="button" class="image vision-btn" @click="controlConfirmPasswordVision">
            <i v-if="confirmPasswordVision" class="pi pi-eye-slash"></i>
            <i v-else class="pi pi-eye"></i>
          </button>
        </div>
        <button @click="handleSubmit" type="submit" class="main-btn">
          حفظ
        </button>
      </form>
    </div>
  </div>
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
</template>

<script setup>
  import {ref} from 'vue'
  import 'primeicons/primeicons.css'
  import ProgressPopup from '../../../components/Popups/ProgressPopup.vue'
  import useApiMethods from '../../../mixins/ApiMethods';
  import Toast from 'primevue/toast'
  import Loading from '../../../components/Loading.vue'


  // to handle api methods
  const {
    progressText,
    showProgressPopup,
    toast,
    loading,
    putMethod
  } = useApiMethods()

  // to handle vision of old password input
  const oldPasswordVision = ref(false);
  function controlOldPasswordVision(){
    oldPasswordVision.value = !oldPasswordVision.value;
  }
  
  
  // to handle vision of new password input
  const newPasswordVision = ref(false);
  function controlNewPasswordVision(){
    newPasswordVision.value = !newPasswordVision.value;
  }
  
  
  // to handle vision of confirm password input
  const confirmPasswordVision = ref(false);
  function controlConfirmPasswordVision(){
    confirmPasswordVision.value = !confirmPasswordVision.value;
  }


  let body = ref({old_password: '', password : '' , password_confirmation:''});

  const handleSubmit = () =>{
    putMethod('/api/merchant/update-password' , body.value , true , '/' , 'progress')
    
  }

</script>

<style lang="scss" scoped>
  .content{
    margin-block-start: 30px;
    form{
      max-width: 990px;
    }
  }
</style>