<template>
  <div class="page-content">
    <h4>إضافة مستخدم</h4>
    <form action="">
      <div class="inputs">
        <div class="input-wrap">
          <label for="name">إسم المستخدم</label>
          <div class="input">
            <input 
              type="text" 
              id="name" 
              placeholder="إسم المستخدم" 
              v-model="body.name"
            >
          </div>
        </div>
        <div class="input-wrap">
          <label for="phone">رقم الجوال</label>
          <div class="input">
            <input 
              id="phone" 
              type="tel" 
              placeholder="رقم الجوال" 
              v-model="body.phone"
            >
            <div class="text">
              <span>{{body.country_code}}+</span>
              <div class="image">
                <img src="../../../assets/images/saudi.png" alt="img" loading="lazy">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="inputs">
        <div class="input-wrap">
          <label for="password">كلمه المرور</label>
          <div class="input">
            <input 
              id="password" 
              :type="passwordVision ? 'text' : 'password'" 
              placeholder="كلمه المرور" 
              v-model="body.password"
            >
            <button type="button" class="image vision-btn" @click="controlPasswordVision">
              <i v-if="passwordVision" class="pi pi-eye-slash"></i>
              <i v-else class="pi pi-eye"></i>
            </button>
          </div>
        </div>
        <div class="input-wrap">
          <label for="confirmPassword">تأكيد كلمة المرور</label>
          <div class="input">
            <input 
              id="confirmPassword" 
              :type="confirmPasswordVision ? 'text' : 'password'" 
              placeholder="تأكيد كلمة المرور" 
              v-model="body.confirmPassword"
            >
            <button type="button" class="image vision-btn" @click="controlconfirmPasswordVision">
              <i v-if="confirmPasswordVision" class="pi pi-eye-slash"></i>
              <i v-else class="pi pi-eye"></i>
            </button>
          </div>
        </div>
      </div>
      <label for="valids">الصلاحيات</label>
      <div class="input">
        <MultiSelectPermissions
          @handleValids="handleValids"
        />
      </div>
    </form>
  </div>
  <div class="page-content">
    <button class="main-btn" @click="handleAddUser">
      حفظ
    </button>

  <!-- --------------------------------- Progress Popup ----------------------------------- -->
  <ProgressPopup
    v-if="showProgressPopup"
    :progressText="progressText"
  />
  <!-------------------------- to handle Prime Vue Toast Error -------------------------->
  <Toast 
    ref="toast"
    position="bottom-right"
  />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import ProgressPopup from '../../../components/Popups/ProgressPopup.vue';
  import useApiMethods from '../../../mixins/ApiMethods';
  import Toast from 'primevue/toast';
  import { useStore } from 'vuex';
  import MultiSelectPermissions from '../../../components/SelectInputs/MultiSelectPermissions.vue';

  const store = useStore()
  // to handle api methods 
  const {
    postMethod,
    progressText,
    showProgressPopup,
    handleToast,
    toast
  } = useApiMethods()

  // to handle user data 
  const body = ref({
    name: '',
    phone: '',
    country_code : '966',
    password: '',
    // email : store.state.storeUserData?.email || JSON.parse(window.localStorage.getItem('userInfo')).email,
    confirmPassword: '',
    permissions : []
  });

  // to handle vision of password input
  const passwordVision = ref(false);
  const controlPasswordVision = () => {
    passwordVision.value = !passwordVision.value;
  };
  
  // to handle vision of confirm password input
  const confirmPasswordVision = ref(false);
  const controlconfirmPasswordVision = () => {
    confirmPasswordVision.value = !confirmPasswordVision.value;
  };

  // to handle chosen valids
  const handleValids = (validsItems) => {
    validsItems.value.forEach((validsItem, index) => {
      // Use push to add items to the array
      body.value.permissions.push(validsItem.id);
    });
  };

  // to handle add user
  const handleAddUser = () => {
    if(body.password !== body.confirmPassword){
      handleToast('error' , 'كلمات المرور يجب أن تكون متطابقه')
    }else{
      postMethod('/api/merchant/employees' , body.value , true , '/home/users' , 'progress')
    }
  };

</script>

<style lang="scss" scoped>
.page-content {
  padding-bottom: 20px;
  margin-bottom: 30px;
  &:last-child {
    display: flex;
    align-items: center;
  }
  form {
    max-width: unset;
    width: 100%;
  }
  .main-btn {
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
