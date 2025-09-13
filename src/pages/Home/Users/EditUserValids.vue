<template>
  <div class="page-content">
    <h4>تعديل مستخدم</h4>
    <form action="">
      <div class="inputs">
        <div class="input-wrap">
          <label for="name">إسم المستخدم</label>
          <div class="input">
            <input 
              type="text" 
              id="name" 
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
              v-model="body.confirmPassword"
            >
            <button type="button" class="image vision-btn" @click="controlConfirmPasswordVision">
              <i v-if="confirmPasswordVision" class="pi pi-eye-slash"></i>
              <i v-else class="pi pi-eye"></i>
            </button>
          </div>
        </div>
      </div>
      <label for="valids">الصلاحيات</label>
      <div class="input">
        <MultiSelectPermissions
          :chosenPermissions="chosenPermissions"
          @handleValids="handleValids"
        />
      </div>
    </form>
  </div>
  <div class="page-content saveEdits">
    <button class="main-btn" @click="handleEditUser">
      حفظ التعديلات
    </button>
  </div>
  <!-- {{ console.table(resultGet?.data?.permissions) }} -->
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
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  import MultiSelectPermissions from '../../../components/SelectInputs/MultiSelectPermissions.vue';
  import ProgressPopup from '../../../components/Popups/ProgressPopup.vue';
  import Toast from 'primevue/toast';
  import useApiMethods from '../../../mixins/ApiMethods';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';

  const store = useStore()
  const route = useRoute()


  // to handle api methods
  const {
    getMethod,
    putMethod,
    resultGet,
    progressText,
    showProgressPopup,
    handleToast,
    toast
  } = useApiMethods()

  // to handle user data 
  const body = ref({
    name: '',
    phone: '',
    country_code : '',
    password: '',
    email : store.state.storeUserData?.email || JSON.parse(window.localStorage.getItem('userInfo')).email,
    confirmPassword: '',
    permissions : []
  });

  const chosenPermissions = ref([])

  // to handle vision of password input
  const passwordVision = ref(false);
  const controlPasswordVision = () => {
    passwordVision.value = !passwordVision.value;
  };
  
  // to handle vision of password confirm input
  const confirmPasswordVision = ref(false);
  const controlConfirmPasswordVision = () => {
    confirmPasswordVision.value = !confirmPasswordVision.value;
  };

  // to handle edit user data
  const handleEditUser = () => {
    if(body.value.password !== body.value.confirmPassword){
      handleToast('error' , 'كلمات المرور يجب أن تكون متطابقه')
    }else{
      putMethod(`/api/merchant/employees/${route.params.id}` , body.value , true , '/home/users' , 'progress')
    }
  };

  // to handle chosen valids
  const handleValids = (validsItems) => {
    body.value.permissions = []
    validsItems.value.forEach((validsItem, index) => {
      body.value.permissions.push(validsItem.id);
    });
  };


  watch(resultGet , (oldVal , newVal)=>{
    if(oldVal !== newVal){
      body.value.name = resultGet.value.data.name
      body.value.phone = resultGet.value.data.phone
      body.value.country_code = resultGet.value.data.country_code
      resultGet.value.data.permissions.forEach((permissionItem)=>{
        body.value.permissions.push(permissionItem.id)
        chosenPermissions.value.push(permissionItem)
      })
    }
  })

  onMounted(()=>{
    getMethod(`/api/merchant/employees/${route.params.id}` , true)
  })

</script>

<style lang="scss" scoped>
.page-content {
  padding-bottom: 20px;
  margin-bottom: 30px;
  &.saveEdits {
    display: flex;
    align-items: center;
  }
  form {
    max-width: unset;
    width: 100%;
    .inputs {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .input-wrap {
        width: 49%;
        margin-bottom: 20px;
        .input {
          i {
            color: #B26FAC;
          }
        }
      }
      @media (max-width: 767px) {
        flex-wrap: wrap;
        .input-wrap {
          width: 100%;
        }
      }
    }
  }
  .main-btn {
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
