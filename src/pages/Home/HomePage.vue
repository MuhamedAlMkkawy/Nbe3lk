<template>
  <div class="home-page page">
    <Sidebar 
      @handleShowLogoutPopUp="handleShowLogoutPopUp"
      :fullSideBarSize="fullSideBarSize" 
      @controlFullSideBarSize="controlFullSideBarSize"
    />

    <div :class="['element-content ' , fullSideBarSize === true ? '' : 'active']">
      <Greet />
      <hr>
      <div class="body-content">
        <RouterView />
      </div>
    </div>
  </div>


  <!-- ----------------------------------- logout popup ----------------------------------- -->
  <LogoutPopup
    v-if="showLogoutPopUp === true"  
    @handleShowLogoutPopUp="handleShowLogoutPopUp"
    @handleLogOut = "handleLogOut"
  />


  <!-------------------------- to handle Prime Vue Toast Error -------------------------->
  <Toast 
    ref="toast"
    position="bottom-right"
  />
  
  <!-------------------------------------- Loading -------------------------------------->
  <Loading v-if="loading"/>

</template>

<script setup>
  import Sidebar from '../../components/Sidebar.vue';
  import Greet from '../../components/Greet.vue';
  import LogoutPopup from '../../components/Popups/LogoutPopup.vue';
  import { ref , onMounted } from 'vue';
  import { RouterView } from 'vue-router';
  import useApiMethods from '../../mixins/ApiMethods';
  import Loading from '../../components/Loading.vue';
  import Toast from 'primevue/toast';
  import getDeviceInfo from '../../deviceInfo';
  import { deleteCookie } from '../../mixins/Cookies';
  import { useRouter } from 'vue-router';


  // to get device information
  const deviceInfo = ref(null);

  onMounted(async () => {
    deviceInfo.value = await getDeviceInfo();
  });


  // to handle post method from api methods file
  const {
    toast , 
    loading
  } = useApiMethods()
  
  // to handle LogOut popup ---------------------------------------------
  const showLogoutPopUp = ref(false);
  const handleShowLogoutPopUp = () =>{
    showLogoutPopUp.value = !showLogoutPopUp.value
  }

  // to handle log out
  const router = useRouter()
  const handleLogOut = () =>{
    const body = {
      device_id : deviceInfo.value.deviceId
    }
    handleShowLogoutPopUp()
    // postMethod('/api/merchant/logout' , body , true , '/login' , 'toast')
    deleteCookie('token')
    window.localStorage.clear()
    router.push('/login')
  }

  // to control the size of the side Bar ------------------------------
  const fullSideBarSize = ref(
    window.sessionStorage.getItem('fullSideBarSize') === 'true' ||
    (window.sessionStorage.getItem('fullSideBarSize') === null && true)
  );
  function controlFullSideBarSize(){
    // console.log(fullSideBarSize.value)
    window.sessionStorage.setItem('fullSideBarSize' , !fullSideBarSize.value)
    fullSideBarSize.value = !fullSideBarSize.value
  }

</script>

<style lang="scss" scoped>
  .home-page{
    background-color: #F8F8FF;
    .element-content{
      padding: 0 15px;
      margin-inline-start: 300px;
      transition: 1s;
      &.active{
        margin-inline-start: 0;
      }
      @media (max-width : 1200px){
        margin-inline-start: 0;
      }
    }
  }
</style>