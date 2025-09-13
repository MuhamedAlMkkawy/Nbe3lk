<template>
  <div class="page-content">
    <h4>الإعدادات</h4>
    <ul>
      <li>
        <RouterLink class="settings-tab" to="/home/update-info-details/">
          <div class="icon">
            <i class="pi pi-pencil"></i>
          </div>
          <h3>تغيير معلوماتي الشخصية</h3>
          <i class="pi pi-angle-left"></i>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="settings-tab" to="/home/update-phone">
          <div class="icon">
            <i class="pi pi-mobile"></i>
          </div>
          <h3>تغيير رقم الجوال</h3>
          <i class="pi pi-angle-left"></i>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="settings-tab" to="/home/update-password/">
          <div class="icon">
            <i class="pi pi-lock"></i>
          </div>
          <h3>تغيير كلمة المرور</h3>
          <i class="pi pi-angle-left"></i>
        </RouterLink>
      </li>
      <li class="settings-tab" @click="handleNotification">
        <div class="icon">
          <i class="pi pi-bell"></i>
        </div>
        <h3>الإشعارات</h3>
        <button class="toggle-switch" :style="checked === true ? 'background:#73AF00;' : 'background:#434343;'">
          <div class="circle" :style="checked === true ? 'inset-inline-start: 22px;' : 'inset-inline-start: 3px;'"></div>
        </button>
      </li>
      <li class="settings-tab" @click="handleShowDeleteAccountPopup">
        <div class="icon">
          <i class="pi pi-sign-out"></i>
        </div>
        <h3>حذف الحساب</h3>
        <i class="pi pi-angle-left"></i>
      </li>
    </ul>
  </div>


  <!-- ---------------Delete Account Popup -------------------- -->
  <DeleteAccountPopup 
    v-if="showDeleteAccountPopup === true"
    @handleShowDeleteAccountPopup ="handleShowDeleteAccountPopup"
    @handleDeleteAccount="handleDeleteAccount"
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
  import { RouterLink } from 'vue-router';
  import { onMounted, ref, watch } from 'vue';
  import DeleteAccountPopup from '../../../components/Popups/DeleteAccountPopup.vue'
  import useApiMethods from '../../../mixins/ApiMethods'
  import Toast from 'primevue/toast';
  import Loading from '../../../components/Loading.vue'

  // to handle methods from api methods file
  const {
    getMethod,
    patchMethod,
    deleteMethod,
    resultGet,
    resultPatch,
    toast,
    loading
  } = useApiMethods()

  // handle notifications  
  const checked = ref()
  const handleNotification = () =>{
    patchMethod('/api/merchant/switch-notify' , true)
    // checked.value = !checked.value
    checked.value = resultPatch?.data?.data?.notify
  }

  // handle show delete account popup 
  const showDeleteAccountPopup = ref(false)
  const handleShowDeleteAccountPopup = () =>{
    showDeleteAccountPopup.value = !showDeleteAccountPopup.value
  }

  // to handle delete account 
  const handleDeleteAccount = () =>{
    deleteMethod('/api/merchant/delete-account' , true , 'progress' , '')
  }

  // to fetch the basic notify value from profile data 
  watch(resultGet , (oldVal , newVal)=>{
    if(oldVal !== newVal){
      checked.value = resultGet?.value?.data?.is_notify
    }
  })

  
  // to fetch the notify value after edit it
  watch(resultPatch , (oldVal , newVal)=>{
    if(oldVal !== newVal){
      checked.value = resultPatch?.value?.data?.data?.notify
    }
  })

  onMounted(()=>{
    getMethod('/api/merchant/profile', true);
  })
</script>

<style lang="scss" scoped>
.page-content{
  padding-bottom: 20px;
  min-height: 80vh;
  ul{
    li{
      cursor: pointer;
      &:not(:last-of-type){
        margin-bottom: 10px;
      }
      &:last-of-type{
        background: rgba(#DB3740 , 0.4);
        .icon{
          background-color: #DB3740;
          i{
            color: #fff;
            transform: rotateY(180deg);
          }
        }
        h3{
          color:#fff;
        }
        .pi-angle-left{
          color:#fff;
        }
        &:hover{
          background: #DB3740;
        }
      }
    }
    .settings-tab{
      display: flex;
      align-items: center;
      gap: 10px;
      position: relative;
      padding: 10px;
      border: 1px solid #EFEFEF;
      border-radius: 10px;
      transition: 0.3s;
      .icon{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgb(#B26FAC , 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        i{
          color: #B26FAC;
        }
      }
      h3{
        font-size: clamp(14px , 4vw , 18px);
        font-weight: 500;
        color: #434343;
        transition: 0s;
      }
      i.pi-angle-left , 
      button.toggle-switch{
        position: absolute;
        inset-inline-end: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
      button.toggle-switch{
        width: 40px;
        height: 20px;
        border-radius: 20px;
        background: #434343;
        transition: 1s;
        .circle{
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          transition: 1s;
        }
      }
      &:hover{
        background: rgba(#B26FAC , 0.6);
        .icon{
          border: 1px solid #fff;
        }
        i{
          color: #fff;
        }
        h3{
          color: #fff;
        }
      }
    }
  }
}
</style>