<template>
  <div class="sign-page page">
    <div class="content">
      <div class="image">
        <img src="../../assets/images/logo.png" alt="logo image" loading="lazy">
      </div>
      <h1>إستعادة كلمة المرور</h1>
      <form action="">
        <label for="phone">رقم الجوال</label>
        <div class="input">
          <input 
            type="tel" 
            placeholder="أدخل رقم الجوال"
            v-model="body.phone"
          >
          <div class="text">
            <span>+{{body.country_code}}</span>
            <div class="image">
              <img src="../../assets/images/saudi.png" alt="img" loading="lazy">
            </div>
          </div>
        </div>
        <button type="submit" @click="handleSubmit" class="main-btn">
          التأكيد
        </button>
      </form>
    </div>
  </div>
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
  import useApiMethods from '../../mixins/ApiMethods';
  import Toast from 'primevue/toast';
  import Loading from '../../components/Loading.vue'



  // to handle using api methods
  const {
    postMethod,
    loading,
    toast
  } = useApiMethods()


  // to handle body
  const body = ref({
    country_code : '966',
    phone : ''
  })


  const handleSubmit = () =>{
    window.sessionStorage.setItem('customer_phone' , body.value.phone)
    postMethod('/api/merchant/forget-password' , body.value , true , '/password-activation-code' , 'toast')
  }
</script>

<style lang="scss" scoped>

</style>