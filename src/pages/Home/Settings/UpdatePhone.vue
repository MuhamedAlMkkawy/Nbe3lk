<template>
  <div class="page-content">
    <h4>تغيير رقم الجوال</h4>
    <div class="sign-page">
      <div class="content">
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
          <label for="phone">رقم الجوال</label>
          <div class="input">
            <input 
              type="tel" 
              placeholder="أدخل رقم الجوال"
              v-model="body.phone"
            >
            <div class="text">
              <span>{{body.country_code}}+</span>
              <div class="image">
                <img src="../../../assets/images/saudi.png" alt="img" loading="lazy">
              </div>
            </div>
          </div>
          <button type="submit" @click="handleSubmit" class="main-btn">
            التأكيد
          </button>
        </form>
      </div>
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
  import { ref } from 'vue';
  import useApiMethods from '../../../mixins/ApiMethods';
  import Toast from 'primevue/toast';
  import Loading from '../../../components/Loading.vue'


  // to handle input vision of password
  const passwordVision = ref(false);
  function controlPasswordVision(){
    passwordVision.value = !passwordVision.value;
  }

  // to handle api methods 
  const {
    postMethod,
    toast,
    loading
  } = useApiMethods()


  // to handle body values
  const body = ref({
    country_code: '966',
    phone: '',
    password : '',
  })

  // to handle submit form
  const handleSubmit = () =>{
    window.sessionStorage.setItem('customer_phone' , body.value.phone)
    postMethod('/api/merchant/update/phone' , body.value , true , '/home/activation-newPhone' , 'progress')
  }
</script>

<style lang="scss" scoped>
form{
  max-width: 990px;
}
</style>