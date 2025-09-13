<template>
  <div class="side-bar" :class="fullSideBarSize === true ? 'active' : ''">
    <div class="top-bar">
      <div class="image">
        <img src="../assets/images/logo.png" alt="img" loading="lazy">
      </div>
      <button class="minimize-btn image" @click="$emit('controlFullSideBarSize')">
        <img src="../assets/images/close.png" alt="img" loading="lazy">
      </button>
      <button :class="['maximize-btn image ' , fullSideBarSize === true ? '' : 'active']" @click="$emit('controlFullSideBarSize')">
        <img src="../assets/images/close.png" alt="img" loading="lazy">
      </button>
    </div>
    <hr>
    <div class="user-info">
      <div class="image">
        <img v-if="resultGet?.data?.image" :src="resultGet?.data?.image" alt="user_img" loading="lazy">
        <span v-else class="pi pi-user"></span>
      </div>
      <div class="user">
        <h3>{{resultGet?.data?.market_name}}</h3>
        <h4>{{resultGet?.data?.name }}</h4>
      </div>
    </div>
    <div class="side-tabs">
      <RouterLink to="/home/last-orders" :class="['tab ', {active: activeTab === 'last-orders'}]">
        <div class="image">
          <img src="../assets/images/medal.png" alt="img" loading="lazy">
        </div>
        <h3>الرئيسيه</h3>
      </RouterLink>
      <RouterLink to="/home/orders" :class="['tab ', {active: activeTab === 'orders'}]">
        <div class="image">
          <img src="../assets/images/orders.png" alt="img" loading="lazy">
        </div>
        <h3>الطلبات</h3> 
      </RouterLink>
      <ul>
        <li @click="handleActiveSecTab('all-orders')" :class="{active: activeSecTab === 'all-orders'}">
          <span>جميع الطلبات</span>
          <i class="pi pi-angle-left"></i>
        </li>
        <li @click="handleActiveSecTab('pending')" :class="{active: activeSecTab === 'pending'}">
          <span>جديده</span>
          <i class="pi pi-angle-left"></i>
        </li>
        <li @click="handleActiveSecTab('await_payment')" :class="{active: activeSecTab === 'await_payment'}">
          <span>قيد الدفع</span>
          <i class="pi pi-angle-left"></i>
        </li>
        <li @click="handleActiveSecTab('payed')" :class="{active: activeSecTab === 'payed'}">
          <span>تم الدفع</span>
          <i class="pi pi-angle-left"></i>
        </li>
        <li @click="handleActiveSecTab('preparing')" :class="{active: activeSecTab === 'preparing'}">
          <span>تحت الإجراء</span>
          <i class="pi pi-angle-left"></i>
        </li>
        <li @click="handleActiveSecTab('shipping_delivered')" :class="{active: activeSecTab === 'shipping_delivered'}">
          <span>تم التسليم للشحن</span>
          <i class="pi pi-angle-left"></i>
        </li>
        <li @click="handleActiveSecTab('user_delivered')" :class="{active: activeSecTab === 'user_delivered'}">
          <span>تم التسليم للعميل</span>
          <i class="pi pi-angle-left"></i>
        </li>
        <li @click="handleActiveSecTab('returning')" :class="{active: activeSecTab === 'returning'}">
          <span>جاري الإعادة</span>
          <i class="pi pi-angle-left"></i>
        </li>
        <li @click="handleActiveSecTab('completed')" :class="{active: activeSecTab === 'completed'}">
          <span>تم الإكتمال</span>
          <i class="pi pi-angle-left"></i>
        </li>
      </ul>
      <RouterLink to="/home/products" :class="['tab' , {active: activeTab === 'products'}]">
        <div class="image">
          <img src="../assets/images/shop.png" alt="img" loading="lazy">
        </div>
        <h3>المنتجات</h3>
      </RouterLink>
      <!-- <button @click="handleActiveTab('delivery')" :class="['tab ', activeTab === 'delivery' ? 'active' : '']">
        <div class="image">
          <img src="../assets/images/Scooter.png" alt="img" loading="lazy">
        </div>
        <h3>قيمه التوصيل</h3>
      </button> -->
      <RouterLink to="/home/reports" :class="['tab' , {active: activeTab === 'reports'}]">
        <div class="image">
          <img src="../assets/images/reports.png" alt="img" loading="lazy">
        </div>
        <h3>تقارير المنتجات</h3>
      </RouterLink>
      <RouterLink to="/home/ratings" :class="['tab' , {active: activeTab === 'ratings'}]">
        <div class="image">
          <img src="../assets/images/feature.png" alt="img" loading="lazy">
        </div>
        <h3>تقييماتي</h3>
      </RouterLink>
      <RouterLink to="/home/financial-transactions" :class="['tab financial-transactions' , {active: activeTab === 'financial-transactions'}]">
        <div class="image">
          <img src="../assets/images/money.png" alt="img" loading="lazy">
        </div>
        <h3>المعاملات الماليه</h3>
      </RouterLink>
      <ul>
        <li @click="handleActiveSecTab('finanicial-reports')" :class="{active: activeSecTab === 'finanicial-reports'}">
          <RouterLink to="/home/financial-transactions">
            <span>التقارير المالية</span>
            <i class="pi pi-angle-left"></i>
          </RouterLink>
        </li>
        <li @click="handleActiveSecTab('settlement-requests')" :class="{active: activeSecTab === 'settlement-requests'}">
          <RouterLink to="/home/settlement-applications">
            <span>طلبات التسوية</span>
            <i class="pi pi-angle-left"></i>
          </RouterLink>
        </li>
      </ul>
      <RouterLink to="/home/users"  :class="['tab' , {active: activeTab === 'users'}]">
        <div class="image">
          <img src="../assets/images/users.png" alt="img" loading="lazy">
        </div>
        <h3>المستخدمين</h3>
      </RouterLink>
      <RouterLink to="/home/settings" :class="['tab' , {active: activeTab === 'settings'}]">
        <div class="image">
          <img src="../assets/images/Settings.png" alt="img" loading="lazy">
        </div>
        <h3>الإعدادات</h3>
      </RouterLink>
      <RouterLink to="/home/contact" :class="['tab' , {active: activeTab === 'contact'}]">
        <div class="image">
          <img src="../assets/images/contact.png" alt="img" loading="lazy">
        </div>
        <h3>تواصل معنا</h3>
      </RouterLink>
    </div>
    <hr>
    <button @click="$emit('handleShowLogoutPopUp')" class="logout">
      <div class="image">
        <img src="../assets/images/Logout.png" alt="img" loading="lazy">
      </div>
      <span>تسجيل الخروج</span>
    </button>
  </div>
</template>

<script setup>
  import {onMounted, ref , watch} from 'vue'
  import { useRouter , useRoute, RouterLink  } from 'vue-router';
  import usePagination from '../mixins/Pagination';
  import useApiMethods from '../mixins/ApiMethods';


  // // to import pagination from its mixin
  const { 
    handleFilteredPagination,
    // resultGet
  } = usePagination()

  // to use api methods
  const {
    getMethod,
    resultGet
  } = useApiMethods()

  const storeData = ref({
    logo : JSON.parse(window.localStorage.getItem('userInfo')).image,
    market_name : JSON.parse(window.localStorage.getItem('userInfo')).market_name,
    name : JSON.parse(window.localStorage.getItem('userInfo')).name
  })

  // define emits
  defineEmits(['handleShowLogoutPopUp' , 'controlFullSideBarSize'])
  
  
  // define props
  defineProps({
    fullSideBarSize: {
      type: Boolean,
      required: true
    }
  })

  // to use router to push between routes
  const router = useRouter();

  // to get param data 
  const route = useRoute();

  
  // // to handle the logout process --------------------------------------------
  // const handleLogOut = () => {
  //   router.push('/login')
  // }


  // to handle the active main tab of the side bar ---------------------------
  const activeTab = ref(window.sessionStorage.getItem('activeTab') || 'last-orders')
  const handleActiveTab = (targetTab) =>{
    // to handle active tab 
    activeTab.value = targetTab

    // to store the value in session storage
    window.sessionStorage.setItem('activeTab' , targetTab)


    // router.push("/home/" + targetTab);

    if(targetTab === 'orders' || targetTab === 'last-orders'){
      handleActiveSecTab('all-orders')
    }
    if(targetTab === 'financial-transactions'){
      handleActiveSecTab('finanicial-reports')
    }
  }


  const activeSecTab = ref(window.sessionStorage.getItem('activeSecTab') || 'all-orders');

  const handleActiveSecTab = (targetTab) => {
    // To filter fetched orders data in pagination
    if(targetTab !== 'settlement-requests' && targetTab !== 'finanicial-reports'){
      handleFilteredPagination('/api/merchant/orders?page=', 1 , targetTab);
      location.reload()
    }

    // To handle value of active second tab 
    activeSecTab.value = targetTab;

    window.sessionStorage.setItem('activeSecTab', targetTab);
    
    if (activeTab.value === 'orders') {
      router.push('/home/orders');
    }
  };


  // Watch for route changes to handle the active tab
  watch(() => route.path, (newPath) => {
    const pathAfterHome = newPath.startsWith('/home/') ? newPath.substring(6) : '';
    if(pathAfterHome === 'orders'){
      window.sessionStorage.setItem('activeSecTab' , '')
    }
    // console.log(pathAfterHome)
    handleActiveTab(pathAfterHome);
  });


  onMounted(()=>{
    getMethod('/api/merchant/profile' , true)
  })

</script>

<style lang="scss" scoped>
  .side-bar{
    padding: 24px 15px;
    background: #fff;
    transition: 1s;
    overflow-y: scroll;
    width: 400px;
    position: fixed;
    inset-inline-start: -400px;
    top: 0;
    width: 300px;
    height: 100%;
    z-index: 99;
    box-shadow: 0 0 10px rgb(#000 , 0.4);
    &.active{
      inset-inline-start: 0;
    }
    &::-webkit-scrollbar{
      width: 5px;
    }
    .top-bar{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      // padding-bottom: 15px;
      margin-bottom: 15px;
      // border-bottom: 1px solid #0000002c;
      .image{
        width: 35px;
      }
      .minimize-btn{
        width: 35px;
        height: 35px;
        background: #B26FAC80;
        border-radius: 50%;
        padding: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          object-fit: contain;
        }
      }
      .maximize-btn{
        position: fixed;
        top: 60px;
        inset-inline-start: -35px;
        width: 35px;
        border-radius: 0 15px 15px 0;
        transform: rotateY(180deg);
        background: #B26FAC80;
        padding: 8px 10px;
        transition: 1s;
        z-index: 9;
        &.active{
          inset-inline-start: 0;
        }
      }
    }
    .user-info{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      background: #FCF9F7;
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 24px;
      .image{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        // border: 1px solid;
        background: #CBCBCB;
        flex-shrink: 0;
        span.pi{
          font-size: 35px;
        }
      }
      .user{
        h3{
          color: #B26FAC;
          font-size: clamp(16px , 4vw , 24px);
          font-weight: 500;
          margin-bottom: 4px;
          }
          h4{
            color: #434343;
            font-size: clamp(14px , 4vw , 16px);
            font-weight: 400;
          }
      }
    }
    .side-tabs{
      .tab{
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;
        justify-content: flex-start;
        padding: 14px 25px;
        border-radius: 9px;
        position: relative;
        z-index: 3;
        overflow: hidden;
        margin-bottom: 15px;
        width: 100%;
        &:hover{
          &::before{
            width: 100%;
          }
        }
        &::before{
          content:'';
          position: absolute;
          inset-inline-start: 0;
          top: 0;
          width: 0%;
          height: 100%;
          background: #293E79;
          z-index: -1;
          transition: 0.3s;
        }
        .image{
          width: 20px;
          filter: invert(25%) sepia(10%) saturate(18%) hue-rotate(336deg) brightness(94%) contrast(92%);
        }
        &:first-of-type{
          gap: 0;
          .image{
            width: 28px;
          }
        }
        h3{
          color: #434343;
          font-size: 20px;
          font-weight: 500;
        }
        &.active , &:hover{
          // background: #293E79;
          &::after{
            content:'';
            position: absolute;
            inset-inline-start: 14px;
            top: 50%;
            transform: translateY(-50%);
            height: 33px;
            width: 4px;
            border-radius: 0 6px 6px 0;
            background: #fff;
          }
          h3{
            color: #fff;
          }
          .image{
            filter: brightness(0) invert(1);
          }
        }
        &.active{
          background: #293E79;
          + ul{
            height: 345px;
          }
        }
        &.financial-transactions.active{
          + ul{
            height: 80px;
          }
        }
        + ul{
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-inline-start: 8px;
          margin-bottom: 10px;
          height: 0;
          overflow: hidden;
          transition: 1s;
          li {
            width: 100%;
            border-bottom: 0.5px solid #CBCBCB;
            padding: 8px 0 5px; 
            cursor: pointer;
            font-size: 16px;
            font-weight: 300;
            color: #434343;
            transition: 0.3s;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            a{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              height: 100%;
            }
            &.active{
              font-size: 18px;
              font-weight: 500;
              color:#3368B1;
            }
            &:not(.active):hover{
              background: #3368B1;
              color:#fff;
              padding-inline-start: 5px;
            }
          }
        }
      }
    }
    button.logout{
      display: flex;
      flex-direction: row;
      gap: 4px;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background: #DB37401A;
      width: 100%;
      padding: 15px;
      border: 1px solid #DB37401A;
      .image{
        width: 25px;
      }
      span{
        color: #DB3740;
        font-size: clamp(16px , 4vw , 20px);
        font-weight: 500;
      }
      &:hover{
        background: #DB3740;
        border-color: #DB37401A;
        span{
          color: #fff;
        }
        .image{
          filter: brightness(0) invert(1);
        }
      }
    }
  }
</style>