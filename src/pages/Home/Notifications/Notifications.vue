/Popups<template>
  <div class="page-content">
    <h4>الإشعارات</h4>
    <div v-if="loading">
      <div class="tab" v-for="n in 3" :key="n">
        <div class="image">
          <Skeleton shape="rectangle" width="100px" height="100px" />
        </div>
        <div class="text">
          <h5><Skeleton width="70%" /></h5>
          <h6><Skeleton width="90%" /><Skeleton width="40%" style="margin-top: 4px;" /></h6>
          <div class="date">
            <Skeleton width="30px" height="30px" style="border-radius: 50%;" />
            <Skeleton width="50px" />
          </div>
        </div>
        <button class="delete">
          <Skeleton width="30px" height="30px" />
        </button>
      </div>
    </div>

    <div class="tab" v-else v-for="item in resultGet?.data.notifications.data" :key="item.id">
      <div class="image">
        <img src="../../../assets/images/logo.png" alt="img" loading="lazy">
      </div>
      <div class="text">
        <h5>{{item.title}}</h5>
        <h6>{{item.body}}<span> #{{item.data.rateable_type === 'product' ? item.data.rateable_id : item.data.order_num ?? item.data.settlement_id}}</span></h6>
        <h6 v-if="item.data.reason"><span>السبب : </span>{{item.data.reason}}</h6>
        <div class="date">
          <i class="pi pi-clock"></i>
          <p>{{item.created_at}}</p>
        </div>
      </div>
      <button class="delete" @click="handleDeleteNotification(item.id)">
        <i class="pi pi-trash"></i>
      </button>
    </div>
    <div class="empty" v-if="resultGet?.data.notifications.data.length === 0">
      <i class="pi pi-box"></i>
      <h3>لايوجد إشعارات حتي الآن</h3>
    </div>
    <!-- <Pagination 
      :data="resultGet?.data.notifications.pagination"
      @handlePagination="handlePagination"
    /> -->
  </div>

  <!-- ---------------Delete Notification Popup ----------------------- -->
  <DeleteNotificationPopup 
    :notificationId = "notificationId"
    v-if="showDeleteNotificationPopup"
    @handleProgressPopup = "handleProgressPopup"
    @handleShowDeleteNotification ="handleShowDeleteNotification"
    @handleConfirmDeleteNotification="handleConfirmDeleteNotification"
  />


  <!-------------------------- Progress Popup ---------------------------->
  <ProgressPopup
    v-if="showProgressPopup"
    :progressText="progressText"
  />


  <!------------------- to handle Prime Vue Toast Error ------------------>
  <Toast 
    ref="toast"
    position="bottom-right"
  />
</template>

<script setup>
  import {onMounted, ref} from 'vue'
  import DeleteNotificationPopup from '../../../components/Popups/DeleteNotificationPopup.vue'
  import ProgressPopup from '../../../components/Popups/ProgressPopup.vue'
  import Skeleton from 'primevue/skeleton';
  import useApiMethods from '../../../mixins/ApiMethods';
  import Toast from 'primevue/toast';
  import Pagination from '../../../components/Pagination.vue';

  
  // to handle Api Methods to fetch notification data
  const {
    getMethod , 
    deleteMethod,
    resultGet ,
    showProgressPopup, 
    progressText , 
    handleProgressPopup,
    toast,
    loading,
  } = useApiMethods()



  // to handle delete notification popup
  const notificationId = ref(null)
  const showDeleteNotificationPopup = ref(false)


  // to handle show delete notification popup
  const handleShowDeleteNotification = () =>{
    showDeleteNotificationPopup.value = !showDeleteNotificationPopup.value
  }


  // to handle delete notification
  const handleDeleteNotification = (id) =>{
    handleShowDeleteNotification()
    notificationId.value = id
  }


  // to handle confirm delete notification
  const handleConfirmDeleteNotification = () =>{
    handleShowDeleteNotification()
    deleteMethod(
      `/api/merchant/delete-notification/${notificationId.value}` , 
      true , 
      'progress' , 
      `/api/merchant/notifications?type=all&page=1`
    );
  }

  // to handle pagination page with items
  const handlePagination = (event) => {
    loading.value = true;
    const newPage = event.page + 1;
    getMethod(`/api/merchant/notifications?type=all&page=${Number(newPage)}`, true)
  };

  onMounted(()=>{
    getMethod('/api/merchant/notifications?type=all' , true)
  })
</script>

<style lang="scss" scoped>
.page-content{
  padding-bottom: 20px;
  .tab{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    position: relative;
    border-radius: 10px;
    border: 1px solid #DBD9D9DD;
    padding: 18px 23px;
    margin-bottom: 10px;
    .image{
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      background: #293E79;
      img{
        padding: 10px;
        object-fit: contain;
      }
    }
    .text{
      h5{
        font-size: 20px;
        font-weight: 500;
        color: rgba(#293E79 , 0.8);
        margin-bottom: 10px;
      }
      h6{
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 10px;
        color: #434343;
        span{
          color: #B26FAC;
        }
      }
      .date{
        display: flex;
        gap: 2px;
        align-items: center;
        i{
          font-size: 14px;
          color: #979797;
        }
        p{
          font-size: 14px;
          font-weight: 300;
          color: #979797;
        }
      }
    }
    button.delete{
      position: absolute;
      inset-inline-end: 20px;
      top: 20px;
      width: 30px;
      height: 30px;
      border-radius: 3px;
      background: rgba(#DB3740 , 0.2);
      border: 1px solid transparent;
      transition: 0.3s;
      i{
        color: #DB3740;
      }
      &:hover{
        background: #DB3740;
        i{
          color: #fff;
        }
      }
    }
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>